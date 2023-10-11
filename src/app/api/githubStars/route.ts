import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

export async function GET() {
  try {
    const githubRes = await octokit.repos.get({
      owner: "dracula",
      repo: "dracula-theme",
    });

    const total = new Intl.NumberFormat().format(
      githubRes.data.stargazers_count,
    );

    return NextResponse.json({ total }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ total: 0, error }, { status: 400 });
  }
}
