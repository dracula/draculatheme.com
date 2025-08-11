import "./index.css";

import Link from "next/link";

import { GithubIcon } from "@/icons/github";

import { CommandBar } from "./command-bar";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contribute", label: "Contribute" },
  { href: "/shop", label: "Shop" },
  { href: "/pro", label: "Dracula Pro", className: "primary" }
];

export const Header = () => (
  <header>
    <div className="container">
      <div className="wrapper">
        <Link href="/" className="logo">
          Dracula Theme
        </Link>
        <CommandBar />
        <button type="button" className="action primary mb-trigger">
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
      <nav>
        <ul>
          {navItems.map(({ href, label, className }) => (
            <li key={href}>
              <Link
                href={href}
                className={`action${className ? ` ${className}` : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="https://github.com/dracula/dracula-theme"
              className="action stars"
            >
              <GithubIcon /> <span className="star-count">+21k</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);
