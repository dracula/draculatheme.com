import type { Heading } from "@/lib/types";

interface OnThisPageProps {
  headings: Heading[];
}

export const OnThisPage = ({ headings }: OnThisPageProps) => {
  if (headings.length === 0) return null;

  return (
    <nav className="on-this-page">
      <h3>On this page</h3>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
