import { SearchIcon } from "@/icons/search";
import { paths } from "@/lib/paths";

export const CommandBar = () => {
  return (
    <button type="button" className="command-bar">
      <div className="search">
        <SearchIcon />
        <span>Search over {paths.length} themes</span>
        <span className="shortcut">
          <kbd>⌘</kbd>
          <kbd>K</kbd>
        </span>
      </div>
    </button>
  );
};
