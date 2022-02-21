import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
})

export default async (req, res) => {
  try {
    const githubRes = await octokit.repos.get({
      owner: 'dracula',
      repo: 'dracula-theme',
    })
    const total = new Intl.NumberFormat().format(
      githubRes.data.stargazers_count
    )

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    )
    return res.status(200).json({ total })
  } catch (error) {
    return res.status(400).json({ total: 0 })
  }
}
