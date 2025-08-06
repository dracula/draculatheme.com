"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { SearchIcon } from "@/icons/search";
import { paths } from "@/lib/paths";
import type { PathItem } from "@/lib/types";

const pages = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contribute", href: "/contribute" },
      { label: "Open Dashboard", href: "/open" }
    ]
  },
  {
    title: "Projects",
    links: [
      { label: "Dracula Theme", href: "/" },
      { label: "Specification", href: "/spec" },
      { label: "Dracula PRO", href: "/pro" },
      { label: "Dracula Shop", href: "/shop" }
    ]
  },
  {
    title: "Dracula PRO",
    links: [
      { label: "Support", href: "/pro#faq" },
      { label: "Changelog", href: "/pro/changelog" },
      { label: "Journey", href: "/pro/journey" },
      { label: "Request Access", href: "/pro/request-access" }
    ]
  },
  {
    title: "Community",
    links: [
      {
        label: "X (formerly Twitter)",
        href: "https://x.com/draculatheme",
        external: true
      },
      {
        label: "GitHub",
        href: "https://github.com/dracula/dracula-theme",
        external: true
      },
      { label: "Discord", href: "/discord-invite" },
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Dracula_(color_scheme)",
        external: true
      }
    ]
  }
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

export const CommandBar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
    setSearchQuery("");
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setSearchQuery("");
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "k") {
        event.preventDefault();
        openDialog();
      }
      if (event.key === "Escape" && isDialogOpen) {
        closeDialog();
      }
    },
    [isDialogOpen, openDialog, closeDialog]
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!dialogRef.current) return;

      const rect = dialogRef.current.getBoundingClientRect();

      if (
        rect.left > event.clientX ||
        rect.right < event.clientX ||
        rect.top > event.clientY ||
        rect.bottom < event.clientY
      ) {
        closeDialog();
      }
    },
    [closeDialog]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isDialogOpen) {
      document.body.classList.add("block-overflow");
      dialogRef.current?.showModal();
      inputRef.current?.focus();
      document.addEventListener("click", handleClickOutside);
    } else {
      document.body.classList.remove("block-overflow");
      dialogRef.current?.close();
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.body.classList.remove("block-overflow");
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDialogOpen, handleClickOutside]);

  const filteredResults = searchQuery
    ? paths.filter((item) => matchesSearch(item, searchQuery))
    : [];

  const hasSearchResults = searchQuery && filteredResults.length > 0;

  return (
    <>
      <button type="button" className="command-bar" onClick={openDialog}>
        <div className="search">
          <SearchIcon />
          <span>Search over {paths.length} themes</span>
          <span className="shortcut">
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </span>
        </div>
      </button>
      <dialog
        ref={dialogRef}
        onClose={closeDialog}
        className="command-bar-dialog"
      >
        <div className="search">
          <input
            ref={inputRef}
            type="search"
            name="search"
            placeholder={`Search over ${paths.length} themes`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon />
        </div>
        {searchQuery &&
          (hasSearchResults ? (
            <ul>
              <li>
                <h3>Search Results</h3>
                <ul>
                  {filteredResults.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={`/${item.repo}`}
                        onClick={() => closeDialog()}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          ) : (
            <ul>
              <li className="empty">
                <h3>Oops! No match!</h3>
                <p>Try loosening up those search criteria!</p>
              </li>
            </ul>
          ))}
        <ul>
          {pages.map((page) => (
            <li key={page.title}>
              <h3>{page.title}</h3>
              <ul>
                {page.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a href={link.href} onClick={() => closeDialog()}>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} onClick={() => closeDialog()}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
};
