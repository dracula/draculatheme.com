import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pppReq = await fetch("https://ppp.dracula.workers.dev");
    const ppp = await pppReq.json();

    return NextResponse.json({ ...ppp }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 400 });
  }
}
