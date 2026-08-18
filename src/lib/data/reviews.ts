import { redis } from "@/lib/redis";
import type { Review } from "@/lib/types";

const isReview = (value: unknown): value is Review => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const review = value as Record<string, unknown>;

  return (
    typeof review.id === "string" &&
    typeof review.name === "string" &&
    typeof review.body === "string" &&
    typeof review.country === "string" &&
    typeof review.github === "string" &&
    typeof review.date === "string"
  );
};

const parseReviews = (rawValue: string): Review[] => {
  try {
    const parsedValue: unknown = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isReview);
  } catch {
    return [];
  }
};

export const getReviews = async (): Promise<Review[]> => {
  const storedValue = await redis.get("reviews");

  if (!storedValue) {
    return [];
  }

  return parseReviews(storedValue);
};
