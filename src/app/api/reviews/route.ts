import Airtable from "airtable";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base("appE8qDD7fxpKyDpf");

    const records = await base("Table 1")
      .select({
        fields: ["ID", "Name", "Country", "GitHub", "Body", "Date"],
        view: "Approved",
      })
      .all();

    const reviews = records.map((review) => {
      return {
        id: review.get("ID"),
        name: review.get("Name") || "",
        country: review.get("Country") || "",
        github: review.get("GitHub") || "",
        body: review.get("Body") || "",
        date: review.get("Date") || "",
      };
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching from Airtable:", error);
    return NextResponse.json([], { status: 400 });
  }
}
