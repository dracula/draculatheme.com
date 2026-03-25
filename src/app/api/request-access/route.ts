import { Octokit } from "@octokit/rest";
import { type NextRequest, NextResponse } from "next/server";

interface GumroadSale {
  product_permalink: string;
  email: string;
  refunded: boolean;
  paid: boolean;
}

interface GumroadResponse {
  sales?: GumroadSale[];
}

interface GitHubUser {
  id: number;
  login: string;
}

interface GitHubSearchResponse {
  total_count: number;
  items: GitHubUser[];
}

const { GUMROAD_ACCESS_TOKEN, GITHUB_PERSONAL_ACCESS_TOKEN } = process.env;
const PRODUCT_ID = "tPfIDt";
const GITHUB_ORG = "dracula-pro";

if (!GUMROAD_ACCESS_TOKEN || !GITHUB_PERSONAL_ACCESS_TOKEN) {
  throw new Error("❌ Missing required environment variables.");
}

const octokit = new Octokit({ auth: GITHUB_PERSONAL_ACCESS_TOKEN });

const verifyGumroadPurchase = async (email: string): Promise<boolean> => {
  const response = await fetch(
    `https://api.gumroad.com/v2/sales?access_token=${GUMROAD_ACCESS_TOKEN}&email=${email}`
  );

  if (!response.ok) {
    throw new Error(`🚨 Gumroad API error: ${response.status}.`);
  }

  const data: GumroadResponse = await response.json();
  return (
    data.sales?.some(
      (sale: GumroadSale) =>
        sale.product_permalink === PRODUCT_ID &&
        sale.email?.toLowerCase() === email.toLowerCase() &&
        !sale.refunded &&
        sale.paid === true
    ) ?? false
  );
};

const findGithubUser = async (email: string): Promise<GitHubUser | null> => {
  const { data: users }: { data: GitHubSearchResponse } =
    await octokit.search.users({
      q: `${email} in:email`
    });
  return users.total_count > 0 ? users.items[0] : null;
};

const checkOrganizationMembership = async (
  username: string
): Promise<boolean> => {
  try {
    await octokit.orgs.getMembershipForUser({ org: GITHUB_ORG, username });
    return true;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "status" in error &&
      error.status === 404
    ) {
      return false;
    }
    throw error;
  }
};

const addToOrganization = async (userId: number): Promise<void> => {
  await octokit.orgs.createInvitation({
    org: GITHUB_ORG,
    invitee_id: userId,
    role: "direct_member"
  });
};

export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "⚠️ Email is required." },
        { status: 400 }
      );
    }

    if (!(await verifyGumroadPurchase(email))) {
      return NextResponse.json(
        { message: "🚫 No purchases found for this email." },
        { status: 403 }
      );
    }

    const githubUser = await findGithubUser(email);
    if (!githubUser) {
      return NextResponse.json(
        { message: "🔍 No GitHub account found with this email." },
        { status: 404 }
      );
    }

    if (await checkOrganizationMembership(githubUser.login)) {
      return NextResponse.json(
        { message: "✅ You already have access to the organization." },
        { status: 400 }
      );
    }

    await addToOrganization(githubUser.id);
    return NextResponse.json(
      { message: "🎉 Invitation sent successfully!" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "❗ Error processing request. Please try again." },
      { status: 500 }
    );
  }
};
