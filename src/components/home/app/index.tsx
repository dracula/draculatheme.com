"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { appFadeInUp } from "src/lib/framerMotion";

const formatViews = (views) =>
  new Intl.NumberFormat().format(views || 0);

const App = ({ path }) => {
  const control = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.li
      ref={ref}
      variants={appFadeInUp}
      initial="hidden"
      animate={control}
      exit="exit"
    >
      <Link href={"/[theme]"} as={`/${path.params.theme}`} className="app">
        <div className="icon">
          <Image
            src={`/icons/${path.params.icon}`}
            width={200}
            height={200}
            alt={path.params.title}
          />
        </div>
        <div className="content">
          <span className="title">{path.params.title}</span>
          <span className="views">{formatViews(path.params.views)} views</span>
        </div>
      </Link>
    </motion.li>
  );
};

export default App;
