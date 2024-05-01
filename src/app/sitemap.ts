import { allPosts } from "contentlayer/generated";
import paths from "src/lib/paths";

export default async function sitemap() {
  const blogs = allPosts.map((post) => ({
    url: `https://draculatheme.com/blog/${post.url.replace("/posts", "")}`,
    lastModified: post.date.updatedAt
  }));

  const themes = paths.map((path) => ({
    url: `https://draculatheme.com/${path.params.theme}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  const routes = ["", "/about", "/blog", "/contribute", "/shop", "/pro"].map(
    (route) => ({
      url: `https://draculatheme.com${route}`,
      lastModified: new Date().toISOString().split("T")[0]
    })
  );

  return [...routes, ...themes, ...blogs];
}
