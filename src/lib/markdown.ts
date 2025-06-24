import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import type { Author } from "./authors";

export interface BaseContent {
  slug: string;
  title: string;
  excerpt: string;
  date: { createdAt: string; updatedAt: string };
  content: MDXRemoteSerializeResult;
}

export interface Post extends BaseContent {
  cover: string;
  featured?: boolean;
  authors: Author["id"][];
}
