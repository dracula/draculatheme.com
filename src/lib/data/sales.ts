import { redis } from "@/lib/redis";
import type { Sales } from "@/lib/types";

const emptySales: Sales = {
  count: "0",
  total: "$0.00"
};

const parseSales = (rawValue: string): Sales => {
  try {
    const parsedValue: unknown = JSON.parse(rawValue);

    if (typeof parsedValue !== "object" || parsedValue === null) {
      return emptySales;
    }

    const sales = parsedValue as Record<string, unknown>;

    if (typeof sales.count !== "string" || typeof sales.total !== "string") {
      return emptySales;
    }

    return {
      count: sales.count,
      total: sales.total
    };
  } catch {
    return emptySales;
  }
};

export const getSales = async (): Promise<Sales> => {
  const storedValue = await redis.get("sales");

  if (!storedValue) {
    return emptySales;
  }

  return parseSales(storedValue);
};
