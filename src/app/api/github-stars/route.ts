import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

export const GET = async () => {
  try {
    const githubRes = await octokit.repos.get({
      owner: "dracula",
      repo: "dracula-theme"
    });

    const total = new Intl.NumberFormat().format(
      githubRes.data.stargazers_count
    );

    return NextResponse.json({ total }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ total: 0, error }, { status: 400 });
  }
};
