"use client";

import "./index.scss";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

const CardSpotlight = ({ className = "", children }) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div
      className={className ? `card-spotlight ${className}` : `card-spotlight`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="highlight"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              hsla(var(--spotlight-hue, var(--main-hue)), 12%, 24%, .24),
              transparent 80%
            )
          `
        }}
      />
      <div className="content">{children}</div>
    </div>
  );
};

export default CardSpotlight;
