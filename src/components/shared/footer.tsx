import Link from "next/link";

const sections = [
  {
    title: "Projects",
    links: [
      { label: "Dracula Theme", href: "/" },
      { label: "Dracula PRO", href: "/pro" },
      { label: "Support", href: "/pro#faq" },
      { label: "Changelog", href: "/pro/changelog" },
      { label: "Request Access", href: "/pro/request-access" },
      { label: "Dracula Shop", href: "/shop" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contribute", href: "/contribute" },
      { label: "Open Dashboard", href: "/open" },
      { label: "Specification", href: "/spec" }
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

export const Footer = () => (
  <footer>
    <div className="container">
      <div>
        <span>Dracula Theme</span>
      </div>
      <div>
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
    </div>
  </footer>
);
