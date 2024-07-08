"use client";

import "./index.scss";
import { motion } from "framer-motion";
import { RssIcon, TagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";
import fetchData from "src/lib/fetchData";
import { fadeIn } from "src/lib/framerMotion";
import paths from "src/lib/paths";
import MatrixRain from "../pro/codeRain";
import Particles from "./particles";
import PPP from "./ppp";

const Hero = () => {
  const { data } = useQuery("ppp", () =>
    fetchData("https://ppp.dracula.workers.dev")
  );

  const pathname = usePathname();
  const pathClass = pathname.substring(1) || "";

  const themes = paths.reduce((acc, path) => {
    acc[`/${path.params.theme}`] = {
      icon: `/icons/${path.params.icon}`,
      title: path.params.title,
      subtitle: `Dracula Theme for ${path.params.title}`,
      cta: "",
      anchor: ""
    };

    return acc;
  }, {});

  const titleMapping = {
    "/": {
      icon: "/images/hero/dracula-icon.svg",
      title: "Dracula",
      subtitle: "One theme. All platforms.",
      cta: "",
      anchor: ""
    },
    "/about": {
      icon: "/images/hero/dracula-icon.svg",
      title: "The origin story",
      subtitle: "Because every story opens the door to a new one.",
      cta: "",
      anchor: ""
    },
    "/contribute": {
      icon: "/images/hero/moon-icon.svg",
      title: "Contribute to Dracula",
      subtitle: '"We learn big things from small experiences" - Bram Stoker',
      cta: "",
      anchor: ""
    },
    "/shop": {
      icon: "",
      title: "Premium merch for modern vampires",
      subtitle:
        "A collection of exclusive apparel and limited-run accessories designed for our community.",
      cta: "Browse Products",
      anchor: "#products"
    },
    "/pro": {
      // icon: "/images/hero/pro-icon.svg",
      icon: "/images/hero/alucard-special.svg",
      title: "Dracula PRO",
      subtitle: "Be more productive.",
      cta: "Get it now",
      anchor: "#pricing"
    },
    "/pro/changelog": {
      icon: "",
      title: "Changelog",
      subtitle: "Discover the latest updates and improvements for Dracula Pro.",
      cta: "",
      anchor: ""
    },
    "/open": {
      icon: "/images/hero/dracula-icon.svg",
      title: "Open Dashboard",
      subtitle:
        "Dracula operates fully transparent and shares its metrics with the community.",
      cta: "",
      anchor: ""
    },
    ...themes
  };

  const { icon, title, subtitle, cta, anchor } = titleMapping[pathname] || {};

  const isThemePath = themes.hasOwnProperty(pathname);

  return (
    <section className={`hero ${pathClass}`}>
      {pathClass === "pro" && (
        <>
          <PPP ppp={data} />
          <MatrixRain />
          <Link href="/pro/changelog" className="tag-link">
            <span className="icon">
              <TagIcon />
            </span>
            <span>Changelog</span>
          </Link>
        </>
      )}
      {pathClass === "pro/changelog" && (
        <Link href="/changelog-rss.xml" target="_blank" className="tag-link">
          <span className="icon">
            <RssIcon />
          </span>
          <span>RSS</span>
        </Link>
      )}
      <Particles className="particles" />
      <div className="container">
        <div className="content">
          {icon && (
            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`dracula-icon${isThemePath ? " theme" : ""}`}
            >
              <Image
                src={icon}
                width={192}
                height={192}
                alt="Dracula Icon"
                quality={100}
                unoptimized={true}
                priority
              />
            </motion.div>
          )}
          {title && subtitle && (
            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="title-wrapper"
            >
              <h1 className="title p">{title}</h1>
              <span className="title t">{subtitle}</span>
            </motion.div>
          )}
          {cta && anchor && (
            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="cta-wrapper"
            >
              <Link href={anchor} className="primary">
                <span>{cta}</span>
              </Link>
            </motion.div>
          )}
        </div>
        {pathClass === "shop" && (
          <div className="video-container">
            <div className="video">
              <iframe
                src="https://www.youtube-nocookie.com/embed/RiuWwkwmmfI"
                title="Video showing the manufacture of products from the Dracula collection"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
      <div className="castle"></div>
    </section>
  );
};

export default Hero;
