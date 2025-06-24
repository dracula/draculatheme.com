import fs from "node:fs";

import matter from "gray-matter";
import readingDuration from "reading-duration";

const countWords = (text: string) => {
  return text.trim().split(/\s+/).length;
};

export const readMdxFile = (filePath = "", includeReadingTime = false) => {
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
          reading_time: readingDuration(rawContent, { emoji: false })
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
