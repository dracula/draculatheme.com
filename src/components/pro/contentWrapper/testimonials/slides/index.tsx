"use client";

import { wrap } from "@popmotion/popcorn";
import * as Avatar from "@radix-ui/react-avatar";
import { formatDistanceToNow } from "date-fns";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useRef } from "react";

type Review = {
  id: string;
  github: string;
  name: string;
  country: string;
  date: Date | string;
  body: string;
};

const xOffset = 100;
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? xOffset : -xOffset,
    opacity: 0
  }),
  active: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.2 }
  },
  exit: (direction) => ({
    x: direction > 0 ? -xOffset : xOffset,
    opacity: 0
  })
};

const renderDate = (date) => {
  const dateObject = new Date(date);

  return isNaN(dateObject.getTime()) ? null : (
    <time className="date">
      {formatDistanceToNow(dateObject, { addSuffix: true })}
    </time>
  );
};

const renderReview = (review: Review, index: number) => {
  const { id, github, name, country, date, body } = review;
  const isValidReview = id && github && name && country && date && body;

  if (!isValidReview) return null;

  return (
    <div key={index} id={`review-${review.github}`} className="review">
      <div className="text">
        <div dangerouslySetInnerHTML={{ __html: review.body }} />
      </div>
      <Link href={`#review-${review.github}`} target="_blank" className="info">
        <Avatar.Root className="avatar">
          <Avatar.Image
            src={`https://github.com/${review.github}.png?size=140`}
            alt={review.name}
          />
          <Avatar.Fallback delayMs={600}>
            <User2Icon />
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="col wrapper">
          <p className="name">{review.name}</p>
          <div className="country">
            <Image
              src={`/images/flags/${review.country}.svg`}
              width={50}
              height={50}
              alt={review.country}
            />
          </div>
        </div>
      </Link>
      {renderDate(review.date)}
    </div>
  );
};

const Slides = ({ reviews, pages, currentPage, setPage, direction }) => {
  const hasPaginated = useRef(false);
  const currentReviews = reviews.slice(currentPage * 2, (currentPage + 1) * 2);

  const detectPaginationGesture = useCallback(
    (e, { offset }) => {
      if (hasPaginated.current) return;

      const threshold = xOffset / 2;
      const newPageOffset = offset.x < -threshold ? 1 : -1;
      const newPage = wrap(0, pages.length, currentPage + newPageOffset);

      if (newPage !== currentPage) {
        hasPaginated.current = true;
        setPage(newPage, newPageOffset);
      }
    },
    [currentPage, pages]
  );

  return (
    <AnimatePresence initial={false} custom={direction}>
      <LayoutGroup id="slider-layout-group">
        <div className="slider-container">
          <motion.div
            key={currentPage}
            className="slide"
            data-page={currentPage}
            variants={variants}
            initial="enter"
            animate="active"
            exit="exit"
            drag="x"
            onDrag={detectPaginationGesture}
            onDragStart={() => (hasPaginated.current = false)}
            onDragEnd={() => (hasPaginated.current = true)}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            custom={direction}
          >
            {currentReviews.map((review, index) => renderReview(review, index))}
          </motion.div>
        </div>
      </LayoutGroup>
    </AnimatePresence>
  );
};

export default memo(Slides);
