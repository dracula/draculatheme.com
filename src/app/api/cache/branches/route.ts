import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

import { paths } from "@/lib/paths";
import { redis } from "@/lib/redis";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

const fetchAndOrganize = async (
  branches: Record<string, string>,
  item: { repo: string }
) => {
  const key = item.repo;

  const response = await octokit.rest.repos.get({
    owner: "dracula",
    repo: key
  });

  branches[key] = response.data.default_branch;
  return branches[key];
};

export const GET = async () => {
  try {
    const branches = {};

    await Promise.all(paths.map((item) => fetchAndOrganize(branches, item)));

    await redis.hmset("branches", branches);

    return NextResponse.json({ branches }, { status: 200 });
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
