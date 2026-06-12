"use client";

import { parseAsString, useQueryStates } from "nuqs";

import type { Path } from "@/lib/types";
import {
  getCategoryImportance,
  matchesCategory,
  matchesPlatform,
  matchesSearch,
  matchesVariant
} from "@/utils/home/filter";

import { ProBanner } from "../shared/pro-banner";
import { FilterSidebar } from "./filter-sidebar";
import { ItemList } from "./item-list";

export const ContentWrapper = ({ paths }: { paths: Path[] }) => {
  const [
    {
      searchQuery,
      platforms: selectedPlatform,
      categories: selectedCategory,
      variants: selectedVariant
    },
    setQueryStates
  ] = useQueryStates(
    {
      searchQuery: parseAsString.withDefault(""),
      platforms: parseAsString.withDefault("all"),
      categories: parseAsString.withDefault("all"),
      variants: parseAsString.withDefault("all")
    },
    { history: "replace" }
  );

  const filtered = paths
    .filter(
      (item) =>
        matchesSearch(item, searchQuery) &&
        matchesPlatform(item, selectedPlatform) &&
        matchesCategory(item, selectedCategory) &&
        matchesVariant(item, selectedVariant)
    )
    .sort((a, b) => {
      if (a.teamPick && !b.teamPick) {
        return -1;
      }

      if (!a.teamPick && b.teamPick) {
        return 1;
      }

      if (a.teamPick && b.teamPick) {
        const categoryDiff =
          getCategoryImportance(a.categories) -
          getCategoryImportance(b.categories);

        if (categoryDiff !== 0) {
          return categoryDiff;
        }

        return (b.views ?? 0) - (a.views ?? 0);
      }

      return (b.views ?? 0) - (a.views ?? 0);
    });

  return (
    <>
      <nav aria-label="Theme filters">
        <FilterSidebar
          searchQuery={searchQuery}
          selectedPlatform={selectedPlatform}
          selectedCategory={selectedCategory}
          selectedVariant={selectedVariant}
          onSearchChange={(v) => setQueryStates({ searchQuery: v })}
          onPlatformChange={(v) => setQueryStates({ platforms: v })}
          onCategoryChange={(v) => setQueryStates({ categories: v })}
          onVariantChange={(v) => setQueryStates({ variants: v })}
        />
        <ProBanner />
      </nav>
      <ItemList items={filtered} />
    </>
  );
};
