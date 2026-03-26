import type { Review } from "@/lib/types";

export const shuffleReviews = (reviews: Review[]): Review[] => {
  const shuffledReviews = [...reviews];

  for (let index = shuffledReviews.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentReview = shuffledReviews[index];

    shuffledReviews[index] = shuffledReviews[randomIndex];
    shuffledReviews[randomIndex] = currentReview;
  }

  return shuffledReviews;
};
