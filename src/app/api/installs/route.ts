import { NextRequest, NextResponse } from "next/server";
import redis from "src/lib/redis";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (id) {
    try {
      const value = await redis.hget("installs", id);
      const install = value || "";

      return NextResponse.json({ install }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ install: "" }, { status: 400 });
    }
  }

  return NextResponse.json({ install: "" }, { status: 400 });
}
