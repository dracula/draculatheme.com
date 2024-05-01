import "./index.scss";
import { Command } from "cmdk";
import {
  BarChart3Icon,
  BookOpenCheckIcon,
  CircleSlashIcon,
  CoffeeIcon,
  CommandIcon,
  HeartHandshakeIcon,
  RocketIcon,
  RssIcon,
  SearchIcon,
  StickerIcon,
  StoreIcon,
  TagIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import paths from "src/lib/paths";

const CommandMenu = () => {
  const appsCount = paths.length;
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleOpen = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const navigate = useCallback(
    (route) => {
      router.push(route);
      toggleOpen();
    },
    [router, toggleOpen]
  );

  const handleSearchInputChange = useCallback(
    (newValue) => {
      setSearch(newValue.trim());
    },
    [search]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleOpen();
      }
    },
    [toggleOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const renderSearchResults = () => {
    if (!search) return null;

    const searchMatch = paths.filter((app) =>
      app.params.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <Command.Group heading="Apps">
        {searchMatch.map((app) => (
          <Command.Item
            key={app.params.theme}
            onSelect={() => navigate(`/${app.params.theme}`)}
          >
            <span className="icon">
              <StickerIcon />
            </span>
            <span>{app.params.title}</span>
          </Command.Item>
        ))}
      </Command.Group>
    );
  };

  return (
    <>
      <div className="search-wrapper">
        <input
          type="search"
          name="global-search"
          id="global-search"
          placeholder={`Search ${appsCount} themes`}
          onClick={() => setOpen(true)}
        />
        <span className="icon search">
          <SearchIcon />
        </span>
        <span className="icon cmdk">
          <CommandIcon />
          <span>K</span>
        </span>
      </div>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
      >
        <div className="cmd-input-wrapper">
          <Command.Input
            placeholder="Search for a theme"
            value={search}
            onValueChange={handleSearchInputChange}
          />
          <span className="icon search">
            <SearchIcon />
          </span>
        </div>
        <Command.List>
          <Command.Empty>
            <span className="icon inline">
              <CircleSlashIcon />
            </span>
            <span>No results found.</span>
          </Command.Empty>
          {renderSearchResults()}
          <Command.Group heading="Pages">
            <Command.Item onSelect={() => navigate("/")}>
              <span className="icon inline">
                <CoffeeIcon />
              </span>
              <span>Browse themes</span>
            </Command.Item>
            <Command.Item onSelect={(value) => navigate(`/${value}`)}>
              <span className="icon inline">
                <BookOpenCheckIcon />
              </span>
              <span>About</span>
            </Command.Item>
            <Command.Item onSelect={(value) => navigate(`/${value}`)}>
              <span className="icon inline">
                <RssIcon />
              </span>
              <span>Blog</span>
            </Command.Item>
            <Command.Item onSelect={(value) => navigate(`/${value}`)}>
              <span className="icon inline">
                <HeartHandshakeIcon />
              </span>
              <span>Contribute</span>
            </Command.Item>
            <Command.Item onSelect={(value) => navigate(`/${value}`)}>
              <span className="icon inline">
                <StoreIcon />
              </span>
              <span>Shop</span>
            </Command.Item>
            <Command.Item onSelect={(value) => navigate(`/${value}`)}>
              <span className="icon inline">
                <BarChart3Icon />
              </span>
              <span>Open</span>
            </Command.Item>
          </Command.Group>
          <Command.Group heading="Dracula PRO">
            <Command.Item onSelect={(value) => navigate(`/${value}`)}>
              <span className="icon inline">
                <RocketIcon />
              </span>
              <span>Dracula PRO</span>
            </Command.Item>
            <Command.Item onSelect={(value) => navigate(`/${value}`)}>
              <span className="icon inline">
                <TagIcon />
              </span>
              <span>Changelog</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
};

export default CommandMenu;
