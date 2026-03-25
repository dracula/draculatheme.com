"use client";

import Image from "next/image";
import { type ReactNode, useMemo, useState } from "react";

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

const shuffleReviews = (reviews: Review[]): Review[] => {
  const shuffledReviews = [...reviews];

  for (let index = shuffledReviews.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentReview = shuffledReviews[index];

    shuffledReviews[index] = shuffledReviews[randomIndex];
    shuffledReviews[randomIndex] = currentReview;
  }

  return shuffledReviews;
};

const parseInlineEmphasis = (text: string): ReactNode => {
  const segments: ReactNode[] = [];
  const emphasisPattern = /<em>([\s\S]*?)<\/em>/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let emphasisIndex = 0;

  while ((match = emphasisPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push(text.slice(lastIndex, match.index));
    }

    segments.push(<em key={`emphasis-${emphasisIndex}`}>{match[1]}</em>);
    emphasisIndex += 1;
    lastIndex = emphasisPattern.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push(text.slice(lastIndex));
  }

  if (segments.length === 0) {
    return text;
  }

  return segments;
};

const formatReviewContent = (body: string) => {
  const sentences = body.split(". ").filter((sentence) => sentence.trim());

  return sentences.map((sentence) => {
    const fullSentence =
      sentence === sentences[sentences.length - 1] ? sentence : `${sentence}.`;
    const sentenceKey = `${sentence.trim().toLowerCase().replaceAll(/\s+/g, "-")}-${sentence.length}`;

    return <p key={sentenceKey}>{parseInlineEmphasis(fullSentence)}</p>;
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

const TestimonialCard = ({ review }: { review: Review }) => {
  const trimmedName = review.name.trim();
  const trimmedCountry = review.country.trim();
  const hasIdentity = Boolean(trimmedName || trimmedCountry);

  return (
    <a
      key={review.id}
      href={`https://github.com/${review.github}`}
      target="_blank"
      rel="noopener noreferrer"
      className="testimonial"
    >
      <div className="content">{formatReviewContent(review.body)}</div>
      {hasIdentity ? (
        <div className="author">
          <div className="avatar">
            <Avatar
              github={review.github}
              name={trimmedName || review.github}
            />
          </div>
          <div className="info">
            {trimmedName ? <span className="name">{trimmedName}</span> : null}
            {trimmedCountry ? (
              <span className="meta">From {trimmedCountry}</span>
            ) : null}
          </div>
        </div>
      ) : null}
    </a>
  );
};

export const Testimonials = ({ reviews }: TestimonialsProps) => {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const normalizedReviews = useMemo(() => normalizeReviews(reviews), [reviews]);
  const randomizedReviews = useMemo(() => {
    const identifiedReviews = normalizedReviews.filter((review) => {
      return Boolean(review.name.trim() || review.country.trim());
    });

    return shuffleReviews(identifiedReviews);
  }, [normalizedReviews]);
  const hasMoreReviews = visibleCount < randomizedReviews.length;

  const handleReadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + loadMoreCount, randomizedReviews.length)
    );
  };

  return (
    <div className="testimonials">
      <div className="header">
        <h3>The reviews are in!</h3>
        <p>
          Dracula Pro has received many positive reviews from{" "}
          <em>creators who ship.</em>
        </p>
        <p>
          Trusted by <em>{randomizedReviews.length} verified customers</em>.
        </p>
      </div>
      <div className="grid">
        {randomizedReviews.slice(0, visibleCount).map((review) => (
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
