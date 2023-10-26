import { NextResponse } from "next/server";

export async function GET() {
  const userId = "3308934283";

  try {
    const response = await fetch(
      `https://api.twitter.com/1.1/users/show.json?user_id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Twitter API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const total = new Intl.NumberFormat().format(data.followers_count);

    return NextResponse.json({ total }, { status: 200 });
  } catch (e) {
    console.error(e.message);
    return NextResponse.json({ total: 0 }, { status: 400 });
  }
}
