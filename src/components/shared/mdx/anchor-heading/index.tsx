import "./index.css";

import type { JSX } from "react";
import { isValidElement } from "react";

interface AnchorHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  idPrefix?: string;
}

const extractTextContent = (node: React.ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (isValidElement(node)) {
    return extractTextContent(
      (node.props as { children?: React.ReactNode }).children
    );
  }

  if (Array.isArray(node)) {
    return node.map(extractTextContent).join("");
  }

  return "";
};

const generateId = (children: React.ReactNode): string => {
  const textContent = extractTextContent(children);
  return textContent
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
};

export const AnchorHeading = ({
  level,
  children,
  idPrefix
}: AnchorHeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const textContent = extractTextContent(children);
  const baseId = generateId(children);
  const id = idPrefix ? `${idPrefix}-${baseId}` : baseId;
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
