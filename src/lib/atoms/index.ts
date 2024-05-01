import { atom } from "jotai";
import categories from "src/lib/filters/categories";
import platforms from "src/lib/filters/platforms";

export const searchAtom = atom("");

export const platformsFiltersAtom = atom(
  Array.from({ length: platforms.length }, () => false)
);

export const categoriesFiltersAtom = atom(
  Array.from({ length: categories.length }, () => false)
);
