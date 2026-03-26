"use client";

import "./index.css";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useTheme } from "@/components/shared/theme-provider";
import { paths } from "@/lib/paths";

import { MatrixRain } from "./matrix-rain";
import { Particles } from "./particles";

interface PageData {
  icon?: string;
  title?: string;
  subtitle?: string;
  callToAction?: string;
  anchor?: string;
  color?: string;
  type?: "static" | "dynamic";
}

interface PageConfig {
  [key: string]: PageData;
}

const colors = ["180", "115", "35", "330", "250", "10", "60"];

const staticPages: PageConfig = {
  "": {
    subtitle: "One theme. All platforms.",
    color: "250"
  },
  "/about": {
    title: "The origin story",
    subtitle: "Because every story opens the door to a new one.",
    color: "180"
  },
  "/blog": {
    title: "Blog",
    subtitle:
      "“Truly there is no such thing as finality.” - Bram Stoker, Dracula",
    color: "10"
  },
  "/contribute": {
    title: "Contribute",
    subtitle:
      "“We learn big things from small experiences” - Bram Stoker, Dracula",
    color: "35"
  },
  "/shop": {
    title: "Premium merch for modern vampires",
    subtitle:
      "Commit to comfort. Crafted for those who value the elegance of text-based creativity.",
    callToAction: "Browse Products",
    anchor: "#products",
    color: "330"
  },
  "/pro": {
    title: "Dracula Pro",
    subtitle:
      "Refined colors, crafted for focus. Everything you need in one complete package.",
    color: "115"
  },
  "/pro/changelog": {
    title: "Changelog",
    subtitle: "Discover the latest updates and improvements for Dracula Pro."
  },
  "/open": {
    title: "Open Dashboard",
    subtitle:
      "Dracula operates fully transparent and shares its metrics with the community.",
    color: "115"
  }
};

const createDynamicPages = (): PageConfig => {
  return Object.fromEntries(
    paths.map((item) => [
      `/${item.repo}`,
      {
        icon: `/icons/${item.icon}`,
        title: item.title,
        subtitle: `Dracula Theme for ${item.title}`,
        type: "dynamic"
      }
    ])
  );
};

const getPageColor = (pageData: PageData): string => {
  return pageData?.color || colors[Math.floor(Math.random() * colors.length)];
};

const getImageSrc = (
  icon: string | undefined,
  resolvedTheme: string | undefined
) => {
  if (icon) {
    return icon;
  }

  return resolvedTheme === "light"
    ? "/images/hero/default-light.svg"
    : "/images/hero/default.svg";
};

const getTitle = (
  title: string | undefined,
  resolvedTheme: string | undefined
) => {
  if (title) {
    return title;
  }

  return resolvedTheme === "light" ? "Alucard" : "Dracula";
};

export const Hero = () => {
  const pathname = usePathname();
  const pathKey = pathname === "/" ? "" : pathname;

  const { theme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const pageData = useMemo(() => {
    const allPages: PageConfig = { ...staticPages, ...createDynamicPages() };
    return allPages[pathKey] || {};
  }, [pathKey]);

  const {
    icon,
    title,
    subtitle,
    callToAction,
    anchor,
    type = "static"
  } = pageData;

  const heroColor = useMemo(() => getPageColor(pageData), [pageData]);

  const activeTheme =
    resolvedTheme ||
    (theme === "dark" || theme === "light" ? theme : undefined);
  const showDefaultPlaceholder = !isMounted && !icon;

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.style.setProperty("--main-hue", heroColor);
  }, [heroColor]);

  return (
    <section className={`hero ${pathKey.slice(1)}`}>
      {pathKey === "/pro" ? <MatrixRain /> : <Particles />}
      <div className="castle" />
      <div className="container">
        {pathKey !== "/shop" && (
          <div className={`icon ${type}`}>
            {showDefaultPlaceholder ? (
              <div className="placeholder" />
            ) : (
              <Image
                src={getImageSrc(icon, activeTheme)}
                width={192}
                height={192}
                unoptimized
                priority
                alt="Dracula Icon"
                suppressHydrationWarning
              />
            )}
          </div>
        )}
        <div className="header">
          {showDefaultPlaceholder && !title ? (
            <div className="placeholder title" />
          ) : (
            <h1 suppressHydrationWarning>{getTitle(title, activeTheme)}</h1>
          )}
          <h2>{subtitle}</h2>
          {callToAction && anchor && (
            <a href={anchor} className="action primary call-to-action">
              {callToAction}
            </a>
          )}
        </div>
        {pathKey === "/shop" && (
          <div className="video">
            <div>
              <iframe
                src="https://www.youtube-nocookie.com/embed/RiuWwkwmmfI"
                title="Video showing the manufacture of products from the Dracula collection"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
