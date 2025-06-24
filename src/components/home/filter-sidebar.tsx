import React from "react";

import { categories, platforms } from "@/lib/filter";
import { paths } from "@/lib/paths";

interface FilterSidebarProps {
  searchQuery: string;
  selectedPlatform: string;
  selectedCategory: string;
  onSearchChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export const FilterSidebar = ({
  searchQuery,
  selectedPlatform,
  selectedCategory,
  onSearchChange,
  onPlatformChange,
  onCategoryChange
}: FilterSidebarProps) => (
  <aside>
    <input
      type="text"
      value={searchQuery}
      placeholder={`Search over ${paths.length} themes`}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <fieldset>
      <legend>Platforms</legend>
      {platforms.map((opt) => (
        <label key={opt.name}>
          <input
            type="radio"
            name="platforms"
            value={opt.name}
            checked={selectedPlatform === opt.name}
            onChange={() => onPlatformChange(opt.name)}
          />
          {opt.label}
        </label>
      ))}
    </fieldset>
    <fieldset>
      <legend>Categories</legend>
      {categories.map((opt) => (
        <label key={opt.name}>
          <input
            type="radio"
            name="categories"
            value={opt.name}
            checked={selectedCategory === opt.name}
            onChange={() => onCategoryChange(opt.name)}
          />
          {opt.label}
        </label>
      ))}
    </fieldset>
  </aside>
);
