import "./index.scss";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const duration = 0.4;

const ColorCopyBtn = ({ children, textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  const boxVariants = {
    hover: (isCopied) => ({
      opacity: isCopied ? 0 : 1,
      scale: 1.05,
      stroke: "var(--neutral-03)",
    }),
    pressed: (isCopied) => ({
      opacity: isCopied ? 0 : 1,
      scale: 0.95,
      strokeWidth: 1,
    }),
    copied: { opacity: 0 },
    notCopied: { stroke: "var(--neutral-04)", strokeWidth: 2, opacity: 1 },
  };

  const tickVariants = {
    pressed: (isCopied) => ({ pathLength: isCopied ? 0.85 : 0.05 }),
    copied: { pathLength: 1 },
    notCopied: { pathLength: 0 },
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 3000);
    }
  }, [isCopied]);

  const handleClick = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  };

  return (
    <button
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
      disabled={isCopied}
      onClick={handleClick}
      className="color-copy-btn"
    >
      <motion.svg
        initial={false}
        animate={isCopied ? "copied" : "notCopied"}
        whileHover="hover"
        whileTap="pressed"
        transition={{ duration }}
        width="18"
        height="18"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M20.8511 9.46338H11.8511C10.7465 9.46338 9.85107 10.3588 9.85107 11.4634V20.4634C9.85107 21.5679 10.7465 22.4634 11.8511 22.4634H20.8511C21.9556 22.4634 22.8511 21.5679 22.8511 20.4634V11.4634C22.8511 10.3588 21.9556 9.46338 20.8511 9.46338Z"
          stroke="var(--neutral-04)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={boxVariants}
          custom={isCopied}
          transition={{ duration }}
        />
        <motion.path
          d="M5.85107 15.4634H4.85107C4.32064 15.4634 3.81193 15.2527 3.43686 14.8776C3.06179 14.5025 2.85107 13.9938 2.85107 13.4634V4.46338C2.85107 3.93295 3.06179 3.42424 3.43686 3.04917C3.81193 2.67409 4.32064 2.46338 4.85107 2.46338H13.8511C14.3815 2.46338 14.8902 2.67409 15.2653 3.04917C15.6404 3.42424 15.8511 3.93295 15.8511 4.46338V5.46338"
          stroke="var(--neutral-04)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={boxVariants}
          custom={isCopied}
          transition={{ duration }}
        />
        <motion.path
          d="M20 6L9 17L4 12"
          stroke="var(--color)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={tickVariants}
          style={{ pathLength, opacity }}
          custom={isCopied}
          transition={{ duration }}
        />
      </motion.svg>
      {children}
    </button>
  );
};

export default ColorCopyBtn;
