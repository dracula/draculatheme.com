import { readFileSync } from "node:fs";
import { Octokit } from "@octokit/rest";
import Airtable from "airtable";
import { endOfDay, format } from "date-fns";
import Redis from "ioredis";
import pLimit from "p-limit";

// Configuration

const cacheFreshnessDurationMilliseconds = 12 * 60 * 60 * 1000;
const gumroadProProductId = "tPfIDt";
const githubOrganization = "dracula";
const plausibleApiBaseUrl = "https://plausible.io/api/v1/stats/aggregate";
const shouldForceCacheRefresh =
  process.argv.includes("--force") || process.env.FORCE_WARM_CACHE === "1";

const cacheKeys = {
  branches: "branches",
  contributors: "contributors",
  githubStars: "github-stars",
  installs: "installs",
  products: "products",
  reviews: "reviews",
  sales: "sales",
  totalViews: "total-views",
  views: "views",
  warmedAt: "warmed_at"
};

/**
 * @typedef {object} RepositoryConfiguration
 * @property {string} repository
 * @property {number} legacyViews
 */

/**
 * @typedef {object} ShopProductConfiguration
 * @property {string} gumroadProductId
 * @property {string} slug
 */

/**
 * @typedef {object} SkippedItem
 * @property {string} name
 * @property {string} reason
 */

/**
 * @typedef {object} DatasetResult
 * @property {string} [summary]
 * @property {SkippedItem[]} [skippedItems]
 */

// Logging and general utilities

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
  const remainingSeconds = Math.floor(seconds % 60);
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

const getRequiredEnvironmentVariable = (name) => {
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

// Environment and client setup

const parseRedisDatabaseNumber = (pathname) => {
  if (!pathname || pathname === "/") {
    return undefined;
  }

  const database = Number.parseInt(pathname.slice(1), 10);
  return Number.isNaN(database) ? undefined : database;
};

const createRedisClient = () => {
  const redisUrl = new URL(getRequiredEnvironmentVariable("REDIS_URL"));

  return new Redis({
    host: redisUrl.hostname,
    port: redisUrl.port ? Number.parseInt(redisUrl.port, 10) : 6379,
    username: redisUrl.username || undefined,
    password: redisUrl.password || undefined,
    db: parseRedisDatabaseNumber(redisUrl.pathname),
    tls: redisUrl.protocol === "rediss:" ? {} : undefined
  });
};

// Local configuration readers

/**
 * Reads selected literal values from TypeScript source files so this script
 * remains directly executable by Node.js without compiling application code.
 */
const readValuesFromSource = (relativePath, pattern, createValue) => {
  const sourceText = readFileSync(
    new URL(relativePath, import.meta.url),
    "utf8"
  );
  const values = [];

  for (const match of sourceText.matchAll(pattern)) {
    const value = createValue(match);

    if (value !== undefined) {
      values.push(value);
    }
  }

  return values;
};

/**
 * @returns {RepositoryConfiguration[]}
 */
const readRepositoryConfigurations = () => {
  return readValuesFromSource(
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
        repository: repositoryMatch[1],
        legacyViews: legacyViewsMatch
          ? Number.parseInt(legacyViewsMatch[1], 10)
          : 0
      };
    }
  );
};

/**
 * @returns {ShopProductConfiguration[]}
 */
const readShopProductConfigurations = () => {
  return readValuesFromSource(
    "../src/lib/shop/products.ts",
    /^ {2}\{[\s\S]*?^ {2}\}/gm,
    (objectMatch) => {
      const objectText = objectMatch[0];
      const gumroadIdMatch = objectText.match(/gumroadId:\s*"([^"]+)"/);
      const slugMatch = objectText.match(/slug:\s*"([^"]+)"/);

      if (!gumroadIdMatch || !slugMatch) {
        return undefined;
      }

      return {
        gumroadProductId: gumroadIdMatch[1],
        slug: slugMatch[1]
      };
    }
  );
};

const isAutomatedContributor = (contributor) => {
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

const logSkippedItems = (skippedItems) => {
  if (!skippedItems?.length) {
    return;
  }

  for (const item of skippedItems) {
    logWarning(`  ${item.name}: ${item.reason}`);
  }
};

const throwWithSkippedItems = (message, skippedItems) => {
  const error = new Error(message);
  error.skippedItems = skippedItems;
  throw error;
};

// External service clients

/**
 * Fetches JSON and retries only HTTP responses accepted by `shouldRetry`.
 * Network failures continue to surface immediately.
 */
const fetchJsonWithRetry = async (
  url,
  {
    requestOptions,
    maximumAttempts,
    shouldRetry,
    getRetryDelayMilliseconds,
    serviceName
  }
) => {
  let response = await fetch(url, requestOptions);

  for (
    let attempt = 1;
    attempt < maximumAttempts && shouldRetry(response);
    attempt += 1
  ) {
    await sleep(getRetryDelayMilliseconds(attempt, response));
    response = await fetch(url, requestOptions);
  }

  if (!response.ok) {
    throw new Error(`${serviceName} responded with ${response.status}.`);
  }

  return response.json();
};

const fetchDefaultBranchName = async (githubClient, repository) => {
  const response = await githubClient.rest.repos.get({
    owner: githubOrganization,
    repo: repository
  });

  return response.data.default_branch;
};

const fetchInstallationContent = async (githubClient, repository) => {
  for (const path of ["INSTALL.md", "install.md"]) {
    try {
      const response = await githubClient.rest.repos.getContent({
        path,
        owner: githubOrganization,
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

const fetchPlausiblePageViews = async (filterExpression = "") => {
  const today = format(endOfDay(new Date()), "yyyy-MM-dd");
  const filterQuery = filterExpression ? `&filters=${filterExpression}` : "";
  const url = `${plausibleApiBaseUrl}?site_id=draculatheme.com${filterQuery}&period=custom&date=2023-10-19,${today}&metrics=pageviews`;
  const payload = await fetchJsonWithRetry(url, {
    requestOptions: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getRequiredEnvironmentVariable("PLAUSIBLE_API_KEY")}`
      }
    },
    maximumAttempts: 5,
    shouldRetry: (response) => response.status === 429,
    getRetryDelayMilliseconds: (attempt, response) => {
      const retryAfter = Number.parseInt(
        response.headers.get("retry-after") || "",
        10
      );

      return Number.isFinite(retryAfter) ? retryAfter * 1000 : attempt * 1000;
    },
    serviceName: "Plausible"
  });

  return payload.results.pageviews.value;
};

const parseStoredProductMap = (rawValue) => {
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

const fetchGumroadProduct = async (gumroadProductId) => {
  const accessToken = getRequiredEnvironmentVariable("GUMROAD_ACCESS_TOKEN");
  const url = `https://api.gumroad.com/v2/products/${gumroadProductId}?access_token=${accessToken}`;
  const payload = await fetchJsonWithRetry(url, {
    maximumAttempts: 4,
    shouldRetry: (response) => response.status >= 500,
    getRetryDelayMilliseconds: (attempt) => 2 ** attempt * 1000,
    serviceName: "Gumroad"
  });

  if (!payload.success || !payload.product) {
    throw new Error(`Gumroad product ${gumroadProductId} was not found.`);
  }

  return payload.product;
};

// Generic cache warmers

/**
 * Fetches repository values concurrently while isolating individual failures.
 */
const fetchRepositoryValues = async ({
  repositoryConfigurations,
  concurrencyLimit,
  fetchValue
}) => {
  const values = {};
  const skippedItems = [];

  await Promise.all(
    repositoryConfigurations.map((repositoryConfiguration) =>
      concurrencyLimit(async () => {
        try {
          values[repositoryConfiguration.repository] = await fetchValue(
            repositoryConfiguration
          );
        } catch (error) {
          skippedItems.push({
            name: repositoryConfiguration.repository,
            reason: getErrorMessage(error)
          });
        }
      })
    )
  );

  return { values, skippedItems };
};

/**
 * Stores every successfully fetched repository value. Failed repositories
 * retain their previous Redis hash fields.
 *
 * @returns {Promise<DatasetResult>}
 */
const warmRepositoryHash = async ({
  redisClient,
  cacheKey,
  repositoryConfigurations,
  concurrencyLimit,
  fetchValue
}) => {
  const { values, skippedItems } = await fetchRepositoryValues({
    repositoryConfigurations,
    concurrencyLimit,
    fetchValue
  });
  const storedValueCount = Object.keys(values).length;

  if (storedValueCount === 0) {
    throwWithSkippedItems(`No ${cacheKey} were fetched.`, skippedItems);
  }

  await redisClient.hmset(cacheKey, values);

  return {
    summary: `${storedValueCount}/${repositoryConfigurations.length}`,
    skippedItems
  };
};

// Dataset-specific warmers

const warmDefaultBranches = ({
  redisClient,
  githubClient,
  repositoryConfigurations,
  concurrencyLimit
}) => {
  return warmRepositoryHash({
    redisClient,
    cacheKey: cacheKeys.branches,
    repositoryConfigurations,
    concurrencyLimit,
    fetchValue: (repositoryConfiguration) =>
      fetchDefaultBranchName(githubClient, repositoryConfiguration.repository)
  });
};

const warmContributors = ({
  redisClient,
  githubClient,
  repositoryConfigurations,
  concurrencyLimit
}) => {
  return warmRepositoryHash({
    redisClient,
    cacheKey: cacheKeys.contributors,
    repositoryConfigurations,
    concurrencyLimit,
    fetchValue: async (repositoryConfiguration) => {
      const response = await githubClient.rest.repos.listContributors({
        owner: githubOrganization,
        repo: repositoryConfiguration.repository
      });

      const filteredContributors = response.data
        .filter((contributor) => !isAutomatedContributor(contributor))
        .map((contributor) => ({
          login: contributor.login,
          avatar_url: contributor.avatar_url
        }));

      return JSON.stringify(filteredContributors);
    }
  });
};

const warmInstallationInstructions = ({
  redisClient,
  githubClient,
  repositoryConfigurations,
  concurrencyLimit
}) => {
  return warmRepositoryHash({
    redisClient,
    cacheKey: cacheKeys.installs,
    repositoryConfigurations,
    concurrencyLimit,
    fetchValue: async (repositoryConfiguration) => {
      const installationContent = await fetchInstallationContent(
        githubClient,
        repositoryConfiguration.repository
      );

      if (!installationContent) {
        throw new Error("INSTALL.md not found");
      }

      return installationContent;
    }
  });
};

const warmRepositoryViews = ({
  redisClient,
  repositoryConfigurations,
  concurrencyLimit
}) => {
  return warmRepositoryHash({
    redisClient,
    cacheKey: cacheKeys.views,
    repositoryConfigurations,
    concurrencyLimit,
    fetchValue: async (repositoryConfiguration) => {
      const pageViews = await fetchPlausiblePageViews(
        `event:page==/${repositoryConfiguration.repository}`
      );

      return String(pageViews + (repositoryConfiguration.legacyViews || 0));
    }
  });
};

const warmTotalViews = async (redisClient) => {
  const total = await fetchPlausiblePageViews();
  await redisClient.set(cacheKeys.totalViews, JSON.stringify({ total }));

  return { summary: total.toLocaleString("en-US") };
};

const warmSales = async (redisClient) => {
  const product = await fetchGumroadProduct(gumroadProProductId);
  const sales = {
    count: product.sales_count.toLocaleString(),
    total: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(product.sales_usd_cents / 100)
  };

  await redisClient.set(cacheKeys.sales, JSON.stringify(sales));

  return { summary: `${sales.count} · ${sales.total}` };
};

/**
 * Falls back to each previously cached product when Gumroad is unavailable,
 * allowing successful products to refresh without dropping failed products.
 */
const warmShopProducts = async (redisClient, shopProductConfigurations) => {
  const previousProducts = parseStoredProductMap(
    await redisClient.get(cacheKeys.products)
  );
  const previousProductValues = Object.values(previousProducts);
  const products = {};
  const skippedItems = [];

  await Promise.all(
    shopProductConfigurations.map(async ({ gumroadProductId, slug }) => {
      try {
        products[gumroadProductId] =
          await fetchGumroadProduct(gumroadProductId);
      } catch (error) {
        const fallbackProduct =
          previousProducts[gumroadProductId] ??
          previousProductValues.find(
            (product) => product?.custom_permalink === slug
          );

        if (fallbackProduct) {
          products[gumroadProductId] = {
            ...fallbackProduct,
            id: gumroadProductId
          };
        }

        skippedItems.push({
          name: `${slug} (${gumroadProductId})`,
          reason: getErrorMessage(error)
        });
      }
    })
  );

  if (skippedItems.length === shopProductConfigurations.length) {
    throwWithSkippedItems("No products were fetched.", skippedItems);
  }

  await redisClient.set(cacheKeys.products, JSON.stringify(products));

  return {
    summary: `${shopProductConfigurations.length - skippedItems.length}/${shopProductConfigurations.length}`,
    skippedItems
  };
};

const warmReviews = async (redisClient) => {
  const base = new Airtable({
    apiKey: getRequiredEnvironmentVariable("AIRTABLE_API_TOKEN")
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

  await redisClient.set(cacheKeys.reviews, JSON.stringify(reviews));

  return { summary: `${reviews.length} reviews` };
};

const warmGitHubStars = async (redisClient, githubClient) => {
  const response = await githubClient.rest.repos.get({
    owner: githubOrganization,
    repo: "dracula-theme"
  });
  const total = response.data.stargazers_count;

  await redisClient.set(cacheKeys.githubStars, JSON.stringify({ total }));

  return { summary: total.toLocaleString("en-US") };
};

// Cache orchestration

const getCacheAgeMilliseconds = async (redisClient) => {
  const warmedAt = await redisClient.get(cacheKeys.warmedAt);

  if (!warmedAt) {
    return null;
  }

  const elapsed = Date.now() - Number.parseInt(warmedAt, 10);

  return Number.isFinite(elapsed) ? elapsed : null;
};

/**
 * Isolates dataset failures so remaining datasets can refresh and the failed
 * dataset can retain its previously cached value.
 */
const runDatasetWarmer = async ({ name, run }) => {
  const startedAt = Date.now();
  const getElapsedDuration = () => formatDuration(Date.now() - startedAt);

  try {
    const result = (await run()) ?? {};
    const summary = result.summary ? `  ${result.summary}` : "";
    log(`${name.padEnd(12)}  done${summary}  (${getElapsedDuration()})`);
    logSkippedItems(result.skippedItems);
    return "updated";
  } catch (error) {
    logWarning(
      `${name.padEnd(12)}  failed  keeping previous — ${getErrorMessage(error)}  (${getElapsedDuration()})`
    );
    logSkippedItems(
      error && typeof error === "object" ? error.skippedItems : undefined
    );
    return "kept";
  }
};

const main = async () => {
  loadEnvironmentFile();

  const redisClient = createRedisClient();

  try {
    const cacheAgeMilliseconds = await getCacheAgeMilliseconds(redisClient);
    const isCacheFresh =
      cacheAgeMilliseconds !== null &&
      cacheAgeMilliseconds < cacheFreshnessDurationMilliseconds;

    if (!shouldForceCacheRefresh && isCacheFresh) {
      log(
        `Skipping: cache is ${formatDuration(cacheAgeMilliseconds)} old (threshold is 12h).`
      );
      return;
    }

    if (shouldForceCacheRefresh) {
      log("Force refresh enabled.");
    } else if (cacheAgeMilliseconds === null) {
      log("No previous cache found; warming from scratch.");
    } else {
      log(`Cache is ${formatDuration(cacheAgeMilliseconds)} old; refreshing.`);
    }

    const githubClient = new Octokit({
      auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
    });
    const concurrencyLimit = pLimit(8);
    const repositoryConfigurations = readRepositoryConfigurations();
    const shopProductConfigurations = readShopProductConfigurations();
    const warmingStartedAt = Date.now();
    const repositoryWarmerContext = {
      redisClient,
      githubClient,
      repositoryConfigurations,
      concurrencyLimit
    };

    log(
      `Warming ${repositoryConfigurations.length} repositories and ${shopProductConfigurations.length} products.`
    );

    const datasetWarmers = [
      {
        name: cacheKeys.branches,
        run: () => warmDefaultBranches(repositoryWarmerContext)
      },
      {
        name: cacheKeys.contributors,
        run: () => warmContributors(repositoryWarmerContext)
      },
      {
        name: cacheKeys.installs,
        run: () => warmInstallationInstructions(repositoryWarmerContext)
      },
      {
        name: cacheKeys.views,
        run: () => warmRepositoryViews(repositoryWarmerContext)
      },
      {
        name: cacheKeys.totalViews,
        run: () => warmTotalViews(redisClient)
      },
      {
        name: cacheKeys.sales,
        run: () => warmSales(redisClient)
      },
      {
        name: cacheKeys.products,
        run: () => warmShopProducts(redisClient, shopProductConfigurations)
      },
      {
        name: cacheKeys.reviews,
        run: () => warmReviews(redisClient)
      },
      {
        name: cacheKeys.githubStars,
        run: () => warmGitHubStars(redisClient, githubClient)
      }
    ];

    const datasetOutcomes = [];

    for (const datasetWarmer of datasetWarmers) {
      datasetOutcomes.push(await runDatasetWarmer(datasetWarmer));
    }

    await redisClient.set(cacheKeys.warmedAt, String(Date.now()));

    const updatedCount = datasetOutcomes.filter(
      (outcome) => outcome === "updated"
    ).length;
    const keptCount = datasetOutcomes.filter(
      (outcome) => outcome === "kept"
    ).length;

    log(
      `Finished in ${formatDuration(Date.now() - warmingStartedAt)} — ${updatedCount} updated, ${keptCount} kept previous.`
    );
  } finally {
    await redisClient.quit();
  }
};

main().catch((error) => {
  console.error(`[warm-cache] Failed: ${getErrorMessage(error)}`);
  process.exitCode = 1;
});
