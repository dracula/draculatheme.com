import { NextResponse } from "next/server";
import pLimit from "p-limit";

import { paths } from "@/lib/paths";
import { getData } from "@/lib/plausible";
import { redis } from "@/lib/redis";

const limit = pLimit(8);

const fetchAndOrganize = async (
  views: Record<string, number>,
  item: { repo: string; legacyViews?: number }
) => {
  const key = item.repo;
  const value = await getData(key);

  const legacyViews = item.legacyViews ? item.legacyViews : 0;

  views[key] = value.results.pageviews.value + legacyViews;
  return views[key];
};

export const GET = async () => {
  try {
    const views = {};

    await Promise.all(
      paths.map((item) => limit(() => fetchAndOrganize(views, item)))
    );

    await redis.hmset("views", views);

    return NextResponse.json({ views }, { status: 200 });
  } catch (error: unknown) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : String(error)
    };
  }
};
