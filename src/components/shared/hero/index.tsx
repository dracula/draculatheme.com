"use client";

import "./index.css";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";

import { paths } from "@/lib/paths";

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
    title: "Dracula",
    subtitle: "One theme. All platforms.",
    color: "250"
  },
  "/about": {
    title: "The origin story",
    subtitle: "Because every story opens the door to a new one.",
    color: "180"
  },
  "/blog": {
    color: "10"
  },
  "/contribute": {
    icon: "/images/hero/contribute.svg",
    title: "Contribute to Dracula",
    subtitle: '"We learn big things from small experiences" - Bram Stoker',
    color: "35"
  },
  "/shop": {
    title: "Premium merch for modern vampires",
    subtitle:
      "A collection of exclusive apparel and limited-run accessories designed for our community.",
    cta: "Browse Products",
    anchor: "#products",
    color: "330"
  },
  "/pro": {
    title: "Dracula PRO 2.0",
    subtitle: "Be more productive.",
    cta: "Get it now",
    anchor: "#pricing",
    color: "180"
  },
  "/pro/changelog": {
    title: "Changelog",
    subtitle: "Discover the latest updates and improvements for Dracula Pro.",
    color: "115"
  },
  "/open": {
    title: "Open Dashboard",
    subtitle:
      "Dracula operates fully transparent and shares its metrics with the community."
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

const Hero = () => {
  const pathname = usePathname();
  const pathKey = pathname === "/" ? "" : pathname;

  const allPages: PageConfig = { ...staticPages, ...createDynamicPages() };
  const pageData: PageData = allPages[pathKey] || {};
  const { icon, title, subtitle, cta, anchor, type = "static" } = pageData;

  const setColor = useCallback(() => {
    const color = getPageColor(pageData);
    document.documentElement.style.setProperty("--main-hue", color);
  }, [pageData]);

  useEffect(() => {
    setColor();
  }, [setColor]);

  return (
    <section className="hero">
      <Particles className="starry-sky" />
      <div className="castle" />
      <div className="container">
        <div className={`icon ${type}`}>
          <Image
            src={icon || "/images/hero/default.svg"}
            width={192}
            height={192}
            alt="Dracula Icon"
            quality={100}
            priority
          />
        </div>
        <div className="header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {cta && anchor && (
          <a href={anchor} className="cta">
            {cta}
          </a>
        )}
      </div>
    </section>
  );
};

export default Hero;
