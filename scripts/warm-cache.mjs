import { readFileSync } from "node:fs";
import { Octokit } from "@octokit/rest";
import Airtable from "airtable";
import { endOfDay, format } from "date-fns";
import Redis from "ioredis";
import pLimit from "p-limit";

const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000;
const gumroadProProductId = "tPfIDt";
const githubOwner = "dracula";
const plausibleApiBaseUrl = "https://plausible.io/api/v1/stats/aggregate";
const shouldForceWarm =
  process.argv.includes("--force") || process.env.FORCE_WARM_CACHE === "1";

const log = (message) => {
  console.log(`[warm-cache] ${message}`);
};

const logWarning = (message) => {
  console.warn(`[warm-cache] ${message}`);
};

const getErrorMessage = (error) => {
  return error instanceof Error ? error.message : String(error);
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const formatDuration = (milliseconds) => {
  if (milliseconds < 1000) {
    return `${Math.max(0, Math.round(milliseconds))}ms`;
  }

  const seconds = milliseconds / 1000;

  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return remainingSeconds === 0
      ? `${minutes}m`
      : `${minutes}m ${remainingSeconds}s`;
  }

  return remainingMinutes === 0
    ? `${hours}h`
    : `${hours}h ${remainingMinutes}m`;
};

const requireEnvironment = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing.`);
  }

  return value;
};

const loadEnvironmentFile = () => {
  try {
    const contents = readFileSync(new URL("../.env", import.meta.url), "utf8");

    for (const line of contents.split("\n")) {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmedLine.indexOf("=");

      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmedLine.slice(0, separatorIndex).trim();
      let value = trimmedLine.slice(separatorIndex + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1).replaceAll("\\n", "\n");
      }

      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch {
    // Environment variables may already be provided by the host.
  }
};

const parseDatabase = (pathname) => {
  if (!pathname || pathname === "/") {
    return undefined;
  }

  const database = Number.parseInt(pathname.slice(1), 10);
  return Number.isNaN(database) ? undefined : database;
};

const createRedis = () => {
  const parsedUrl = new URL(requireEnvironment("REDIS_URL"));

  return new Redis({
    host: parsedUrl.hostname,
    port: parsedUrl.port ? Number.parseInt(parsedUrl.port, 10) : 6379,
    username: parsedUrl.username || undefined,
    password: parsedUrl.password || undefined,
    db: parseDatabase(parsedUrl.pathname),
    tls: parsedUrl.protocol === "rediss:" ? {} : undefined
  });
};

const extractFromSource = (relativePath, pattern, mapMatch) => {
  const contents = readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const values = [];

  for (const match of contents.matchAll(pattern)) {
    const value = mapMatch(match);

    if (value !== undefined) {
      values.push(value);
    }
  }

  return values;
};

const extractPaths = () => {
  return extractFromSource(
    "../src/lib/paths.ts",
    /\{[^{}]+\}/g,
    (objectMatch) => {
      const objectText = objectMatch[0];
      const repositoryMatch = objectText.match(/repo:\s*"([^"]+)"/);

      if (!repositoryMatch) {
        return undefined;
      }

      const legacyViewsMatch = objectText.match(/legacyViews:\s*(\d+)/);

      return {
        repo: repositoryMatch[1],
        legacyViews: legacyViewsMatch
          ? Number.parseInt(legacyViewsMatch[1], 10)
          : 0
      };
    }
  );
};

const extractGumroadIds = () => {
  return extractFromSource(
    "../src/lib/shop/products.ts",
    /gumroadId:\s*"([^"]+)"/g,
    (idMatch) => idMatch[1]
  );
};

const isBot = (contributor) => {
  if (!contributor.login) {
    return true;
  }

  return (
    contributor.type === "Bot" ||
    contributor.login.includes("[bot]") ||
    contributor.login.toLowerCase().endsWith("-bot") ||
    contributor.login === "ImgBotApp"
  );
};

const isNotFoundError = (error) => {
  return Boolean(
    error &&
    typeof error === "object" &&
    "status" in error &&
    error.status === 404
  );
};

const logSkipped = (skipped) => {
  if (!skipped?.length) {
    return;
  }

  for (const item of skipped) {
    logWarning(`  ${item.name}: ${item.reason}`);
  }
};

const failWithSkipped = (message, skipped) => {
  const error = new Error(message);
  error.skipped = skipped;
  throw error;
};

const fetchJson = async (
  url,
  { request, retries, shouldRetry, getDelay, label }
) => {
  let response = await fetch(url, request);

  for (
    let attempt = 1;
    attempt < retries && shouldRetry(response);
    attempt += 1
  ) {
    await sleep(getDelay(attempt, response));
    response = await fetch(url, request);
  }

  if (!response.ok) {
    throw new Error(`${label} responded with ${response.status}.`);
  }

  return response.json();
};

const fetchDefaultBranch = async (octokit, repository) => {
  const response = await octokit.rest.repos.get({
    owner: githubOwner,
    repo: repository
  });

  return response.data.default_branch;
};

const fetchInstallContent = async (octokit, repository) => {
  for (const path of ["INSTALL.md", "install.md"]) {
    try {
      const response = await octokit.rest.repos.getContent({
        path,
        owner: githubOwner,
        repo: repository
      });

      if (!Array.isArray(response.data) && response.data.type === "file") {
        return response.data.content || null;
      }
    } catch (error) {
      if (!isNotFoundError(error)) {
        throw error;
      }
    }
  }

  return null;
};

const fetchPlausiblePageviews = async (filters = "") => {
  const today = format(endOfDay(new Date()), "yyyy-MM-dd");
  const filterQuery = filters ? `&filters=${filters}` : "";
  const url = `${plausibleApiBaseUrl}?site_id=draculatheme.com${filterQuery}&period=custom&date=2023-10-19,${today}&metrics=pageviews`;
  const payload = await fetchJson(url, {
    request: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${requireEnvironment("PLAUSIBLE_API_KEY")}`
      }
    },
    retries: 5,
    shouldRetry: (response) => response.status === 429,
    getDelay: (attempt, response) => {
      const retryAfter = Number.parseInt(
        response.headers.get("retry-after") || "",
        10
      );

      return Number.isFinite(retryAfter) ? retryAfter * 1000 : attempt * 1000;
    },
    label: "Plausible"
  });

  return payload.results.pageviews.value;
};

const parseStoredProducts = (rawValue) => {
  if (!rawValue) {
    return {};
  }

  try {
    const parsedValue = JSON.parse(rawValue);

    if (
      typeof parsedValue !== "object" ||
      parsedValue === null ||
      Array.isArray(parsedValue)
    ) {
      return {};
    }

    return parsedValue;
  } catch {
    return {};
  }
};

const fetchGumroadProduct = async (id) => {
  const accessToken = requireEnvironment("GUMROAD_ACCESS_TOKEN");
  const url = `https://api.gumroad.com/v2/products/${id}?access_token=${accessToken}`;
  const payload = await fetchJson(url, {
    retries: 4,
    shouldRetry: (response) => response.status >= 500,
    getDelay: (attempt) => 2 ** attempt * 1000,
    label: "Gumroad"
  });

  if (!payload.success || !payload.product) {
    throw new Error(`Gumroad product ${id} was not found.`);
  }

  return payload.product;
};

const collectByRepository = async (items, concurrencyLimit, fetchValue) => {
  const values = {};
  const skipped = [];

  await Promise.all(
    items.map((item) =>
      concurrencyLimit(async () => {
        try {
          values[item.repo] = await fetchValue(item);
        } catch (error) {
          skipped.push({ name: item.repo, reason: getErrorMessage(error) });
        }
      })
    )
  );

  return { values, skipped };
};

const warmHashMap = async ({
  redis,
  key,
  items,
  concurrencyLimit,
  fetchValue
}) => {
  const { values, skipped } = await collectByRepository(
    items,
    concurrencyLimit,
    fetchValue
  );
  const storedCount = Object.keys(values).length;

  if (storedCount === 0) {
    failWithSkipped(`No ${key} were fetched.`, skipped);
  }

  await redis.hmset(key, values);

  return {
    summary: `${storedCount}/${items.length}`,
    skipped
  };
};

const warmBranches = (redis, octokit, paths, concurrencyLimit) => {
  return warmHashMap({
    redis,
    key: "branches",
    items: paths,
    concurrencyLimit,
    fetchValue: (item) => fetchDefaultBranch(octokit, item.repo)
  });
};

const warmContributors = (redis, octokit, paths, concurrencyLimit) => {
  return warmHashMap({
    redis,
    key: "contributors",
    items: paths,
    concurrencyLimit,
    fetchValue: async (item) => {
      const response = await octokit.rest.repos.listContributors({
        owner: githubOwner,
        repo: item.repo
      });

      const filteredContributors = response.data
        .filter((contributor) => !isBot(contributor))
        .map((contributor) => ({
          login: contributor.login,
          avatar_url: contributor.avatar_url
        }));

      return JSON.stringify(filteredContributors);
    }
  });
};

const warmInstalls = (redis, octokit, paths, concurrencyLimit) => {
  return warmHashMap({
    redis,
    key: "installs",
    items: paths,
    concurrencyLimit,
    fetchValue: async (item) => {
      const content = await fetchInstallContent(octokit, item.repo);

      if (!content) {
        throw new Error("INSTALL.md not found");
      }

      return content;
    }
  });
};

const warmViews = (redis, paths, concurrencyLimit) => {
  return warmHashMap({
    redis,
    key: "views",
    items: paths,
    concurrencyLimit,
    fetchValue: async (item) => {
      const pageViews = await fetchPlausiblePageviews(
        `event:page==/${item.repo}`
      );

      return String(pageViews + (item.legacyViews || 0));
    }
  });
};

const warmTotalViews = async (redis) => {
  const total = await fetchPlausiblePageviews();
  await redis.set("total-views", JSON.stringify({ total }));

  return { summary: total.toLocaleString("en-US") };
};

const warmSales = async (redis) => {
  const product = await fetchGumroadProduct(gumroadProProductId);
  const sales = {
    count: product.sales_count.toLocaleString(),
    total: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(product.sales_usd_cents / 100)
  };

  await redis.set("sales", JSON.stringify(sales));

  return { summary: `${sales.count} · ${sales.total}` };
};

const warmProducts = async (redis, gumroadIds) => {
  const previousProducts = parseStoredProducts(await redis.get("products"));
  const products = { ...previousProducts };
  const skipped = [];

  await Promise.all(
    gumroadIds.map(async (id) => {
      try {
        const product = await fetchGumroadProduct(id);
        products[product.id] = product;
      } catch (error) {
        skipped.push({ name: id, reason: getErrorMessage(error) });
      }
    })
  );

  if (Object.keys(products).length === 0) {
    failWithSkipped("No products were fetched.", skipped);
  }

  await redis.set("products", JSON.stringify(products));

  return {
    summary: `${gumroadIds.length - skipped.length}/${gumroadIds.length}`,
    skipped
  };
};

const warmReviews = async (redis) => {
  const base = new Airtable({
    apiKey: requireEnvironment("AIRTABLE_API_TOKEN")
  }).base("appE8qDD7fxpKyDpf");
  const records = await base("Table 1")
    .select({
      fields: ["ID", "Name", "Country", "GitHub", "Body", "Date"],
      view: "Approved"
    })
    .all();

  const reviews = records.map((review) => ({
    id: String(review.get("ID") ?? ""),
    name: String(review.get("Name") || ""),
    country: String(review.get("Country") || ""),
    github: String(review.get("GitHub") || ""),
    body: String(review.get("Body") || ""),
    date: String(review.get("Date") || "")
  }));

  await redis.set("reviews", JSON.stringify(reviews));

  return { summary: `${reviews.length} reviews` };
};

const warmGithubStars = async (redis, octokit) => {
  const response = await octokit.rest.repos.get({
    owner: githubOwner,
    repo: "dracula-theme"
  });
  const total = response.data.stargazers_count;

  await redis.set("github-stars", JSON.stringify({ total }));

  return { summary: total.toLocaleString("en-US") };
};

const getCacheAge = async (redis) => {
  const warmedAt = await redis.get("warmed_at");

  if (!warmedAt) {
    return null;
  }

  const elapsed = Date.now() - Number.parseInt(warmedAt, 10);

  return Number.isFinite(elapsed) ? elapsed : null;
};

const warmDataset = async (name, task) => {
  const startedAt = Date.now();
  const elapsed = () => formatDuration(Date.now() - startedAt);

  try {
    const result = (await task()) ?? {};
    const summary = result.summary ? `  ${result.summary}` : "";
    log(`${name.padEnd(12)}  done${summary}  (${elapsed()})`);
    logSkipped(result.skipped);
    return "updated";
  } catch (error) {
    logWarning(
      `${name.padEnd(12)}  failed  keeping previous — ${getErrorMessage(error)}  (${elapsed()})`
    );
    logSkipped(error && typeof error === "object" ? error.skipped : undefined);
    return "kept";
  }
};

const main = async () => {
  loadEnvironmentFile();

  const redis = createRedis();

  try {
    const cacheAge = await getCacheAge(redis);
    const isFresh = cacheAge !== null && cacheAge < twelveHoursInMilliseconds;

    if (!shouldForceWarm && isFresh) {
      log(
        `Skipping: cache is ${formatDuration(cacheAge)} old (threshold is 12h).`
      );
      return;
    }

    if (shouldForceWarm) {
      log("Force refresh enabled.");
    } else if (cacheAge === null) {
      log("No previous cache found; warming from scratch.");
    } else {
      log(`Cache is ${formatDuration(cacheAge)} old; refreshing.`);
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
    });
    const concurrencyLimit = pLimit(8);
    const paths = extractPaths();
    const gumroadIds = extractGumroadIds();
    const startedAt = Date.now();

    log(
      `Warming ${paths.length} repositories and ${gumroadIds.length} products.`
    );

    const datasets = [
      ["branches", () => warmBranches(redis, octokit, paths, concurrencyLimit)],
      [
        "contributors",
        () => warmContributors(redis, octokit, paths, concurrencyLimit)
      ],
      ["installs", () => warmInstalls(redis, octokit, paths, concurrencyLimit)],
      ["views", () => warmViews(redis, paths, concurrencyLimit)],
      ["total-views", () => warmTotalViews(redis)],
      ["sales", () => warmSales(redis)],
      ["products", () => warmProducts(redis, gumroadIds)],
      ["reviews", () => warmReviews(redis)],
      ["github-stars", () => warmGithubStars(redis, octokit)]
    ];

    const outcomes = [];

    for (const [name, task] of datasets) {
      outcomes.push(await warmDataset(name, task));
    }

    await redis.set("warmed_at", String(Date.now()));

    const updatedCount = outcomes.filter(
      (outcome) => outcome === "updated"
    ).length;
    const keptCount = outcomes.filter((outcome) => outcome === "kept").length;

    log(
      `Finished in ${formatDuration(Date.now() - startedAt)} — ${updatedCount} updated, ${keptCount} kept previous.`
    );
  } finally {
    await redis.quit();
  }
};

main().catch((error) => {
  console.error(`[warm-cache] Failed: ${getErrorMessage(error)}`);
  process.exitCode = 1;
});
