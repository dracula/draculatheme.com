"use client";

import "./index.css";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BookIcon } from "@/icons/book";
import { GithubIcon } from "@/icons/github";
import { HeartIcon } from "@/icons/heart";
import { NewsIcon } from "@/icons/news";
import { ShopIcon } from "@/icons/shop";
import { ZapIcon } from "@/icons/zap";

import { ThemeToggle } from "../theme-toggle";
import { CommandBar } from "./command-bar";

const navItems = [
  { href: "/about", label: "About", icon: <BookIcon /> },
  { href: "/blog", label: "Blog", icon: <NewsIcon /> },
  { href: "/contribute", label: "Contribute", icon: <HeartIcon /> },
  { href: "/shop", label: "Shop", icon: <ShopIcon /> },
  {
    href: "/pro",
    label: "Dracula Pro",
    icon: <ZapIcon />,
    className: "primary"
  }
];

export const Header = () => {
  const pathname = usePathname();
  const pathKey = pathname === "/" ? "" : pathname;

  const [isNavActive, setIsNavActive] = useState(false);

  const handleToggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  const buildClassName = (href: string, className?: string) => {
    const classes = ["action"];

    if (className) {
      classes.push(className);
    }

    classes.push(href.slice(1));

    if (pathKey === href) {
      classes.push("active");
    }

    return classes.join(" ");
  };

  return (
    <header>
      <div className="container">
        <div className="wrapper">
          <Link href="/" className="logo">
            Dracula Theme
          </Link>
          <CommandBar />
          <button
            type="button"
            onClick={handleToggleNav}
            className="action primary mb-trigger"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="13"
              height="13"
              color="currentColor"
              fill="none"
            >
              <title className="sr-only">Menu Icon</title>
              <path
                d="M4 9L20 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 15L14 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only">Open Menu</span>
          </button>
        </div>
        <nav className={isNavActive ? "active" : ""}>
          <ul>
            {navItems.map(({ href, label, icon, className }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => {
                    setIsNavActive(false);
                  }}
                  className={buildClassName(href, className)}
                >
                  {icon}
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="https://github.com/dracula/dracula-theme"
                className="action stars"
              >
                <GithubIcon /> <span className="star-count">+24k</span>
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
