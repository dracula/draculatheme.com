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
  next_page_key?: string;
}

const { GUMROAD_ACCESS_TOKEN, GITHUB_PERSONAL_ACCESS_TOKEN } = process.env;
const PRODUCT_ID = "tPfIDt";
const GITHUB_ORG = "dracula-pro";
const MAXIMUM_GUMROAD_PAGES = 20;

if (!GUMROAD_ACCESS_TOKEN || !GITHUB_PERSONAL_ACCESS_TOKEN) {
  throw new Error("❌ Missing required environment variables.");
}

const octokit = new Octokit({ auth: GITHUB_PERSONAL_ACCESS_TOKEN });

const isPurchase = (sale: GumroadSale, email: string) =>
  sale.product_permalink === PRODUCT_ID &&
  sale.email?.toLowerCase() === email &&
  !sale.refunded &&
  sale.paid === true;

const verifyGumroadPurchase = async (email: string): Promise<boolean> => {
  let pageKey: string | undefined;

  for (let page = 0; page < MAXIMUM_GUMROAD_PAGES; page++) {
    const parameters = new URLSearchParams({
      access_token: GUMROAD_ACCESS_TOKEN,
      email
    });

    if (pageKey) {
      parameters.set("page_key", pageKey);
    }

    const response = await fetch(
      `https://api.gumroad.com/v2/sales?${parameters.toString()}`
    );

    if (!response.ok) {
      throw new Error(`🚨 Gumroad API error: ${response.status}.`);
    }

    const data: GumroadResponse = await response.json();

    if (data.sales?.some((sale) => isPurchase(sale, email))) {
      return true;
    }

    if (!data.next_page_key) {
      return false;
    }

    pageKey = data.next_page_key;
  }

  return false;
};

const getErrorStatus = (error: unknown) =>
  error && typeof error === "object" && "status" in error
    ? error.status
    : undefined;

export const POST = async (request: NextRequest) => {
  try {
    const body: { email?: unknown } = await request.json();
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

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

    try {
      await octokit.orgs.createInvitation({
        org: GITHUB_ORG,
        email,
        role: "direct_member"
      });
    } catch (error: unknown) {
      if (getErrorStatus(error) === 422) {
        return NextResponse.json(
          {
            message:
              "✅ This email already has an invitation or access. Check your inbox or github.com/dracula-pro."
          },
          { status: 400 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      {
        message:
          "🎉 Invitation sent! Check your email and accept it with any GitHub account."
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "❗ Error processing request. Please try again." },
      { status: 500 }
    );
  }
};
