import { type NextRequest, NextResponse } from "next/server";

import { redis } from "@/lib/redis";

export const GET = async (request: NextRequest) => {
  const repository =
    request.nextUrl.searchParams.get("repository") ??
    request.nextUrl.searchParams.get("id");

  if (!repository) {
    return NextResponse.json({ exists: false }, { status: 400 });
  }

  try {
    const value = await redis.hget("screenshots", repository);
    const exists = value === "true";

    return NextResponse.json({ exists }, { status: 200 });
  } catch {
    return NextResponse.json({ exists: false }, { status: 500 });
  }
};
