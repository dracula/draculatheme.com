import fs from "node:fs/promises";
import path from "node:path";

import { paths } from "@/lib/paths";

const BASE_URL = "https://draculatheme.com";
const CONTENT_DIRECTORY = path.join(process.cwd(), "./content/blog");

const getCurrentDate = () => new Date().toISOString().split("T")[0];

const createUrlEntry = (
  url: string,
  lastModified: string = getCurrentDate()
) => ({
  url,
  lastModified
});

const getStaticRoutes = () => {
  const routes = [
    "",
    "/about",
    "/blog",
    "/contribute",
    "/spec",
    "/shop",
    "/pro",
    "/pro/journey",
    "/pro/changelog",
    "/pro/request-access"
  ];

  return routes.map((route) => createUrlEntry(`${BASE_URL}${route}`));
};

const getBlogPosts = async () => {
  const files = await fs.readdir(CONTENT_DIRECTORY);

  return files.map((file) =>
    createUrlEntry(`${BASE_URL}/blog/${file.replace(".mdx", "")}`)
  );
};

const getThemes = () => {
  return paths.map((path) => createUrlEntry(`${BASE_URL}/${path.repo}`));
};

const Sitemap = async () => {
  const [routes, themes, posts] = await Promise.all([
    getStaticRoutes(),
    getThemes(),
    getBlogPosts()
  ]);

  return [...routes, ...themes, ...posts];
};

export default Sitemap;
