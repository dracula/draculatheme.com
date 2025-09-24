"use client";

import { parseAsString, useQueryStates } from "nuqs";

import type { Path } from "@/lib/types";
import {
  matchesCategory,
  matchesPlatform,
  matchesSearch
} from "@/utils/home/filter";

import { FilterSidebar } from "./filter-sidebar";
import { ItemList } from "./item-list";

export const ContentWrapper = ({ paths }: { paths: Path[] }) => {
  const [
    { searchQuery, platforms: selectedPlatform, categories: selectedCategory },
    setQueryStates
  ] = useQueryStates(
    {
      searchQuery: parseAsString.withDefault(""),
      platforms: parseAsString.withDefault("all"),
      categories: parseAsString.withDefault("all")
    },
    { history: "replace" }
  );

  const filtered = paths.filter(
    (item) =>
      matchesSearch(item, searchQuery) &&
      matchesPlatform(item, selectedPlatform) &&
      matchesCategory(item, selectedCategory)
  );

  return (
    <>
      <nav aria-label="Theme Filters">
        <FilterSidebar
          searchQuery={searchQuery}
          selectedPlatform={selectedPlatform}
          selectedCategory={selectedCategory}
          onSearchChange={(v) => setQueryStates({ searchQuery: v })}
          onPlatformChange={(v) => setQueryStates({ platforms: v })}
          onCategoryChange={(v) => setQueryStates({ categories: v })}
        />
      </nav>
      <ItemList items={filtered} />
    </>
  );
};
