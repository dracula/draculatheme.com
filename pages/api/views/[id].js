import redis from '../../../lib/redis'

export default async ({ query: { id } }, res) => {
  try {
    const value = await redis.hget('views', id)
    const views = parseInt(value, 10) || 0

    return res.status(200).json({ views })
  } catch (error) {
    return res.status(400).json({ views: 0 })
  }
}
