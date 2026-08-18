import { redis } from "@/lib/redis";

const parseTotalViews = (rawValue: string): number => {
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

export const getViews = async (repository: string): Promise<number> => {
  const storedValue = await redis.hget("views", repository);

  return Number.parseInt(storedValue || "0", 10);
};

export const getAllViews = async (): Promise<Record<string, number>> => {
  const storedValue = await redis.hgetall("views");
  const viewsByRepository: Record<string, number> = {};

  for (const [repository, rawViews] of Object.entries(storedValue)) {
    viewsByRepository[repository] = Number.parseInt(rawViews || "0", 10);
  }

  return viewsByRepository;
};

export const getTotalViews = async (): Promise<number> => {
  const storedValue = await redis.get("total-views");

  if (!storedValue) {
    return 0;
  }

  return parseTotalViews(storedValue);
};
