import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypeUnwrapImages from "rehype-unwrap-images";

import { orderBy } from "../order-by";
import { readMdxFile } from "./read-mdx-file";

const getMdxFiles = (dir: string) => {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
};

const getMdxData = (dir = "") => {
  const mdxFiles = getMdxFiles(dir).map((file) => {
    const fileData = readMdxFile(path.join(dir, file));

    const { metadata, content } = fileData;
    const slug = path.basename(file, path.extname(file));

    return {
      ...metadata,
      slug,
      content
    };
  });

  return orderBy(
    mdxFiles.filter((file) => file !== null),
    ["created_at"]
  );
};

export const getMdxDataFromDirectory = <T>(directoryName: string): T[] => {
  const directoryPath = path.join(process.cwd(), directoryName);
  const data = getMdxData(directoryPath);
  return data as T[];
};

export const getMdxFromFile = async (directory: string, slug: string) => {
  const postsDirectory = path.join(process.cwd(), directory);
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (fs.existsSync(filePath) === false) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");

  const { content, data } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeUnwrapImages],
      format: "mdx"
    }
  });

  return {
    ...data,
    content: mdxSource
  };
};
