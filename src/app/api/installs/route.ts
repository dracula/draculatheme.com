import { type NextRequest, NextResponse } from "next/server";

import { redis } from "@/lib/redis";

export const GET = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");

  if (id) {
    try {
      const value = await redis.hget("installs", id);
      const install = value || "";

      return NextResponse.json({ install }, { status: 200 });
    } catch (_error) {
      return NextResponse.json({ install: "" }, { status: 400 });
    }
  }

  return NextResponse.json({ install: "" }, { status: 400 });
};
