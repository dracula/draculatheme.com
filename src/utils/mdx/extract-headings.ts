import type { Heading } from "@/lib/types";

export const extractHeadings = (content: string): Heading[] => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match: RegExpExecArray | null = headingRegex.exec(content);

  while (match) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();

    headings.push({ id, text, level });
    match = headingRegex.exec(content);
  }

  return headings;
};
