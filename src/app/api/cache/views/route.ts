import { NextResponse } from "next/server";
import { getData } from "src/lib/plausible";
import pLimit from "p-limit";
import paths from "src/lib/paths";
import redis from "src/lib/redis";

const limit = pLimit(8);

const fetchAndOrganize = async (views, path) => {
  const key = path.params.theme;
  const value = await getData(key);

  const legacyViews = path.params.legacyViews ? path.params.legacyViews : 0;

  return (views[key] = value.results.pageviews.value + legacyViews);
};

export async function GET() {
  try {
    let views = {};

    await Promise.all(
      paths.map((path) => limit(() => fetchAndOrganize(views, path))),
    );

    await redis.hmset("views", views);

    return NextResponse.json({ views }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
