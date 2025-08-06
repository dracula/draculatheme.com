import { endOfDay, format } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";

import { redis } from "@/lib/redis";

const apiBaseUrl = "https://plausible.io/api/v1/stats/aggregate";
const apiKey = process.env.PLAUSIBLE_API_KEY;

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const buildUrl = (): string => {
  const today = format(endOfDay(new Date()), "yyyy-MM-dd");
  return `${apiBaseUrl}?site_id=draculatheme.com&period=custom&date=2023-10-19,${today}&metrics=pageviews`;
};

const getTotal = async () => {
  if (!apiKey) {
    throw new Error("API key is missing");
  }

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    redirect: "follow"
  };

  const response = await fetch(buildUrl(), requestOptions);

  if (!response.ok) {
    throw new ApiError(
      `Error fetching data: ${response.statusText}`,
      response.status
    );
  }

  const data = await response.json();
  return { total: data.results.pageviews.value };
};

const getRedisData = async (id: string) => {
  const value = await redis.hget("views", id);
  const views = Number.parseInt(value || "0", 10);
  return { views };
};

export const GET = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");

  try {
    if (id) {
      const { views } = await getRedisData(id);
      return NextResponse.json({ type: "redis-cache", views }, { status: 200 });
    }

    const total = await getTotal();
    return NextResponse.json({ type: "total", ...total }, { status: 200 });
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { type: "error", message: errorMessage, data: 0 },
      { status: 400 }
    );
  }
};
