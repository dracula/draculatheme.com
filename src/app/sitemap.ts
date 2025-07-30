import fs from "node:fs/promises";
import path from "node:path";

import { paths } from "@/lib/paths";

const contentDirectory = path.join(process.cwd(), "./content/blog");

const Sitemap = async () => {
  const files = await fs.readdir(contentDirectory);

  const posts = files.map((file) => ({
    url: `https://www.draculatheme.com/blog/${file.replace(".mdx", "")}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  const themes = paths.map((path) => ({
    url: `https://www.draculatheme.com/${path.repo}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  const routes = ["", "/about", "/blog", "/contribute", "/shop", "/pro"].map(
    (route) => ({
      url: `https://www.draculatheme.com${route}`,
      lastModified: new Date().toISOString().split("T")[0]
    })
  );

  return [...routes, ...themes, ...posts];
};

export default Sitemap;
