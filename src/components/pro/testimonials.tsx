"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useState } from "react";

import type { Review } from "@/lib/types";

interface TestimonialsProps {
  reviews: Review[] | Record<string, Review>;
}

const initialVisibleCount = 3;
const loadMoreCount = 3;

const getAvatarUrl = (github: string) =>
  `https://github.com/${github.replace("@", "")}.png?size=140`;

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const normalizeReviews = (
  reviews: Review[] | Record<string, Review>
): Review[] => (Array.isArray(reviews) ? reviews : Object.values(reviews));

const sortReviewsByDate = (reviews: Review[]): Review[] =>
  reviews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

const formatDate = (date: string) => {
  const dateObject = new Date(date);
  if (Number.isNaN(dateObject.getTime())) return null;

  return (
    <time className="date">
      {formatDistanceToNow(dateObject, { addSuffix: true })}
    </time>
  );
};

const formatReviewContent = (body: string) => {
  const sentences = body.split(". ").filter((sentence) => sentence.trim());

  return sentences.map((sentence, index) => {
    const fullSentence =
      index < sentences.length - 1 ? `${sentence}.` : sentence;

    return (
      <p
        key={`sentence-${sentence.substring(0, 10)}-${index}`}
        dangerouslySetInnerHTML={{ __html: fullSentence }}
      />
    );
  });
};

const Avatar = ({ github, name }: { github: string; name: string }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <span className="avatar-initials">{getInitials(name)}</span>;
  }

  return (
    <Image
      src={getAvatarUrl(github)}
      width={140}
      height={140}
      alt={name}
      onError={() => setHasError(true)}
    />
  );
};

const TestimonialCard = ({ review }: { review: Review }) => (
  <a
    key={review.id}
    href={`https://github.com/${review.github}`}
    target="_blank"
    rel="noopener noreferrer"
    className="testimonial"
  >
    <div className="content">{formatReviewContent(review.body)}</div>
    <div className="author">
      <div className="avatar">
        <Avatar github={review.github} name={review.name} />
      </div>
      <div className="info">
        <span className="name">{review.name}</span>
        <span className="meta">
          From {review.country}, {formatDate(review.date)}.
        </span>
      </div>
    </div>
  </a>
);

export const Testimonials = ({ reviews }: TestimonialsProps) => {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const normalizedReviews = normalizeReviews(reviews);
  const sortedReviews = sortReviewsByDate(normalizedReviews);
  const hasMoreReviews = visibleCount < sortedReviews.length;

  const handleReadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + loadMoreCount, sortedReviews.length)
    );
  };

  return (
    <div className="testimonials">
      <div className="header">
        <h3>The reviews are in!</h3>
        <p>
          Dracula Pro has received tons of positive reviews from{" "}
          <em>developers who ship.</em>
        </p>
      </div>
      <div className="grid">
        {sortedReviews.slice(0, visibleCount).map((review) => (
          <TestimonialCard key={review.id} review={review} />
        ))}
      </div>
      {hasMoreReviews && (
        <button
          type="button"
          className="action primary read-more"
          onClick={handleReadMore}
        >
          Read more testimonials <small>↓</small>
        </button>
      )}
    </div>
  );
};
