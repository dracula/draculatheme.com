"use client";

import { motion } from "framer-motion";

export const LightSquircle: React.FC = () => {
  return (
    <motion.div
      className="light-squircle"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      aria-hidden="true"
    >
      <div className="glow" />
    </motion.div>
  );
};
