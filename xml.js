import fs from "fs";
import moment from "moment";
import paths from "./lib/paths.js";
import { getAllPosts, convertMarkdownToHtml } from "./lib/blog.js";

async function getBlog() {
  const posts = getAllPosts([
    "title",
    "excerpt",
    "content",
    "createdAt",
    "updatedAt",
    "slug",
  ]);

  for (const post of posts) {
    post.content = await convertMarkdownToHtml(post.content || "");
    post.content = post.content
      .replaceAll('href="/', 'href="https://draculatheme.com/')
      .replaceAll('src="/', 'src="https://draculatheme.com/');
  }

  return posts;
}

function getPages() {
  const pages = ["about", "blog", "contribute", "ui", "pro"];

  paths.forEach((path) => {
    pages.push(path.params.theme);
  });

  return pages;
}

async function buildSitemap() {
  try {
    const posts = await getBlog();
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${getPages()
      .map((page) => {
        return `<url>
        <loc>https://draculatheme.com/${page}</loc>
        <lastmod>${moment().format("YYYY-MM-DD")}</lastmod>
      </url>`;
      })
      .join(" ")}
    ${posts
      .map((post) => {
        return `<url>
        <loc>https://draculatheme.com/blog/${post.slug}</loc>
        <lastmod>${post.updatedAt}</lastmod>
      </url>`;
      })
      .join(" ")}
  </urlset>`;

    fs.writeFileSync("public/sitemap.xml", xml);
  } catch (e) {
    console.error(e);
  }
}

async function buildRss() {
  try {
    const posts = await getBlog();
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
      <rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
        <channel>
          <title>Dracula Theme Blog</title>
          <link>https://draculatheme.com/blog</link>
          <description>The journey of building the most universal dark theme ever made.</description>
          <language>en</language>
          <atom:link href="https://draculatheme.com/rss.xml" rel="self" type="application/rss+xml" />
          <lastBuildDate>${new Date(
            posts[0].createdAt
          ).toUTCString()}</lastBuildDate>
    ${posts
      .map((post) => {
        return `<item>
        <title><![CDATA[${post.title}]]></title>
        <link>https://draculatheme.com/blog/${post.slug}</link>
        <guid>https://draculatheme.com/blog/${post.slug}</guid>
        <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
        <description>
        <![CDATA[${post.excerpt}]]>
        </description>
        <content:encoded>
          <![CDATA[${post.content}]]>
        </content:encoded>
      </item>`;
      })
      .join(" ")}
        </channel>
      </rss>`;

    fs.writeFileSync("public/rss.xml", xml);
  } catch (e) {
    console.error(e);
  }
}

buildSitemap();
buildRss();
