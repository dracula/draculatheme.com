"use client";

import "./index.css";

import { motion, useAnimation, useInView, type Variants } from "motion/react";
import { useEffect, useRef } from "react";

interface TextRevealAnimationProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

const textStaggerVariants: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
  },
  visible: {
    opacity: 1,
    clipPath: "polygon(0% 0%, 105% 0%, 105% 100%, 0% 100%)",
    transition: {
      duration: 1.6,
      ease: [0.33, 0.21, 0.26, 0.93]
    }
  },
  exit: {
    opacity: 0,
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
  }
};

export const TextRevealAnimation = ({
  children,
  className = "tip",
  duration = 1.6
}: TextRevealAnimationProps) => {
  const control = useAnimation();
  const tipRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(tipRef, { once: true });

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);

  return (
    <motion.span
      ref={tipRef}
      variants={textStaggerVariants}
      initial="hidden"
      animate={control}
      exit="exit"
      className={`text-reveal-animation${className ? ` ${className}` : ""}`}
      transition={{ duration }}
    >
      {children}
    </motion.span>
  );
};
