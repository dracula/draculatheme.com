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

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return num.toString();
};

export const Header = ({ stars = 0 }: { stars?: string | number }) => {
  const starCount =
    typeof stars === "string" ? Number.parseInt(stars.replace(",", "")) : stars;

  return (
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
                <GithubIcon />{" "}
                {starCount > 0 && (
                  <span className="star-count">+{formatNumber(starCount)}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
