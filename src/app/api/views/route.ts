import { NextRequest, NextResponse } from "next/server";
import { endOfDay, format } from "date-fns";

import redis from "../../../lib/redis";

const API_BASE_URL = "https://plausible.io/api/v1/stats/aggregate";
const API_KEY = process.env.PLAUSIBLE_API_KEY;

class APIError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}

const buildURL = () => {
  const today = format(endOfDay(new Date()), "yyyy-MM-dd");
  return `${API_BASE_URL}?site_id=draculatheme.com&period=custom&date=2023-10-19,${today}&metrics=pageviews`;
};

const getTotal = async () => {
  if (!API_KEY) {
    throw new Error("API key is missing");
  }

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    redirect: "follow",
  };

  const response = await fetch(buildURL(), requestOptions);
  if (!response.ok) {
    throw new APIError(
      `Error fetching data: ${response.statusText}`,
      response.status,
    );
  }

  const data = await response.json();
  return { total: data.results.pageviews.value };
};

const getRedisData = async (id) => {
  const value = await redis.hget("views", id);
  const views = parseInt(value, 10) || 0;
  return { views };
};

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    if (id) {
      const { views } = await getRedisData(id);
      return NextResponse.json({ type: "redis-cache", views }, { status: 200 });
    } else {
      const total = await getTotal();
      return NextResponse.json({ type: "total", ...total }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { type: "error", message: error.message, data: 0 },
      { status: 400 },
    );
  }
}
