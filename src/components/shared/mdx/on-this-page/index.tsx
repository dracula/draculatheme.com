"use client";

import "./index.css";

import { useEffect, useRef, useState } from "react";

import type { Heading } from "@/lib/types";

interface OnThisPageProps {
  headings: Heading[];
}

export const OnThisPage = ({ headings }: OnThisPageProps) => {
  const [activeId, setActiveId] = useState<string>(() => {
    if (typeof window === "undefined") {
      return headings.length > 0 ? headings[0].id : "";
    }

    const hashId = window.location.hash.slice(1);
    const matchingHeading = headings.find((heading) => heading.id === hashId);

    if (matchingHeading) {
      return matchingHeading.id;
    }

    return headings.length > 0 ? headings[0].id : "";
  });
  const isClickScrollRef = useRef(false);

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const markerOffset = 160;

    const resolveActiveId = () => {
      if (isClickScrollRef.current) {
        const targetElement = document.getElementById(activeId);

        if (targetElement) {
          const { top, bottom } = targetElement.getBoundingClientRect();

          if (top > markerOffset && bottom > markerOffset) {
            return;
          }
        }

        isClickScrollRef.current = false;
      }

      let nextId = headings.length > 0 ? headings[0].id : "";

      for (const heading of headings) {
        const element = document.getElementById(heading.id);

        if (!element) {
          continue;
        }

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;

        if (elementTop <= markerOffset && elementBottom > markerOffset) {
          nextId = heading.id;
          break;
        }

        if (elementTop <= markerOffset) {
          nextId = heading.id;
          continue;
        }

        break;
      }

      setActiveId((previousId) =>
        previousId === nextId ? previousId : nextId
      );
    };

    const handleHashChange = () => {
      const hashId = window.location.hash.slice(1);

      if (hashId.length === 0) {
        window.requestAnimationFrame(resolveActiveId);
        return;
      }

      const element = document.getElementById(hashId);

      if (element) {
        setActiveId(hashId);
        isClickScrollRef.current = true;
      }
    };

    const handleScroll = () => {
      window.requestAnimationFrame(resolveActiveId);
    };

    window.requestAnimationFrame(resolveActiveId);
    handleHashChange();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [headings, activeId]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="on-this-page" aria-label="On this page navigation">
      <h3>On this page</h3>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              data-state={activeId === heading.id ? "active" : "inactive"}
              aria-current={activeId === heading.id ? "location" : undefined}
            >
              <span>{heading.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
