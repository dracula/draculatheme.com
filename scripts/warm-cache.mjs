import { readFileSync } from "node:fs";
import { Octokit } from "@octokit/rest";
import Airtable from "airtable";
import { endOfDay, format } from "date-fns";
import Redis from "ioredis";
import pLimit from "p-limit";

const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000;
const gumroadProProductId = "tPfIDt";
const plausibleApiBaseUrl = "https://plausible.io/api/v1/stats/aggregate";
const shouldForceWarm =
  process.argv.includes("--force") || process.env.FORCE_WARM_CACHE === "1";

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
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error("REDIS_URL is missing.");
  }

  const parsedUrl = new URL(redisUrl);

  return new Redis({
    host: parsedUrl.hostname,
    port: parsedUrl.port ? Number.parseInt(parsedUrl.port, 10) : 6379,
    username: parsedUrl.username || undefined,
    password: parsedUrl.password || undefined,
    db: parseDatabase(parsedUrl.pathname),
    tls: parsedUrl.protocol === "rediss:" ? {} : undefined
  });
};

const extractPaths = () => {
  const contents = readFileSync(
    new URL("../src/lib/paths.ts", import.meta.url),
    "utf8"
  );
  const paths = [];

  for (const objectMatch of contents.matchAll(/\{[^{}]+\}/g)) {
    const objectText = objectMatch[0];
    const repositoryMatch = objectText.match(/repo:\s*"([^"]+)"/);

    if (!repositoryMatch) {
      continue;
    }

    const legacyViewsMatch = objectText.match(/legacyViews:\s*(\d+)/);

    paths.push({
      repo: repositoryMatch[1],
      legacyViews: legacyViewsMatch
        ? Number.parseInt(legacyViewsMatch[1], 10)
        : 0
    });
  }

  return paths;
};

const extractGumroadIds = () => {
  const contents = readFileSync(
    new URL("../src/lib/shop/products.ts", import.meta.url),
    "utf8"
  );
  const gumroadIds = [];

  for (const idMatch of contents.matchAll(/gumroadId:\s*"([^"]+)"/g)) {
    gumroadIds.push(idMatch[1]);
  }

  return gumroadIds;
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

const getErrorMessage = (error) => {
  return error instanceof Error ? error.message : String(error);
};

const warmDataset = async (name, task) => {
  try {
    await task();
    console.log(`Warmed ${name}.`);
  } catch (error) {
    console.warn(
      `Failed to warm ${name}, keeping the old value:`,
      getErrorMessage(error)
    );
  }
};

const fetchDefaultBranch = async (octokit, repository) => {
  const response = await octokit.rest.repos.get({
    owner: "dracula",
    repo: repository
  });

  return response.data.default_branch;
};

const fetchInstallContent = async (octokit, repository) => {
  const tryFetchFile = async (path) => {
    try {
      const response = await octokit.rest.repos.getContent({
        path,
        owner: "dracula",
        repo: repository
      });

      if (Array.isArray(response.data) || response.data.type !== "file") {
        return null;
      }

      return response.data.content || null;
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        error.status === 404
      ) {
        return null;
      }

      throw error;
    }
  };

  const installMarkdown = await tryFetchFile("INSTALL.md");

  if (installMarkdown) {
    return installMarkdown;
  }

  return tryFetchFile("install.md");
};

const fetchPlausible = async (url) => {
  const apiKey = process.env.PLAUSIBLE_API_KEY;

  if (!apiKey) {
    throw new Error("PLAUSIBLE_API_KEY is missing.");
  }

  const request = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  };

  let response = await fetch(url, request);

  for (let attempt = 1; attempt < 5 && response.status === 429; attempt += 1) {
    const retryAfter = Number.parseInt(
      response.headers.get("retry-after") || "",
      10
    );
    const delayInMilliseconds = Number.isFinite(retryAfter)
      ? retryAfter * 1000
      : attempt * 1000;
    await new Promise((resolve) => setTimeout(resolve, delayInMilliseconds));
    response = await fetch(url, request);
  }

  if (!response.ok) {
    throw new Error(`Plausible responded with ${response.status}.`);
  }

  return response.json();
};

const fetchPageViews = async (repository) => {
  const today = format(endOfDay(new Date()), "yyyy-MM-dd");
  const url = `${plausibleApiBaseUrl}?site_id=draculatheme.com&filters=event:page==/${repository}&period=custom&date=2023-10-19,${today}&metrics=pageviews`;
  const payload = await fetchPlausible(url);
  return payload.results.pageviews.value;
};

const fetchTotalPageViews = async () => {
  const today = format(endOfDay(new Date()), "yyyy-MM-dd");
  const url = `${plausibleApiBaseUrl}?site_id=draculatheme.com&period=custom&date=2023-10-19,${today}&metrics=pageviews`;
  const payload = await fetchPlausible(url);
  return payload.results.pageviews.value;
};

const fetchGumroadProduct = async (id) => {
  const accessToken = process.env.GUMROAD_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("GUMROAD_ACCESS_TOKEN is missing.");
  }

  const response = await fetch(
    `https://api.gumroad.com/v2/products/${id}?access_token=${accessToken}`
  );

  if (!response.ok) {
    throw new Error(`Gumroad responded with ${response.status}.`);
  }

  const payload = await response.json();

  if (!payload.success || !payload.product) {
    throw new Error(`Gumroad product ${id} was not found.`);
  }

  return payload.product;
};

const warmBranches = async (redis, octokit, paths, limit) => {
  const branches = {};

  await Promise.all(
    paths.map((item) =>
      limit(async () => {
        try {
          branches[item.repo] = await fetchDefaultBranch(octokit, item.repo);
        } catch (error) {
          console.warn(
            `Failed to fetch branch for ${item.repo}:`,
            getErrorMessage(error)
          );
        }
      })
    )
  );

  if (Object.keys(branches).length === 0) {
    throw new Error("No branches were fetched.");
  }

  await redis.hmset("branches", branches);
};

const warmContributors = async (redis, octokit, paths, limit) => {
  const contributors = {};

  await Promise.all(
    paths.map((item) =>
      limit(async () => {
        try {
          const response = await octokit.rest.repos.listContributors({
            owner: "dracula",
            repo: item.repo
          });

          const filteredContributors = response.data
            .filter((contributor) => !isBot(contributor))
            .map((contributor) => ({
              login: contributor.login,
              avatar_url: contributor.avatar_url
            }));

          contributors[item.repo] = JSON.stringify(filteredContributors);
        } catch (error) {
          console.warn(
            `Failed to fetch contributors for ${item.repo}:`,
            getErrorMessage(error)
          );
        }
      })
    )
  );

  if (Object.keys(contributors).length === 0) {
    throw new Error("No contributors were fetched.");
  }

  await redis.hmset("contributors", contributors);
};

const warmInstalls = async (redis, octokit, paths, limit) => {
  const installs = {};

  await Promise.all(
    paths.map((item) =>
      limit(async () => {
        try {
          const content = await fetchInstallContent(octokit, item.repo);

          if (!content) {
            console.warn(`INSTALL.md not found for ${item.repo}.`);
            return;
          }

          installs[item.repo] = content;
        } catch (error) {
          console.warn(
            `Failed to fetch install guide for ${item.repo}:`,
            getErrorMessage(error)
          );
        }
      })
    )
  );

  if (Object.keys(installs).length === 0) {
    throw new Error("No install guides were fetched.");
  }

  await redis.hmset("installs", installs);
};

const warmViews = async (redis, paths, limit) => {
  const views = {};

  await Promise.all(
    paths.map((item) =>
      limit(async () => {
        try {
          const pageViews = await fetchPageViews(item.repo);
          const legacyViews = item.legacyViews || 0;
          views[item.repo] = String(pageViews + legacyViews);
        } catch (error) {
          console.warn(
            `Failed to fetch views for ${item.repo}:`,
            getErrorMessage(error)
          );
        }
      })
    )
  );

  if (Object.keys(views).length === 0) {
    throw new Error("No views were fetched.");
  }

  await redis.hmset("views", views);
};

const warmTotalViews = async (redis) => {
  const total = await fetchTotalPageViews();
  await redis.set("total-views", JSON.stringify({ total }));
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
};

const warmProducts = async (redis, gumroadIds) => {
  const products = {};

  await Promise.all(
    gumroadIds.map(async (id) => {
      try {
        const product = await fetchGumroadProduct(id);
        products[product.id] = product;
      } catch (error) {
        console.warn(`Failed to fetch product ${id}:`, getErrorMessage(error));
      }
    })
  );

  if (Object.keys(products).length === 0) {
    throw new Error("No products were fetched.");
  }

  await redis.set("products", JSON.stringify(products));
};

const warmReviews = async (redis) => {
  const apiToken = process.env.AIRTABLE_API_TOKEN;

  if (!apiToken) {
    throw new Error("AIRTABLE_API_TOKEN is missing.");
  }

  const base = new Airtable({ apiKey: apiToken }).base("appE8qDD7fxpKyDpf");
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
};

const warmGithubStars = async (redis, octokit) => {
  const response = await octokit.repos.get({
    owner: "dracula",
    repo: "dracula-theme"
  });

  await redis.set(
    "github-stars",
    JSON.stringify({ total: response.data.stargazers_count })
  );
};

const isCacheFresh = async (redis) => {
  const warmedAt = await redis.get("warmed_at");

  if (!warmedAt) {
    return false;
  }

  const elapsed = Date.now() - Number.parseInt(warmedAt, 10);

  return Number.isFinite(elapsed) && elapsed < twelveHoursInMilliseconds;
};

const main = async () => {
  loadEnvironmentFile();

  const redis = createRedis();

  try {
    if (!shouldForceWarm && (await isCacheFresh(redis))) {
      console.log("Cache is under 12 hours old. Skipping.");
      return;
    }

    if (shouldForceWarm) {
      console.log("Forcing cache warm.");
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
    });
    const limit = pLimit(8);
    const paths = extractPaths();
    const gumroadIds = extractGumroadIds();

    console.log(`Warming cache for ${paths.length} repositories.`);

    await warmDataset("branches", () =>
      warmBranches(redis, octokit, paths, limit)
    );
    await warmDataset("contributors", () =>
      warmContributors(redis, octokit, paths, limit)
    );
    await warmDataset("installs", () =>
      warmInstalls(redis, octokit, paths, limit)
    );
    await warmDataset("views", () => warmViews(redis, paths, limit));
    await warmDataset("total views", () => warmTotalViews(redis));
    await warmDataset("sales", () => warmSales(redis));
    await warmDataset("products", () => warmProducts(redis, gumroadIds));
    await warmDataset("reviews", () => warmReviews(redis));
    await warmDataset("github stars", () => warmGithubStars(redis, octokit));

    await redis.set("warmed_at", String(Date.now()));
    console.log("Cache warmed successfully.");
  } finally {
    await redis.quit();
  }
};

main().catch((error) => {
  console.error("Failed to warm cache:", getErrorMessage(error));
  process.exitCode = 1;
});
