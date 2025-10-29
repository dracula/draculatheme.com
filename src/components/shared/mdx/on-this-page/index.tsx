"use client";

import "./index.css";

import { useEffect, useState } from "react";

import type { Heading } from "@/lib/types";

interface OnThisPageProps {
  headings: Heading[];
}

export const OnThisPage = ({ headings }: OnThisPageProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const getActiveHeading = () => {
      const scrollPosition = window.scrollY;
      const threshold = 150;

      if (scrollPosition < 100) {
        setActiveId(headings.length > 0 ? headings[0].id : "");
        return;
      }

      const headingElements = headings
        .map((heading) => ({
          id: heading.id,
          element: document.getElementById(heading.id)
        }))
        .filter((item) => item.element !== null) as Array<{
        id: string;
        element: HTMLElement;
      }>;

      let activeId = "";
      let lastPassedId = "";

      for (const item of headingElements) {
        const rect = item.element.getBoundingClientRect();
        const elementTop = rect.top;

        if (elementTop <= threshold) {
          lastPassedId = item.id;
        }

        if (elementTop > 0 && elementTop <= threshold) {
          activeId = item.id;
          break;
        }
      }

      setActiveId(activeId || lastPassedId);
    };

    getActiveHeading();

    window.addEventListener("scroll", getActiveHeading, { passive: true });

    return () => {
      window.removeEventListener("scroll", getActiveHeading);
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="on-this-page">
      <h3>On this page</h3>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={activeId === heading.id ? "active" : ""}
            >
              <span>{heading.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
