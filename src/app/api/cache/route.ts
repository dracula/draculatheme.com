import { NextResponse } from "next/server";

import { getBasePath } from "@/utils/environment";

const callCacheRoute = async (cacheRouteName: string) => {
  try {
    const baseUrl = getBasePath();
    const url = `${baseUrl}/api/cache/${cacheRouteName}`;
    const response = await fetch(url, {
      cache: "no-store"
    });

    const data = await response.json();

    return {
      path: cacheRouteName,
      status: response.status,
      success: response.ok,
      data
    };
  } catch (error: unknown) {
    return {
      path: cacheRouteName,
      status: 500,
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export const GET = async () => {
  const routes = [
    "branches",
    "contributors",
    "installs",
    "screenshots",
    "views"
  ];

  const results = await Promise.all(
    routes.map((route) => callCacheRoute(route))
  );

  const allSuccessful = results.every((result) => result.success);
  const hasErrors = results.some((result) => !result.success);

  return NextResponse.json(
    {
      status: allSuccessful ? "success" : "partial",
      results,
      summary: {
        total: results.length,
        successful: results.filter((r) => r.success).length,
        failed: results.filter((r) => !r.success).length
      }
    },
    {
      status: hasErrors && !allSuccessful ? 207 : 200
    }
  );
};
