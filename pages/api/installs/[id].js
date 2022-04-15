import redis from '../../../lib/redis'

export default async ({ query: { id } }, res) => {
  try {
    const value = await redis.hget('installs', id)
    const install = value || ''

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    )
    return res.status(200).json({ install })
  } catch (error) {
    return res.status(400).json({ install: '' })
  }
}
