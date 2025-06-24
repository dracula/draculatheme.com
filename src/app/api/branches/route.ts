import { type NextRequest, NextResponse } from "next/server";

import { redis } from "@/lib/redis";

export const GET = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");

  if (id) {
    try {
      const value = await redis.hget("branches", id);
      const branches = value || {};

      return NextResponse.json({ branches }, { status: 200 });
    } catch (_error) {
      return NextResponse.json({ branches: {} }, { status: 400 });
    }
  }

  return NextResponse.json({ branches: {} }, { status: 400 });
};
