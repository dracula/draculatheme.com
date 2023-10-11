import { NextRequest, NextResponse } from "next/server";

import { google } from "googleapis";
import redis from "../../../lib/redis";

const getAuthenticatedClient = () => {
  const scopes = "https://www.googleapis.com/auth/analytics.readonly";
  const auth = require("../../../../auth.json");
  const jwt = new google.auth.JWT(
    auth.client_email,
    null,
    auth.private_key,
    scopes,
  );

  return jwt;
};

const getGoogleAnalyticsData = async () => {
  const jwt = getAuthenticatedClient();
  await jwt.authorize();

  const result = await google.analyticsreporting("v4").reports.batchGet({
    auth: jwt,
    requestBody: {
      reportRequests: [
        {
          viewId: "377676805",
          dateRanges: [{ startDate: "2013-10-30", endDate: "today" }],
          metrics: [{ expression: "ga:pageviews" }],
        },
      ],
    },
  });

  const total = new Intl.NumberFormat().format(
    parseInt(result.data.reports[0].data.rows[0].metrics[0].values[0], 10),
  );

  return { total };
};

const getRedisData = async (id) => {
  const value = await redis.hget("views", id);
  const views = parseInt(value, 10) || 0;
  return { views };
};

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    if (id) {
      const { views } = await getRedisData(id);
      return NextResponse.json({ type: "redis", views }, { status: 200 });
    } else {
      const { total } = await getGoogleAnalyticsData();
      return NextResponse.json(
        { type: "googleAnalytics", total },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { type: "error", message: error.message, data: 0 },
      { status: 400 },
    );
  }
}
