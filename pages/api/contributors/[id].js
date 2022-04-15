import redis from '../../../lib/redis'

export default async ({ query: { id } }, res) => {
  try {
    const value = await redis.hget('contributors', id)
    let contributors = JSON.parse(value || '[]')

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    )
    return res.status(200).json({ contributors })
  } catch (error) {
    return res.status(400).json({ contributors: [] })
  }
}
