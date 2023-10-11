import { NextResponse } from "next/server";
import { getData } from "src/lib/ga";
import pLimit from "p-limit";
import paths from "src/lib/paths";
import redis from "src/lib/redis";

const limit = pLimit(8);

const fetchAndOrganize = async (views, path) => {
  const key = path.params.theme;
  const value = await getData(key);

  return (views[key] = value);
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
