import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";
import paths from "src/lib/paths";
import redis from "src/lib/redis";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

const fetchAndOrganize = async (contributors, path) => {
  const key = path.params.repo;

  const response = await octokit.rest.repos.listContributors({
    owner: "dracula",
    repo: key
  });

  const value = response.data
    .filter((contributor) => {
      if (contributor.login === "ImgBotApp") return;
      return contributor;
    })
    .map((contributor) => {
      return {
        login: contributor.login,
        avatar_url: contributor.avatar_url
      };
    });

  return (contributors[key] = JSON.stringify(value));
};

export async function GET() {
  try {
    let contributors = {};

    await Promise.all(
      paths.map((path) => fetchAndOrganize(contributors, path))
    );

    await redis.hmset("contributors", contributors);

    return NextResponse.json({ contributors }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
