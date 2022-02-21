export default async (req, res) => {
  try {
    const userId = '3308934283'
    const twitterReq = await fetch(
      `https://api.twitter.com/2/users/${userId}?user.fields=public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    )

    const { data } = await twitterReq.json()

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    )
    return res.status(200).json({ total: data.public_metrics.followers_count })
  } catch (error) {
    return res.status(400).json({ total: 0 })
  }
}
