import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (id) {
    try {
      const accessToken = process.env.GUMROAD_ACCESS_TOKEN;
      const request = await fetch(
        `https://api.gumroad.com/v2/products/${id}?access_token=${accessToken}`,
      );

      const response = await request.json();

      if (!response.success) {
        throw "Error: Product not found";
      }

      return NextResponse.json(response.product, { status: 200 });
    } catch (e) {
      return NextResponse.json(false, { status: 400 });
    }
  }

  return NextResponse.json(false, { status: 400 });
}
