"use client";

import { parseAsString, useQueryStates } from "nuqs";

import { matchesCategory, matchesPlatform, matchesSearch } from "@/lib/filter";
import type { Path } from "@/lib/types";

import { FilterSidebar } from "./filter-sidebar";
import { ItemList } from "./item-list";

const ContentWrapper = ({ paths }: { paths: Path[] }) => {
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
      <aside>
        <FilterSidebar
          searchQuery={searchQuery}
          selectedPlatform={selectedPlatform}
          selectedCategory={selectedCategory}
          onSearchChange={(v) => setQueryStates({ searchQuery: v })}
          onPlatformChange={(v) => setQueryStates({ platforms: v })}
          onCategoryChange={(v) => setQueryStates({ categories: v })}
        />
      </aside>
      <ItemList items={filtered} />
    </>
  );
};

export default ContentWrapper;
