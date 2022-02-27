import React from 'react'
import Head from 'next/head'
import paths from '../lib/paths'
import ThemeLayout from '../layouts/Theme'
import Contributors from '../components/Contributors'
import Updates from '../components/Updates'
import download from 'download'
import probe from 'probe-image-size'
import { convertMarkdownToReact } from '../lib/markdown'
import { getColorFromName } from '../lib/color'
import { getBasePath } from '../lib/environment'
import ThemeDetails from '../components/ThemeDetails'
import { intervalToDuration } from 'date-fns'

export async function getStaticPaths() {
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const header = {
    headers: {
      Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
  }

  const query = paths.find(path => path.params.theme === params.theme).params

  const installReq = await fetch(
    `https://api.github.com/repos/dracula/${query.repo}/contents/INSTALL.md`,
    header
  )

  const installRes = await installReq.json()
  const installBuffer = Buffer.from(installRes.content, 'base64')
  query.install = installBuffer.toString('utf8')

  const contributorsReq = await fetch(
    `https://api.github.com/repos/dracula/${query.repo}/contributors`,
    header
  )

  const contributors = await contributorsReq.json()
  query.contributors = contributors.filter(contributor => {
    if (contributor.login === 'ImgBotApp') return
    return contributor
  })

  const image = `https://raw.githubusercontent.com/dracula/${query.repo}/master/screenshot.png`
  await download(image, 'public/static/img/screenshots', {
    filename: `${query.theme}.png`,
  })

  const metadata = await probe(image)
  query.imageWidth = metadata.width
  query.imageHeight = metadata.height

  const viewsReq = await fetch(`${getBasePath()}/api/views/${params.theme}`)
  const viewsRes = await viewsReq.json()
  query.views = new Intl.NumberFormat().format(viewsRes.views || 0)

  const totalSubscribersReq = await fetch(`${getBasePath()}/api/mailchimp`)
  const totalSubscribersRes = await totalSubscribersReq.json()
  const totalSubscribers = totalSubscribersRes.total

  const totalStarsReq = await fetch(
    `https://api.github.com/repos/dracula/${query.repo}`,
    header
  )
  const totalStarsRes = await totalStarsReq.json()
  query.totalStars = new Intl.NumberFormat().format(
    totalStarsRes.stargazers_count
  )

  const lastCommitReq = await fetch(
    `https://api.github.com/repos/dracula/${query.repo}/branches/master`,
    header
  )
  const lastCommitRes = await lastCommitReq.json()
  query.lastCommit = remaining(lastCommitRes.commit.commit.author.date)

  const totalPullRequestsReq = await fetch(
    `https://api.github.com/repos/dracula/${query.repo}/pulls?state=all`,
    header
  )
  const totalPullRequestsRes = await totalPullRequestsReq.json()
  query.totalPullRequests = totalPullRequestsRes.length
    ? totalPullRequestsRes.length.toString()
    : '0'

  const totalOpenIssuesReq = await fetch(
    `https://api.github.com/repos/dracula/${query.repo}`,
    header
  )
  const totalOpenIssuesRes = await totalOpenIssuesReq.json()
  query.openIssues = totalOpenIssuesRes.open_issues

  return { props: { query, totalSubscribers }, revalidate: 7200 }
}

const remaining = endDate => {
  const now = new Date()
  const end = new Date(endDate)

  let dur = intervalToDuration({
    start: now,
    end: end,
  })

  if (dur.years > 0) {
    if (dur.years === 1) {
      return `${dur.years} year ago`
    }

    return `${dur.years} years ago`
  } else if (dur.months > 0) {
    if (dur.months === 1) {
      return `${dur.months} month ago`
    }

    return `${dur.months} months ago`
  } else if (dur.days > 0) {
    if (dur.days === 1) {
      return `${dur.days} day ago`
    }

    return `${dur.days} days ago`
  } else if (dur.hours > 0) {
    if (dur.hours === 1) {
      return `${dur.hours} hour ago`
    }

    return `${dur.hours} hours ago`
  } else if (dur.minutes > 0) {
    if (dur.minutes === 1) {
      return `${dur.minutes} minute ago`
    }

    return `${dur.minutes} minutes ago`
  } else if (dur.seconds > 0) {
    if (dur.seconds === 1) {
      return `${dur.seconds} second ago`
    }

    return `${dur.seconds} seconds ago`
  }

  return ''
}

class Theme extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      views: props.query.views,
    }
  }

  componentDidMount() {
    this.getViews()
  }

  async getViews() {
    const viewsReq = await fetch(`/api/views/${this.props.query.theme}`)
    const viewsRes = await viewsReq.json()
    const views = new Intl.NumberFormat().format(viewsRes.views || 0)

    this.setState({ views })
  }

  render() {
    let title = `Dark theme for ${this.props.query.title} and ${paths.length}+ apps — Dracula`

    if (this.props.query.title === 'Wallpaper') {
      title = `Dark wallpaper collection — Dracula`
    }

    const description = `Dracula is a color scheme for code editors and terminal emulators, including ${this.props.query.title} and ${paths.length}+ other apps. Check the instructions to learn how to install it.`
    const content = convertMarkdownToReact(this.props.query.install)

    const api = 'https://i.microlink.io/'
    const cardUrl = `https://cards.microlink.io/?preset=dracula&color=%23${getColorFromName(
      this.props.query.color
    )}&contributors=${this.props.query.contributors.length}&icon=${
      this.props.query.icon
    }&views=${this.state.views}&repo=${this.props.query.repo}&title=${
      this.props.query.title
    }`
    const image = `${api}${encodeURIComponent(cardUrl)}`

    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta
            content={`https://draculatheme.com/${this.props.query.theme}`}
            property="og:url"
          />
          <meta content={image} name="image" />
          <meta content={image} itemProp="image" />
          <meta content={image} name="twitter:image" />
          <meta content={image} property="og:image" />
        </Head>

        <div className="theme">
          <img
            className="preview"
            src={`/static/img/screenshots/${this.props.query.theme}.png`}
            alt={`${this.props.query.title} Theme Preview`}
            width={this.props.query.imageWidth}
            height={this.props.query.imageHeight}
          />
          <p className="views">{this.state.views} views</p>
          <div className="instructions">{content}</div>
          <Updates
            type="theme"
            totalSubscribers={this.props.totalSubscribers}
          />
          <Contributors
            repo={this.props.query.repo}
            data={this.props.query.contributors}
          />
          <ThemeDetails
            repo={this.props.query.repo}
            stars={this.props.query.totalStars}
            lastCommit={this.props.query.lastCommit}
            pullRequests={this.props.query.totalPullRequests}
            openIssues={this.props.query.openIssues}
          />
        </div>
      </div>
    )
  }
}

Theme.Layout = ThemeLayout

export default Theme
