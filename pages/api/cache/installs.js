import redis from '../../../lib/redis'
import paths from '../../../lib/paths'

import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
})

export default async (req, res) => {
  try {
    let installs = {}

    await Promise.all(
      paths.map(path => fetchAndOrganize(installs, path))
    )

    await redis.hmset('installs', installs)
    return res.status(200).json({ installs })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

async function fetchAndOrganize(installs, path) {
  const key = path.params.repo

  const response = await octokit.rest.repos.getContent({
    path: 'INSTALL.md',
    owner: 'dracula',
    repo: key,
  })

  const value = response.data.content

  return installs[key] = value
}