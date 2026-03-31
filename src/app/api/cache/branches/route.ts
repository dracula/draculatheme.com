import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

import { paths } from "@/lib/paths";
import { redis } from "@/lib/redis";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

const fetchDefaultBranchForRepository = async (repository: string) => {
  const response = await octokit.rest.repos.get({
    owner: "dracula",
    repo: repository
  });

  return response.data.default_branch;
};

export const GET = async () => {
  try {
    const branchesByRepositoryEntries = await Promise.all(
      paths.map(async (item) => {
        const defaultBranch = await fetchDefaultBranchForRepository(item.repo);
        return [item.repo, defaultBranch] as const;
      })
    );

    const branchesByRepository: Record<string, string> = Object.fromEntries(
      branchesByRepositoryEntries
    );

    await redis.hmset("branches", branchesByRepository);

    return NextResponse.json(
      { branches: branchesByRepository },
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
