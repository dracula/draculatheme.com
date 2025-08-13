import React from "react";
import useSound from "use-sound";

import { SearchIcon } from "@/icons/search";
import { TickIcon } from "@/icons/tick";
import { categories, platforms } from "@/lib/filter";
import { paths } from "@/lib/paths";

interface FilterOption {
  name: string;
  label: string;
}

interface FilterSidebarProps {
  searchQuery: string;
  selectedPlatform: string;
  selectedCategory: string;
  onSearchChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

interface FilterGroupProps {
  label: string;
  options: FilterOption[];
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
  onSoundPlay: () => void;
}

const FilterGroup = ({
  label,
  options,
  name,
  selectedValue,
  onChange,
  onSoundPlay
}: FilterGroupProps) => (
  <div className="filter-group">
    <span className="label">{label}</span>
    {options.map((opt) => (
      <label
        key={opt.name}
        className="item"
        onClick={() => onSoundPlay()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSoundPlay();
          }
        }}
      >
        <input
          type="radio"
          name={name}
          value={opt.name}
          checked={selectedValue === opt.name}
          onChange={() => onChange(opt.name)}
        />
        <TickIcon />
        <span>{opt.label}</span>
      </label>
    ))}
  </div>
);

export const FilterSidebar = ({
  searchQuery,
  selectedPlatform,
  selectedCategory,
  onSearchChange,
  onPlatformChange,
  onCategoryChange
}: FilterSidebarProps) => {
  const soundUrl = "/sounds/click.mp3";
  const [play] = useSound(soundUrl);

  return (
    <>
      <div className="search">
        <SearchIcon />
        <input
          type="search"
          name="search"
          value={searchQuery}
          placeholder={`Search over ${paths.length} themes`}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <FilterGroup
        label="Platforms"
        options={platforms}
        name="platforms"
        selectedValue={selectedPlatform}
        onChange={onPlatformChange}
        onSoundPlay={play}
      />
      <FilterGroup
        label="Categories"
        options={categories}
        name="categories"
        selectedValue={selectedCategory}
        onChange={onCategoryChange}
        onSoundPlay={play}
      />
    </>
  );
};
