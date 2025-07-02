import { type NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email parameter is required." },
      { status: 400 }
    );
  }

  const { RESEND_API_TOKEN, RESEND_API_ENDPOINT } = process.env;

  if (!RESEND_API_TOKEN || !RESEND_API_ENDPOINT) {
    return NextResponse.json(
      { error: "Missing server configuration." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(RESEND_API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { error: data?.error?.message || "Request failed." },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "💜 Email added successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
};
