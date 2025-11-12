import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingDuration from "reading-duration";

const countWords = (text: string) => {
  return text.trim().split(/\s+/).length;
};

type DateFrontmatter = {
  createdAt?: string;
};

type FrontmatterWithDate = Record<string, unknown> & {
  date?: DateFrontmatter;
};

interface ParsedMdxFile {
  frontmatter: FrontmatterWithDate;
  content: string;
  readingTime: string;
  wordCount: number;
}

type MdxDataEntry = FrontmatterWithDate & {
  slug: string;
  content: string;
  readingTime: string;
  words: number;
};

export const formatReadingTime = (durationText: string) => {
  if (!durationText) {
    return "1 min.";
  }

  const match = durationText.match(/(\d+)\smin/);
  return match ? `${match[1]} min.` : "1 min.";
};

const getMdxFiles = (dir: string) => {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
};

const parseMdxFile = (filePath: string): ParsedMdxFile => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}.`);
  }

  try {
    const rawContent = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(rawContent);

    return {
      frontmatter: data as FrontmatterWithDate,
      content,
      readingTime: formatReadingTime(
        readingDuration(rawContent, { emoji: false })
      ),
      wordCount: countWords(content)
    };
  } catch (error) {
    console.error(`Error reading MDX file: ${filePath}.\n`);
    throw error;
  }
};

const getMdxData = (dir: string) => {
  const mdxFiles = getMdxFiles(dir).map((file) => {
    const filePath = path.join(dir, file);
    const { frontmatter, content, readingTime, wordCount } =
      parseMdxFile(filePath);
    const slug = path.basename(file, path.extname(file));

    return {
      ...frontmatter,
      slug,
      content,
      readingTime,
      words: wordCount
    } as MdxDataEntry;
  });

  return mdxFiles.sort((firstFile, secondFile) => {
    const firstCreatedAt = firstFile.date?.createdAt ?? "";
    const secondCreatedAt = secondFile.date?.createdAt ?? "";
    return secondCreatedAt.localeCompare(firstCreatedAt);
  });
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

  const { frontmatter, content, readingTime } = parseMdxFile(filePath);

  return {
    ...frontmatter,
    content,
    readingTime
  };
};
