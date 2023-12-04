import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import paths from "src/lib/paths";
import redis from "src/lib/redis";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

const fetchAndOrganize = async (branches, path) => {
  const key = path.params.repo;

  const response = await octokit.rest.repos.get({
    owner: "dracula",
    repo: key,
  });

  return (branches[key] = response.data.default_branch);
};

export async function GET() {
  try {
    let branches = {};

    await Promise.all(paths.map((path) => fetchAndOrganize(branches, path)));

    await redis.hmset("branches", branches);

    return NextResponse.json({ branches }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
