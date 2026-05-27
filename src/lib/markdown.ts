import type { Author } from "./authors";

export type PostCategory =
  | "community"
  | "guides"
  | "launches"
  | "milestones"
  | "polls"
  | "promos"
  | "stories"
  | "ui"
  | "updates"
  | (string & {});

export interface BaseContent {
  slug: string;
  title: string;
  excerpt: string;
  date: { createdAt: string; updatedAt: string };
  content: string;
  readingTime: string;
}

export interface Post extends BaseContent {
  category: PostCategory;
  cover: string;
  featured?: string | boolean;
  authors: Author["id"][];
}
