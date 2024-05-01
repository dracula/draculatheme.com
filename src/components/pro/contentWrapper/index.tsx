"use client";

import { LayoutGroup, motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import fetchData from "src/lib/fetchData";
import { appFadeInUp } from "src/lib/framerMotion";
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

const Wrapper = ({ content, index }) => {
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
      key={index}
    >
      {content}
    </motion.div>
  );
};

const ContentWrapper = ({ sales, reviews }) => {
  const { data } = useQuery("ppp", () =>
    fetchData("https://ppp.dracula.workers.dev")
  );

  const contentList = [
    <Description key="description" />,
    <LogoWall key="logoWall" />,
    <AvailableEverywhere key="availableEverywhere" />,
    <WhyPro key="whyPro" />,
    <Features key="features" />,
    <MoreThanATheme key="moreThanATheme" />,
    <FixedTestimonial key="fixedTestimonial" />,
    <BecomeAVampire key="becomeAVampire" ppp={data} sales={sales} />,
    <Rating key="rating" />,
    <Testimonials key="testimonials" reviews={reviews} />
  ];

  return (
    <LayoutGroup>
      {contentList.map((content, index) => (
        <Wrapper key={index} content={content} index={index} />
      ))}
    </LayoutGroup>
  );
};

export default ContentWrapper;
