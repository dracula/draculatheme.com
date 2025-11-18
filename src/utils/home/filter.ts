import type { PathItem } from "../../lib/types";

export const platforms = [
  { name: "all", label: "All Platforms" },
  { name: "linux", label: "Linux" },
  { name: "macos", label: "macOS" },
  { name: "windows", label: "Windows" }
];

export const categories = [
  { name: "all", label: "All Categories" },
  { name: "browser", label: "Browsers" },
  { name: "editor", label: "Editors" },
  { name: "ide", label: "IDEs" },
  { name: "other", label: "Others" },
  { name: "service", label: "Services" },
  { name: "social", label: "Social Media" },
  { name: "terminal", label: "Terminals" }
];

const categoryImportance: Record<string, number> = {
  editor: 1,
  terminal: 2,
  ide: 3,
  browser: 4,
  service: 5,
  social: 6,
  other: 7
};

export const getCategoryImportance = (categories: string[]): number => {
  if (categories.length === 0) {
    return 999;
  }

  return Math.min(...categories.map((cat) => categoryImportance[cat] ?? 999));
};

export const matchesSearch = (
  item: PathItem,
  searchedTerm: string
): boolean => {
  const term = searchedTerm.toLowerCase();
  return (
    item.title.toLowerCase().includes(term) ||
    item.repo.toLowerCase().includes(term) ||
    (item.synonyms ?? []).some((synonyms: string) =>
      synonyms.toLowerCase().includes(term)
    )
  );
};

export const matchesPlatform = (item: PathItem, selected: string): boolean => {
  if (selected === "all" || !item.platform) {
    return true;
  }

  return item.platform.includes(selected);
};

export const matchesCategory = (item: PathItem, selected: string): boolean => {
  if (selected === "all") {
    return true;
  }

  return item.categories.includes(selected);
};
