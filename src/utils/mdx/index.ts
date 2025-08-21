import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingDuration from "reading-duration";

import { orderBy } from "./order-by";

const countWords = (text: string) => {
  return text.trim().split(/\s+/).length;
};

export const formatReadingTime = (durationText: string) => {
  if (!durationText) return "1 min.";
  const match = durationText.match(/(\d+)\smin/);
  return match ? `${match[1]} min.` : "1 min.";
};

const getMdxFiles = (dir: string) => {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
};

const readMdxFile = (filePath: string, includeReadingTime = false) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}.`);
  }

  try {
    const rawContent = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(rawContent);
    const wordCount = countWords(content);

    return {
      metadata: {
        ...data,
        ...(includeReadingTime && {
          readingTime: formatReadingTime(
            readingDuration(rawContent, { emoji: false })
          )
        }),
        words: wordCount
      },
      content
    };
  } catch (error) {
    console.error(`Error reading MDX file: ${filePath}.\n`);
    throw error;
  }
};

const getMdxData = (dir: string) => {
  const mdxFiles = getMdxFiles(dir).map((file) => {
    const fileData = readMdxFile(path.join(dir, file), true);
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
    ["date.createdAt"]
  );
};

export const getMdxDataFromDirectory = <T>(directoryName: string): T[] => {
  const directoryPath = path.join(process.cwd(), directoryName);
  const data = getMdxData(directoryPath);
  return data as T[];
};

export const getMdxFromFile = (directory: string, slug: string) => {
  const postsDirectory = path.join(process.cwd(), directory);
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (fs.existsSync(filePath) === false) {
    return null;
  }

  const rawContent = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(rawContent);

  return {
    ...data,
    content,
    readingTime: formatReadingTime(
      readingDuration(rawContent, { emoji: false })
    )
  };
};
