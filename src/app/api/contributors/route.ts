import { type NextRequest, NextResponse } from "next/server";

import { redis } from "@/lib/redis";

export const GET = async (request: NextRequest) => {
  const repository =
    request.nextUrl.searchParams.get("repository") ??
    request.nextUrl.searchParams.get("id");

  if (!repository) {
    return NextResponse.json({ contributors: [] }, { status: 400 });
  }

  try {
    const storedValue = await redis.hget("contributors", repository);

    if (!storedValue) {
      return NextResponse.json({ contributors: [] }, { status: 200 });
    }

    const parsedValue: unknown = JSON.parse(storedValue);
    const contributors = Array.isArray(parsedValue) ? parsedValue : [];

    return NextResponse.json({ contributors }, { status: 200 });
  } catch {
    return NextResponse.json({ contributors: [] }, { status: 500 });
  }
};
