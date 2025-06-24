import "./index.css";

import Link from "next/link";

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
      <Link href="/">
        <span>Dracula Theme</span>
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
        </ul>
      </nav>
    </div>
  </header>
);
