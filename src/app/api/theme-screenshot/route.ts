import { type NextRequest, NextResponse } from "next/server";

import { redis } from "@/lib/redis";

const createImageResponse = async (
  url: URL,
  contentTypeFallback: string,
  cacheControl: string
) => {
  const response = await fetch(url);

  return new NextResponse(response.body, {
    status: 200,
    headers: {
      "Content-Type":
        response.headers.get("content-type") ?? contentTypeFallback,
      "Cache-Control": cacheControl
    }
  });
};

export const GET = async (request: NextRequest) => {
  const repository =
    request.nextUrl.searchParams.get("repository") ??
    request.nextUrl.searchParams.get("id");
  const branchName = request.nextUrl.searchParams.get("branch") ?? "main";

  const fallbackUrl = new URL("/images/dracula.webp", request.url);
  const cacheControl = "public, max-age=86400";

  if (!repository) {
    return createImageResponse(fallbackUrl, "image/webp", cacheControl);
  }

  try {
    const value = await redis.hget("screenshots", repository);
    const exists = value === "true";

    if (!exists) {
      return createImageResponse(fallbackUrl, "image/webp", cacheControl);
    }

    const rawUrl = `https://raw.githubusercontent.com/dracula/${repository}/${branchName}/screenshot.png`;
    const upstreamResponse = await fetch(rawUrl, { redirect: "follow" });

    if (!upstreamResponse.ok) {
      return createImageResponse(fallbackUrl, "image/webp", cacheControl);
    }

    return new NextResponse(upstreamResponse.body, {
      status: 200,
      headers: {
        "Content-Type":
          upstreamResponse.headers.get("content-type") ?? "image/png",
        "Cache-Control": cacheControl
      }
    });
  } catch {
    return createImageResponse(fallbackUrl, "image/webp", cacheControl);
  }
};
