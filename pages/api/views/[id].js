const { google } = require('googleapis');

const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
const auth = require('../../../auth.json');
const jwt = new google.auth.JWT(auth.client_email, null, auth.private_key, scopes);

async function getData(id) {
  await jwt.authorize();

  const result = await google.analyticsreporting('v4').reports.batchGet({
    auth: jwt,
    requestBody: {
      reportRequests: [
        {
          viewId: '78543755',
          dateRanges: [{ startDate: '2013-10-30', endDate: 'today' }],
          metrics: [{ expression: 'ga:pageviews' }],
          dimensions: [{ name: "ga:pagePath", }],
          dimensionFilterClauses: [
            {
              filters: [
                {
                  operator: 'EXACT',
                  dimensionName: 'ga:pagePath',
                  expressions: [`/${id}`]
                },
                {
                  operator: 'EXACT',
                  dimensionName: 'ga:pagePath',
                  expressions: [`/${id}/`]
                }
              ]
            }
          ]
        }
      ]
    }
  })

  const data = result.data.reports[0].data;
  const total = parseInt(data.rows[0].metrics[0].values[0], 10) +
    parseInt(data.rows[1].metrics[0].values[0], 10);

  return total;
}

export default async ({ query: { id } }, res) => {
  try {
    const views = await getData(id);
    res.status(200).json({ views });
  }
  catch(e) {
    res.status(500).json({ message: e.message })
  }
}