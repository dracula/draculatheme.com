import { NextResponse } from "next/server";

export async function GET() {
  const userId = "3308934283";

  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/${userId}?user.fields=public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Twitter API responded with status: ${response.status}`);
    }

    const {
      data: {
        public_metrics: { followers_count },
      },
    } = await response.json();

    const total = new Intl.NumberFormat().format(followers_count);

    return NextResponse.json({ total }, { status: 200 });
  } catch (e) {
    console.error(e.message); // Log the error for debugging
    return NextResponse.json({ total: 0 }, { status: 400 });
  }
}
