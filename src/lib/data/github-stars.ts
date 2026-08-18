import { redis } from "@/lib/redis";

const parseGithubStars = (rawValue: string): number => {
  try {
    const parsedValue: unknown = JSON.parse(rawValue);

    if (
      typeof parsedValue === "object" &&
      parsedValue !== null &&
      "total" in parsedValue &&
      typeof parsedValue.total === "number"
    ) {
      return parsedValue.total;
    }
  } catch {
    return 0;
  }

  return 0;
};

export const getGithubStars = async (): Promise<number> => {
  const storedValue = await redis.get("github-stars");

  if (!storedValue) {
    return 0;
  }

  return parseGithubStars(storedValue);
};
