const { google } = require("googleapis");

const scopes = "https://www.googleapis.com/auth/analytics.readonly";
const auth = require("../auth.json");
const jwt = new google.auth.JWT(
  auth.client_email,
  null,
  auth.private_key,
  scopes
);

export async function getData(id) {
  await jwt.authorize();

  const result = await google.analyticsreporting("v4").reports.batchGet({
    auth: jwt,
    requestBody: {
      reportRequests: [
        {
          viewId: "78543755",
          dateRanges: [{ startDate: "2013-10-30", endDate: "today" }],
          metrics: [{ expression: "ga:pageviews" }],
          dimensions: [{ name: "ga:pagePath" }],
          dimensionFilterClauses: [
            {
              filters: [
                {
                  operator: "EXACT",
                  dimensionName: "ga:pagePath",
                  expressions: [`/${id}`],
                },
                {
                  operator: "EXACT",
                  dimensionName: "ga:pagePath",
                  expressions: [`/${id}/`],
                },
              ],
            },
          ],
        },
      ],
    },
  });

  const totalWithoutTrailingSlash =
    parseInt(result.data.reports[0].data.rows[0].metrics[0].values[0], 10) || 0;
  const totalWithTrailingSlash =
    parseInt(result.data.reports[0].data.rows[1]?.metrics[0].values[0], 10) ||
    0;

  return totalWithoutTrailingSlash + totalWithTrailingSlash;
}
