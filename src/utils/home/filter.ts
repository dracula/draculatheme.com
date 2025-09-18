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
