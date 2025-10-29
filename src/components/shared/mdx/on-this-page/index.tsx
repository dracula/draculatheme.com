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
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-5rem 0px -80%",
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean);

    for (const element of headingElements) {
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      for (const element of headingElements) {
        if (element) {
          observer.unobserve(element);
        }
      }
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
