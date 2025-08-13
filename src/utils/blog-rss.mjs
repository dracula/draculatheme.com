import { readFileSync, writeFileSync } from "node:fs";
import { globby } from "globby";
import matter from "gray-matter";
import RSS from "rss";

const generate = async () => {
  const allPosts = await globby(["./content/blog/*.mdx"]);

  const postsData = allPosts.map((post) => {
    const fileContents = readFileSync(post, "utf8");
    const { data } = matter(fileContents);
    return { post, data };
  });

  postsData.sort(
    (a, b) =>
      new Date(b.data.date.createdAt).getTime() -
      new Date(a.data.date.createdAt).getTime()
  );

  const feed = new RSS({
    title: "Blog • Dracula Theme",
    description:
      "“Truly there is no such thing as finality.” - Bram Stoker, Dracula",
    site_url: "https://draculatheme.com",
    feed_url: "https://draculatheme.com/rss.xml"
  });

  postsData.map((post) => {
    const { data } = post;
    const slug = post.post
      .replace("./content/blog", "/blog")
      .replace(".mdx", "");

    const image = data.coverImage
      ? `https://draculatheme.com${data.coverImage}`
      : "";

    feed.item({
      title: data.title,
      url: `https://draculatheme.com${slug}`,
      date: data.date.createdAt,
      description: data.excerpt,
      image_url: image
    });
  });

  writeFileSync("public/rss.xml", feed.xml({ indent: true }));
};

generate();
