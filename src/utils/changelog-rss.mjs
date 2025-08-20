import { readFileSync, writeFileSync } from "node:fs";
import { globby } from "globby";
import matter from "gray-matter";
import RSS from "rss";

const generate = async () => {
  const allLogs = await globby(["./content/logs/*.mdx"]);

  const logsData = allLogs.map((log) => {
    const fileContents = readFileSync(log, "utf8");
    const { data } = matter(fileContents);
    return { log, data };
  });

  logsData.sort(
    (a, b) => new Date(b.data.date.createdAt) - new Date(a.data.date.createdAt)
  );

  const feed = new RSS({
    title: "Changelog • Dracula Pro",
    description:
      "Discover the latest updates and improvements for Dracula Pro.",
    site_url: "https://draculatheme.com/pro/changelog",
    feed_url: "https://draculatheme.com/changelog-rss.xml"
  });

  logsData.forEach((item, index) => {
    const { data } = item;

    feed.item({
      title: data.title,
      url: `https://draculatheme.com/pro/changelog#${logsData.length - index}`,
      date: data.date.createdAt,
      description: data.excerpt
    });
  });

  writeFileSync("public/changelog-rss.xml", feed.xml({ indent: true }));
};

generate();
