import { readFileSync, writeFileSync } from "fs";

import RSS from "rss";
import { globby } from "globby";
import matter from "gray-matter";

async function generate() {
  let allLogs = await globby(["./logs/*.md"]);

  const feed = new RSS({
    title: "Dracula PRO - Changelog",
    description:
      "Discover the latest updates and improvements for Dracula Pro.",
    site_url: "https://draculatheme.com/pro/changelog",
    feed_url: "https://draculatheme.com/changelog-rss.xml",
  });

  allLogs.map((log) => {
    const fileContents = readFileSync(log, "utf8");
    const { data } = matter(fileContents);

    feed.item({
      title: data.title,
      url: `https://draculatheme.com/pro/changelog#${data.id}`,
      date: data.date,
      description: data.excerpt,
    });
  });

  writeFileSync("public/changelog-rss.xml", feed.xml({ indent: true }));
}

generate();
