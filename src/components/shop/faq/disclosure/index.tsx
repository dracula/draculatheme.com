"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Less, More } from "./svgs";

const Disclosure = ({ title, body }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="disclosure" onClick={() => setIsOpen((prev) => !prev)}>
      <button
        aria-controls={title.replace(/\s+/g, "-").toLowerCase()}
        aria-expanded={isOpen}
      >
        <div className="title">{title}</div>
        <motion.div
          key={isOpen ? "minus" : "plus"}
          initial={{
            rotate: isOpen ? -90 : 90
          }}
          animate={{
            rotate: 0,
            transition: {
              type: "tween",
              duration: 0.15,
              ease: "circOut"
            }
          }}
          exit={{
            rotate: isOpen ? -90 : 90,
            transition: {
              type: "tween",
              duration: 0.15,
              ease: "circIn"
            }
          }}
        >
          <span className="icon">{isOpen ? <Less /> : <More />}</span>
        </motion.div>
      </button>
      <motion.div
        id={title.replace(/\s+/g, "-").toLowerCase()}
        initial={false}
        animate={
          isOpen
            ? {
                height: "auto",
                opacity: 1,
                display: "block",
                transition: {
                  height: {
                    duration: 0.4
                  },
                  opacity: {
                    duration: 0.25,
                    delay: 0.15
                  }
                }
              }
            : {
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    duration: 0.4
                  },
                  opacity: {
                    duration: 0.25
                  }
                },
                transitionEnd: {
                  display: "none"
                }
              }
        }
        className="body"
      >
        {body}
      </motion.div>
    </div>
  );
};

export default Disclosure;
