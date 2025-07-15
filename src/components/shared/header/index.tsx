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
              <Link href="/" className="action stars">
                <GithubIcon />{" "}
                {starCount > 0 && (
                  <span className="star-count">
                    {starCount.toLocaleString()}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
