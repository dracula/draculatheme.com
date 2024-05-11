"use client";

import "./index.scss";
import { allLogs } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import { LayoutGroup, motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { getMDXComponent } from "next-contentlayer/hooks";
import { useEffect, useRef } from "react";
import { appFadeInUp } from "src/lib/framerMotion";

const colors = ["green", "cyan", "purple", "pink", "orange", "yellow"];

const Log = ({ index, log, color }) => {
  const control = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  const Content = getMDXComponent(log.body.code);

  const setColor = () => {
    const logElement = ref.current;

    if (logElement) {
      logElement.style.setProperty("--color", `var(--${color})`);
    }
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  useEffect(() => {
    setColor();
  }, []);

  return (
    <motion.li
      ref={ref}
      variants={appFadeInUp}
      initial="hidden"
      animate={control}
      exit="exit"
      id={index}
      className={color}
    >
      <article className="log">
        <div className="date">
          <span>
            <time dateTime={log.date.createdAt}>
              {format(parseISO(log.date.createdAt), "LLLL d, yyyy")}
            </time>
          </span>
        </div>
        <div className="content">
          <h1 className="title">{log.title}</h1>
          <div className="content-wrapper">
            <Content />
          </div>
          <div className="author">
            <div className="avatar">
              <Image
                src={log.author.avatar}
                width={100}
                height={100}
                alt={log.author.name}
              />
            </div>
            <span className="author-name">{log.author.name}</span>
          </div>
        </div>
      </article>
    </motion.li>
  );
};

const ChangelogList = () => {
  const logs = allLogs.sort((a, b) =>
    compareDesc(new Date(a.date.createdAt), new Date(b.date.createdAt))
  );

  return (
    <LayoutGroup>
      <motion.section className="changelog">
        <motion.div className="container">
          <motion.ul className="logs-list">
            {logs.map((log, index) => (
              <Log
                key={index}
                index={logs.length - index}
                log={log}
                color={colors[index % colors.length]}
              />
            ))}
          </motion.ul>
        </motion.div>
      </motion.section>
    </LayoutGroup>
  );
};

export default ChangelogList;
