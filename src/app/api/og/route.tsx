import { ImageResponse } from "next/server";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Dracula Theme";

    const hasDescription = searchParams.has("description");
    const description = hasDescription
      ? searchParams.get("description")?.slice(0, 100)
      : "🧛🏻‍♂️ One theme. All platforms.";

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1.8,
            textAlign: "center",
            fontSize: 30,
            letterSpacing: -2,
            color: "white",
            backgroundColor: "#1D1B22",
          }}
        >
          <img
            src="https://draculatheme.com/images/contribute/our-project.svg"
            alt="Background"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              inset: 0,
              objectFit: "cover",
            }}
          />
          <div style={{ lineHeight: 1, fontSize: 60, fontWeight: 700 }}>
            {title}
          </div>
          <div>{description}</div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.error(e.message, e.stack);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
