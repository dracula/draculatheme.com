import redis from '../../../lib/redis'
import paths from '../../../lib/paths'
import { getData } from '../../../lib/ga'
import pLimit from 'p-limit'

// Number of concurrent requests allowed by Google Analytics API
const limit = pLimit(10)

export default async (req, res) => {
  try {
    let views = {}

    await Promise.all(
      paths.map(path => limit(() => fetchAndOrganize(views, path)))
    )

    await redis.hmset('views', views)
    return res.status(200).json({ views })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

async function fetchAndOrganize(views, path) {
  const key = path.params.theme
  const value = await getData(key)

  return views[key] = value
}