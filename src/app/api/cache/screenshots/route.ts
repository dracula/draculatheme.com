import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

import { paths } from "@/lib/paths";
import { redis } from "@/lib/redis";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

const hasScreenshot = async (repo: string) => {
  try {
    const response = await octokit.rest.repos.getContent({
      owner: "dracula",
      repo,
      path: "screenshot.png"
    });

    return response.status === 200;
  } catch {
    return false;
  }
};

export const GET = async () => {
  try {
    const screenshotsByRepository: Record<string, string> = {};

    await Promise.all(
      paths.map(async (item) => {
        const exists = await hasScreenshot(item.repo);
        screenshotsByRepository[item.repo] = exists ? "true" : "false";
      })
    );

    await redis.hmset("screenshots", screenshotsByRepository);

    return NextResponse.json(
      { screenshots: screenshotsByRepository },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
};
