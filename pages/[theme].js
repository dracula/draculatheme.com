import Contributors from '../components/Contributors'
import Head from 'next/head'
import HelpImproveLink from '../components/HelpImproveLink'
import React from 'react'
import ThemeLayout from '../layouts/Theme'
import Updates from '../components/Updates'
import { convertMarkdownToReact } from '../lib/markdown'
import download from 'download'
import { getBasePath } from '../lib/environment'
import { getColorFromName } from '../lib/color'
import paths from '../lib/paths'
import probe from 'probe-image-size'

export async function getStaticPaths() {
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const header = {
    headers: {
      Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
  }

  let query = paths.find(path => path.params.theme === params.theme)

  if (!query.params) {
    return { props: {} }
  } else {
    query = query.params
  }

  const installReq = await fetch(`${getBasePath()}/api/installs/${query.repo}`)
  const { install } = await installReq.json()
  const buffer = Buffer.from(install, 'base64')
  query.install = buffer.toString('utf8')

  const contributorsReq = await fetch(
    `${getBasePath()}/api/contributors/${params.theme}`
  )
  const { contributors } = await contributorsReq.json()
  query.contributors = contributors

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

  return { props: { query, totalSubscribers }, revalidate: 7200 }
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
    this.getDefaultBranch()
  }

  async getViews() {
    const viewsReq = await fetch(`/api/views/${this.props.query.theme}`)
    const viewsRes = await viewsReq.json()
    const views = new Intl.NumberFormat().format(viewsRes.views || 0)

    this.setState({ views })
  }

  async getDefaultBranch() {
    const defaultBranchReq = await fetch(
      `https://api.github.com/repos/dracula/${this.props.query.repo}`
    )
    const defaultBranchRes = await defaultBranchReq.json()
    const defaultBranch = defaultBranchRes.default_branch

    this.setState({ defaultBranch })
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
          <HelpImproveLink
            color={this.props.query.color}
            repo={this.props.query.repo}
            defaultBranch={this.state.defaultBranch}
          />
          <Updates
            type="theme"
            totalSubscribers={this.props.totalSubscribers}
          />
          <Contributors
            repo={this.props.query.repo}
            data={this.props.query.contributors}
          />
        </div>
      </div>
    )
  }
}

Theme.Layout = ThemeLayout

export default Theme
