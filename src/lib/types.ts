import type { paths } from "./paths";

export type Props<T = Record<string, string>> = { params: Promise<T> };

export type Path = {
  repo: string;
  title: string;
  icon: string;
  platform?: string[];
  synonyms?: string[];
  categories: string[];
  legacyViews?: number;
  views?: number;
};

export type PathItem = (typeof paths)[number];
