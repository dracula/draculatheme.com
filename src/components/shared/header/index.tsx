import "./index.css";

import Link from "next/link";

import { GithubIcon } from "@/icons/github";

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
      <Link href="/" className="logo">
        Dracula Theme
      </Link>
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
