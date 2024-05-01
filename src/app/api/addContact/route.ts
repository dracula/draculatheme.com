import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: { message: "The 'email' parameter was not found" } },
      { status: 400 }
    );
  }

  const RESEND_API_TOKEN = process.env.RESEND_API_TOKEN;
  if (!RESEND_API_TOKEN) {
    return NextResponse.json(
      { error: { message: "Server configuration error" } },
      { status: 500 }
    );
  }

  const RESEND_API_ENDPOINT =
    "https://api.resend.com/audiences/51bebc3a-05c8-4112-98f5-517719808445/contacts";

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
      const responseData = await response.json();
      const errorMessage =
        responseData && responseData.error
          ? responseData.error.message
          : "API request failed";
      return NextResponse.json(
        { error: { message: errorMessage } },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Email added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
