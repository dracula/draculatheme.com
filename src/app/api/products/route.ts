import { type NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");

  if (id) {
    try {
      const accessToken = process.env.GUMROAD_ACCESS_TOKEN;
      const gumroadResponse = await fetch(
        `https://api.gumroad.com/v2/products/${id}?access_token=${accessToken}`
      );

      if (!gumroadResponse.ok) {
        return NextResponse.json(
          { error: "Failed to fetch product from Gumroad" },
          { status: gumroadResponse.status }
        );
      }

      const contentType = gumroadResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        return NextResponse.json(
          { error: "Invalid response format from Gumroad" },
          { status: 500 }
        );
      }

      const response = await gumroadResponse.json();

      if (!response.success) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(response.product, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error ? error.message : "An error occurred while fetching the product"
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { error: "Product ID is required" },
    { status: 400 }
  );
};
