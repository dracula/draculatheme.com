import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

import { paths } from "@/lib/paths";
import { redis } from "@/lib/redis";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

const fetchAndOrganize = async (
  installs: Record<string, string>,
  item: { repo: string }
) => {
  const key = item.repo;

  try {
    const response = await octokit.rest.repos.getContent({
      path: "INSTALL.md",
      owner: "dracula",
      repo: key
    });

    if (Array.isArray(response.data)) {
      throw new Error(
        `Expected file content but got directory listing for repo: ${key}`
      );
    }

    if (response.data.type !== "file") {
      throw new Error(
        `Expected file content but got ${response.data.type} for repo: ${key}`
      );
    }

    if (!response.data.content) {
      throw new Error(`Content not found for repo: ${key}`);
    }

    const value = response.data.content;
    installs[key] = value;

    return value;
  } catch (error: unknown) {
    console.error(
      `Failed to fetch content for repo ${key}:`,
      error instanceof Error ? error.message : String(error)
    );
    return null;
  }
};

export const GET = async () => {
  try {
    const installs = {};

    await Promise.all(paths.map((item) => fetchAndOrganize(installs, item)));

    await redis.hmset("installs", installs);

    return NextResponse.json({ installs }, { status: 200 });
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
