import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const product = request.nextUrl.searchParams.get("product");

  if (product) {
    try {
      const gumroadReq = await fetch(
        `https://api.gumroad.com/v2/products/${product}?access_token=${process.env.GUMROAD_ACCESS_TOKEN}`,
      );
      const gumroadRes = await gumroadReq.json();

      const count = gumroadRes.product.sales_count.toLocaleString();
      const total = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(gumroadRes.product.sales_usd_cents / 100);

      return NextResponse.json({ count, total }, { status: 200 });
    } catch (e) {
      return NextResponse.json({ count: 0, total: 0 }, { status: 400 });
    }
  }

  return NextResponse.json({ count: 0, total: 0 }, { status: 400 });
}
