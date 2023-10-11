"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect } from "react";

import { fadeInUp } from "src/lib/framerMotion";
import { usePathname } from "next/navigation";

const colors = ["180", "115", "35", "330", "250", "10", "60"];
const pathToColor = {
  "/pro/changelog": "115",
  "/pro": "115",
  "/contribute": "35",
  "/shop": "330",
  "/": "250",
  "/blog": "10",
  "/about": "180",
};

const PageTransition = ({ children }) => {
  const pathname = usePathname();

  const setColor = useCallback(() => {
    let color =
      pathToColor[pathname] ||
      colors[Math.floor(Math.random() * colors.length)];
    document.documentElement.style.setProperty("--main-hue", `${color}`);
  }, [pathname]);

  useEffect(() => {
    setColor();
  }, [setColor]);

  return (
    <AnimatePresence>
      <motion.main
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

export default PageTransition;
