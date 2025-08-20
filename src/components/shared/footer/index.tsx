import "./index.css";

import Link from "next/link";

import { Newsletter } from "./newsletter";

interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
}

interface Section {
  title: string;
  links: LinkItem[];
}

const sections: Section[] = [
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
      { label: "Dracula Pro", href: "/pro" },
      { label: "Dracula Shop", href: "/shop" }
    ]
  },
  {
    title: "Dracula Pro",
    links: [
      { label: "Support", href: "/pro#faqs" },
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
      {
        label: "Discord",
        href: "https://discord.gg/yDcFsrYuq9",
        external: true
      },
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Dracula_(color_scheme)",
        external: true
      }
    ]
  }
];

export const Footer = () => (
  <footer>
    <Newsletter />
    <hr />
    <div className="container">
      <div>
        <Link href="/" className="logo">
          Dracula Theme
        </Link>
        <p>The most famous theme ever created and available everywhere.</p>
        <p>
          Made with 💜 by{" "}
          <a
            href="https://zenorocha.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zeno
          </a>{" "}
          and{" "}
          <a
            href="https://luxonauta.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Luxonauta
          </a>
        </p>
      </div>
      {sections.map(({ title, links }) => (
        <div key={title}>
          <h3>{title}</h3>
          <ul>
            {links.map(({ label, href, external }) => (
              <li key={href}>
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                ) : (
                  <Link href={href}>{label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </footer>
);
