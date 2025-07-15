import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

import { paths } from "@/lib/paths";
import { redis } from "@/lib/redis";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

export const GET = async () => {
  try {
    const contributors: { [key: string]: string } = {};

    await Promise.all(
      paths.map(async (item) => {
        const response = await octokit.rest.repos.listContributors({
          owner: "dracula",
          repo: item.repo
        });

        const filteredContributors = response.data
          .filter((contributor) => contributor.login !== "ImgBotApp")
          .map((contributor) => ({
            login: contributor.login,
            avatar_url: contributor.avatar_url
          }));

        contributors[item.repo] = JSON.stringify(filteredContributors);
      })
    );

    await redis.hmset("contributors", contributors);

    return NextResponse.json({ contributors }, { status: 200 });
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
