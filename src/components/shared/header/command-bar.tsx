"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { BookIcon } from "@/icons/book";
import { BugIcon } from "@/icons/bug";
import { ChatIcon } from "@/icons/chat";
import { EditIcon } from "@/icons/edit";
import { FileIcon } from "@/icons/file";
import { GithubIcon } from "@/icons/github";
import { HeartIcon } from "@/icons/heart";
import { HomeIcon } from "@/icons/home";
import { NewsIcon } from "@/icons/news";
import { OpenSourceIcon } from "@/icons/open-source";
import { RocketIcon } from "@/icons/rocket";
import { SearchIcon } from "@/icons/search";
import { ShopIcon } from "@/icons/shop";
import { ZapIcon } from "@/icons/zap";
import { paths } from "@/lib/paths";
import type { PathItem } from "@/lib/types";

const pages = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about", icon: <BookIcon /> },
      { label: "Blog", href: "/blog", icon: <NewsIcon /> },
      { label: "Contribute", href: "/contribute", icon: <HeartIcon /> },
      { label: "Open Dashboard", href: "/open", icon: <OpenSourceIcon /> }
    ]
  },
  {
    title: "Projects",
    links: [
      { label: "Dracula Theme", href: "/", icon: <HomeIcon /> },
      { label: "Specification", href: "/spec", icon: <FileIcon /> },
      { label: "Dracula Pro", href: "/pro", icon: <ZapIcon /> },
      { label: "Dracula Shop", href: "/shop", icon: <ShopIcon /> }
    ]
  },
  {
    title: "Dracula Pro",
    links: [
      { label: "Support", href: "/pro#faqs", icon: <BugIcon /> },
      { label: "Changelog", href: "/pro/changelog", icon: <EditIcon /> },
      { label: "Journey", href: "/pro/journey", icon: <RocketIcon /> },
      {
        label: "Request Access",
        href: "/pro/request-access",
        icon: <HeartIcon />
      }
    ]
  },
  {
    title: "Community",
    links: [
      {
        label: "X (formerly Twitter)",
        href: "https://x.com/draculatheme",
        icon: <ChatIcon />,
        external: true
      },
      {
        label: "GitHub",
        href: "https://github.com/dracula/dracula-theme",
        icon: <GithubIcon />,
        external: true
      },
      { label: "Discord", href: "/discord-invite", icon: <ChatIcon /> },
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Dracula_(color_scheme)",
        icon: <FileIcon />,
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

type PageLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
};

const matchesPageLink = (link: PageLink, searchedTerm: string): boolean => {
  const term = searchedTerm.toLowerCase();
  return (
    link.label.toLowerCase().includes(term) ||
    link.href.toLowerCase().includes(term)
  );
};

type SearchEntry =
  | {
      key: string;
      label: string;
      href: string;
      external?: boolean;
      icon: React.ReactNode;
      kind: "theme";
    }
  | {
      key: string;
      label: string;
      href: string;
      external?: boolean;
      icon: React.ReactNode;
      kind: "page";
    };

export const CommandBar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

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
      if (!dialogRef.current) {
        return;
      }

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
    setMounted(true);
  }, []);

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

  const flatPageLinks: PageLink[] = useMemo(
    () =>
      pages.flatMap((group) =>
        group.links.map((l) => ({
          label: l.label,
          href: l.href,
          icon: l.icon,
          external: l.external
        }))
      ),
    []
  );

  const filteredThemes = useMemo(() => {
    if (!searchQuery) {
      return [];
    }
    return paths.filter((item) => matchesSearch(item, searchQuery));
  }, [searchQuery]);

  const filteredPageLinks = useMemo(() => {
    if (!searchQuery) {
      return [];
    }
    return flatPageLinks.filter((link) => matchesPageLink(link, searchQuery));
  }, [searchQuery, flatPageLinks]);

  const combinedResults: SearchEntry[] = useMemo(() => {
    if (!searchQuery) {
      return [];
    }

    const themes: SearchEntry[] = filteredThemes.map((item) => ({
      key: `theme:${item.repo}`,
      label: item.title,
      href: `/${item.repo}`,
      kind: "theme",
      icon: (
        <Image
          src={`/icons/${item.icon}`}
          width={100}
          height={100}
          alt={`${item.title} Icon`}
          className="icon app"
        />
      )
    }));

    const pageItems: SearchEntry[] = filteredPageLinks.map((link) => ({
      key: `page:${link.href}`,
      label: link.label,
      href: link.href,
      icon: link.icon,
      external: link.external,
      kind: "page"
    }));

    return [...themes, ...pageItems];
  }, [searchQuery, filteredThemes, filteredPageLinks]);

  const hasSearchResults = searchQuery.length > 0 && combinedResults.length > 0;

  const dialogContent = (
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
          aria-label="Search"
        />
        <SearchIcon />
      </div>
      {searchQuery &&
        (hasSearchResults ? (
          <ul>
            <li>
              <h3 className="sr-only">Search Results</h3>
              <ul>
                {combinedResults.map((entry, index) => (
                  <li key={entry.key}>
                    {entry.external ? (
                      <a
                        href={entry.href}
                        onClick={() => closeDialog()}
                        ref={(el) => {
                          itemRefs.current[index] = el;
                        }}
                      >
                        {entry.icon}
                        <span>{entry.label}</span>
                      </a>
                    ) : (
                      <Link
                        href={entry.href}
                        onClick={() => closeDialog()}
                        ref={(el) => {
                          itemRefs.current[index] = el;
                        }}
                      >
                        {entry.icon}
                        <span>{entry.label}</span>
                      </Link>
                    )}
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
            <span className="title">{page.title}</span>
            <ul>
              {page.links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a href={link.href} onClick={() => closeDialog()}>
                      {link.icon}
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} onClick={() => closeDialog()}>
                      {link.icon}
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
  );

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
      {mounted && createPortal(dialogContent, document.body)}
    </>
  );
};
