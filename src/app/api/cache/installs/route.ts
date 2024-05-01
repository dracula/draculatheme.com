import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";
import paths from "src/lib/paths";
import redis from "src/lib/redis";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

const fetchAndOrganize = async (installs, path) => {
  const key = path.params.repo;

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

  return (installs[key] = value);
};

export async function GET() {
  try {
    let installs = {};

    await Promise.all(paths.map((path) => fetchAndOrganize(installs, path)));

    await redis.hmset("installs", installs);

    return NextResponse.json({ installs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
