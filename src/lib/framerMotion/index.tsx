export const easing = [0.25, 0.46, 0.45, 0.94];
export const bounceEasing = [0.175, 0.885, 0.32, 1.275];
export const textEasing = [0.33, 0.21, 0.26, 0.93];

export const textStagger = {
  hidden: { opacity: 0, clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
  visible: {
    opacity: 1,
    clipPath: "polygon(0% 0%, 105% 0%, 105% 100%, 0% 100%)",
    transition: {
      duration: 1.6,
      ease: textEasing,
    },
  },
  exit: { opacity: 0, clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: easing,
    },
  },
  exit: { opacity: 0 },
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: easing,
    },
  },
  exit: { opacity: 0, y: 20 },
};

export const appFadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: easing,
    },
  },
  exit: { opacity: 0, y: 20 },
};
