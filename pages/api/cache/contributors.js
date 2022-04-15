import redis from '../../../lib/redis'
import paths from '../../../lib/paths'

import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
})

export default async (req, res) => {
  try {
    let contributors = {}

    await Promise.all(
      paths.map(path => fetchAndOrganize(contributors, path))
    )

    await redis.hmset('contributors', contributors)
    return res.status(200).json({ contributors })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

async function fetchAndOrganize(contributors, path) {
  const key = path.params.repo

  const response = await octokit.rest.repos.listContributors({
    owner: 'dracula',
    repo: key,
  })

  const value = response.data
    .filter(contributor => {
      if (contributor.login === 'ImgBotApp') return
      return contributor
    })
    .map(contributor => {
      return {
        login: contributor.login,
        avatar_url: contributor.avatar_url
      }
    })

  return contributors[key] = JSON.stringify(value)
}