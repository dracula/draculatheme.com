const { google } = require('googleapis')

const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
const auth = require('../../../auth.json')
const jwt = new google.auth.JWT(
  auth.client_email,
  null,
  auth.private_key,
  scopes
)

async function getData(id) {
  await jwt.authorize()

  const result = await google.analyticsreporting('v4').reports.batchGet({
    auth: jwt,
    requestBody: {
      reportRequests: [
        {
          viewId: '78543755',
          dateRanges: [{ startDate: '2013-10-30', endDate: 'today' }],
          metrics: [{ expression: 'ga:pageviews' }],
        },
      ],
    },
  })

  const total = new Intl.NumberFormat().format(
    parseInt(result.data.reports[0].data.rows[0].metrics[0].values[0], 10)
  )

  return total
}

export default async (req, res) => {
  try {
    const views = await getData()
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    )
    res.status(200).json({ views })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
