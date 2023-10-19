"use client";

import { LayoutGroup, motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import AvailableEverywhere from "./availableEverywhere";
import BecomeAVampire from "./becomeAVampire";
import Description from "./description";
import Features from "./features";
import FixedTestimonial from "./fixedTestimonial";
import LogoWall from "./logoWall";
import MoreThanATheme from "./moreThanATheme";
import Rating from "./rating";
import Testimonials from "./testimonials";
import WhyPro from "./whyPro";
import { appFadeInUp } from "src/lib/framerMotion";
import fetchData from "src/lib/fetchData";
import { useQuery } from "react-query";

const Wrapper = ({ content }) => {
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
    <motion.div
      ref={ref}
      variants={appFadeInUp}
      initial="hidden"
      animate={control}
      exit="exit"
      className="article-wrapper"
    >
      {content}
    </motion.div>
  );
};

const ContentWrapper = ({ sales, reviews }) => {
  const { data } = useQuery("ppp", () =>
    fetchData("https://ppp.dracula.workers.dev"),
  );

  const contentList = [
    <Description />,
    <LogoWall />,
    <AvailableEverywhere />,
    <WhyPro />,
    <Features />,
    <MoreThanATheme />,
    <FixedTestimonial />,
    <BecomeAVampire ppp={data} sales={sales} />,
    <Rating />,
    <Testimonials reviews={reviews} />,
  ];

  return (
    <LayoutGroup>
      {contentList.map((content, index) => (
        <Wrapper key={index} content={content} />
      ))}
    </LayoutGroup>
  );
};

export default ContentWrapper;
