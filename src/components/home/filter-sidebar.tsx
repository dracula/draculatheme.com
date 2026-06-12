import useSound from "use-sound";

import { SearchIcon } from "@/icons/search";
import { TickIcon } from "@/icons/tick";
import { paths } from "@/lib/paths";
import { categories, platforms, variants } from "@/utils/home/filter";

interface FilterOption {
  name: string;
  label: string;
}

interface FilterSidebarProps {
  searchQuery: string;
  selectedPlatform: string;
  selectedCategory: string;
  selectedVariant: string;
  onSearchChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onVariantChange: (value: string) => void;
}

interface FilterGroupProps {
  title: string;
  filterOptions: FilterOption[];
  inputName: string;
  currentValue: string;
  onValueChange: (value: string) => void;
  onInteraction: () => void;
}

const FilterGroup = ({
  title,
  filterOptions,
  inputName,
  currentValue,
  onValueChange,
  onInteraction
}: FilterGroupProps) => (
  <div className="filter-group">
    <span className="label">{title}</span>
    {filterOptions.map((option) => (
      <label
        key={option.name}
        className="item"
        onClick={() => onInteraction()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onInteraction();
          }
        }}
      >
        <input
          type="radio"
          name={inputName}
          value={option.name}
          checked={currentValue === option.name}
          onChange={() => onValueChange(option.name)}
        />
        <TickIcon />
        <span>{option.label}</span>
      </label>
    ))}
  </div>
);

export const FilterSidebar = ({
  searchQuery,
  selectedPlatform,
  selectedCategory,
  selectedVariant,
  onSearchChange,
  onPlatformChange,
  onCategoryChange,
  onVariantChange
}: FilterSidebarProps) => {
  const [play] = useSound("/sounds/click.mp3");

  const handleInteraction = () => {
    play();
  };

  return (
    <>
      <div className="search">
        <SearchIcon />
        <input
          type="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          name="search"
          value={searchQuery}
          placeholder={`Search over ${paths.length} themes`}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <FilterGroup
        title="Platforms"
        filterOptions={platforms}
        inputName="platforms"
        currentValue={selectedPlatform}
        onValueChange={onPlatformChange}
        onInteraction={handleInteraction}
      />
      <FilterGroup
        title="Categories"
        filterOptions={categories}
        inputName="categories"
        currentValue={selectedCategory}
        onValueChange={onCategoryChange}
        onInteraction={handleInteraction}
      />
      <FilterGroup
        title="Variants"
        filterOptions={variants}
        inputName="variants"
        currentValue={selectedVariant}
        onValueChange={onVariantChange}
        onInteraction={handleInteraction}
      />
    </>
  );
};
