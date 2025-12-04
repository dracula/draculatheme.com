import type { Author } from "./authors";

export interface BaseContent {
  slug: string;
  title: string;
  excerpt: string;
  date: { createdAt: string; updatedAt: string };
  content: string;
  readingTime: string;
}

export interface Post extends BaseContent {
  cover: string;
  featured?: string | boolean;
  authors: Author["id"][];
}
