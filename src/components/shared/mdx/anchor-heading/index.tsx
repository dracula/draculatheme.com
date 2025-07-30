import "./index.css";

import type { JSX } from "react";

interface AnchorHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

const generateId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
};

export const AnchorHeading = ({ level, children }: AnchorHeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const textContent = children?.toString() ?? "";
  const id = generateId(textContent);
  const href = `#${id}`;

  return (
    <Tag id={id} className="anchor-heading">
      <a
        href={href}
        className="anchor-link"
        aria-label={`Link to ${textContent}`}
      >
        §
      </a>
      {children}
    </Tag>
  );
};
