"use client";

import "./index.css";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";

import { paths } from "@/lib/paths";

import { MatrixRain } from "./matrix-rain";
import { Particles } from "./particles";

interface PageData {
  icon?: string;
  title?: string;
  subtitle?: string;
  cta?: string;
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
    cta: "Browse Products",
    anchor: "#products",
    color: "330"
  },
  "/pro": {
    title: "Dracula Pro",
    subtitle: "Be more productive.",
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
  resolvedTheme: string | undefined,
  mounted: boolean
) => {
  if (icon) {
    return icon;
  }

  if (!mounted) {
    return "/images/hero/default.svg";
  }

  return resolvedTheme === "light"
    ? "/images/hero/default-light.svg"
    : "/images/hero/default.svg";
};

const getTitle = (
  title: string | undefined,
  resolvedTheme: string | undefined,
  mounted: boolean
) => {
  if (title) {
    return title;
  }

  if (!mounted) {
    return "Dracula";
  }

  return resolvedTheme === "light" ? "Alucard" : "Dracula";
};

const HeroPlaceholder = ({ type }: { type: string }) => (
  <>
    <div className={`icon ${type}`}>
      <div className="placeholder" />
    </div>
    <div className="header">
      <div className="placeholder title" />
      <div className="placeholder subtitle" />
    </div>
  </>
);

export const Hero = () => {
  const pathname = usePathname();
  const pathKey = pathname === "/" ? "" : pathname;

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pageData = useMemo(() => {
    const allPages: PageConfig = { ...staticPages, ...createDynamicPages() };
    return allPages[pathKey] || {};
  }, [pathKey]);

  const { icon, title, subtitle, cta, anchor, type = "static" } = pageData;

  const setColor = useCallback(() => {
    const color = getPageColor(pageData);
    document.documentElement.style.setProperty("--main-hue", color);
  }, [pageData]);

  useEffect(() => {
    setColor();
  }, [setColor]);

  if (!mounted) {
    return (
      <section className={`hero ${pathKey.slice(1)}`}>
        {pathKey === "/pro" ? <MatrixRain /> : <Particles />}
        <div className="castle" />
        <div className="container">
          {pathKey !== "/shop" && <HeroPlaceholder type={type} />}
        </div>
      </section>
    );
  }

  return (
    <section className={`hero ${pathKey.slice(1)}`}>
      {pathKey === "/pro" ? <MatrixRain /> : <Particles />}
      <div className="castle" />
      <div className="container">
        {pathKey !== "/shop" && (
          <div className={`icon ${type}`}>
            <Image
              src={getImageSrc(icon, resolvedTheme, mounted)}
              width={192}
              height={192}
              unoptimized={true}
              priority={true}
              alt="Dracula Icon"
            />
          </div>
        )}
        <div className="header">
          <h1>{getTitle(title, resolvedTheme, mounted)}</h1>
          <h2>{subtitle}</h2>
          {cta && anchor && (
            <a href={anchor} className="action primary cta">
              {cta}
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
                allowFullScreen={true}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
