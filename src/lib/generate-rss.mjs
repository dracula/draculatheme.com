import { readFileSync, writeFileSync } from "fs";
import { globby } from "globby";
import matter from "gray-matter";
import RSS from "rss";

async function generate() {
  let allPosts = await globby(["./content/posts/*.mdx"]);

  const postsData = allPosts.map((post) => {
    const fileContents = readFileSync(post, "utf8");
    const { data } = matter(fileContents);
    return { post, data }; // A estrutura retorna um objeto com 'post' e 'data'
  });

  // Ordenação correta dos posts pela data de criação
  postsData.sort(
    (a, b) => new Date(b.data.date.createdAt) - new Date(a.data.date.createdAt)
  );

  const feed = new RSS({
    title: "Dracula Theme - Blog",
    description:
      "The journey of building the most universal dark theme ever made.",
    site_url: "https://draculatheme.com",
    feed_url: "https://draculatheme.com/rss.xml"
  });

  postsData.map((post) => {
    const { data } = post;
    const slug = post.post
      .replace("./content/posts", "/blog")
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
}

generate();
