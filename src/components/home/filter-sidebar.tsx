import React from "react";

import { SearchIcon } from "@/icons/search";
import { TickIcon } from "@/icons/tick";
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
  <>
    <div className="search">
      <SearchIcon className="icon" />
      <input
        type="search"
        name="search"
        value={searchQuery}
        placeholder={`Search over ${paths.length} themes`}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
    <div className="filter-group">
      <span className="label">Platforms</span>
      {platforms.map((opt) => (
        <label key={opt.name} className="item">
          <input
            type="radio"
            name="platforms"
            value={opt.name}
            checked={selectedPlatform === opt.name}
            onChange={() => onPlatformChange(opt.name)}
          />
          <TickIcon className="icon" />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
    <div className="filter-group">
      <span className="label">Categories</span>
      {categories.map((opt) => (
        <label key={opt.name} className="item">
          <input
            type="radio"
            name="categories"
            value={opt.name}
            checked={selectedCategory === opt.name}
            onChange={() => onCategoryChange(opt.name)}
          />
          <TickIcon className="icon" />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  </>
);
