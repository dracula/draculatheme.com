import Blogpost from '../layouts/Blogpost'
import Head from 'next/head'
import MetricCard from '../components/MetricCard'
import React from 'react'
import { getBasePath } from '../lib/environment'
import styles from './open.module.css'

export async function getStaticProps() {
  const mailchimpReq = await fetch(`${getBasePath()}/api/mailchimp`)
  const mailchimpRes = await mailchimpReq.json()
  const mailchimp = mailchimpRes.total || '---'

  const twitterReq = await fetch(`${getBasePath()}/api/twitter`)
  const twitterRes = await twitterReq.json()
  const twitter = twitterRes.total || '---'

  const githubReq = await fetch(`${getBasePath()}/api/github`)
  const githubRes = await githubReq.json()
  const github = githubRes.total || '---'

  const proSalesReq = await fetch(`${getBasePath()}/api/sales/tPfIDt`)
  const proSalesRes = await proSalesReq.json()
  const proSales = proSalesRes.total || '---'

  const uiSalesReq = await fetch(`${getBasePath()}/api/sales/MkxCD`)
  const uiSalesRes = await uiSalesReq.json()
  const uiSales = uiSalesRes.total || '---'

  const googleAnalyticsReq = await fetch(`${getBasePath()}/api/views`)
  const googleAnalyticsRes = await googleAnalyticsReq.json()
  const googleAnalytics = googleAnalyticsRes.views || '---'

  return {
    props: {
      mailchimp,
      twitter,
      proSales,
      uiSales,
      github,
      googleAnalytics,
      post: { color: 'purple' },
    },
  }
}

class Dashboard extends React.Component {
  renderMetrics() {
    const metrics = [
      {
        label: 'GitHub Stars',
        value: this.props.github,
        link: 'https://github.com/dracula/dracula-theme',
      },
      {
        label: 'Twitter Followers',
        value: this.props.twitter,
        link: 'https://twitter.com/draculatheme',
      },
      {
        label: 'Mailchimp Subscribers',
        value: this.props.mailchimp,
        link: 'https://draculatheme.com/pro/journey#updates',
      },
      {
        label: 'Website Pageviews',
        value: this.props.googleAnalytics,
      },
      {
        label: 'Dracula UI Sales',
        value: this.props.uiSales,
        link: 'https://draculatheme.com/ui',
      },
      {
        label: 'Dracula PRO Sales',
        value: this.props.proSales,
        link: 'https://draculatheme.com/pro',
      },
    ]

    return metrics.map((metric, index) => {
      return <MetricCard metric={metric} key={index} />
    })
  }

  render() {
    const title = 'Open Dashboard — Public metrics for Dracula Theme'
    const description =
      'Dracula operates fully transparent and shares its metrics with the community.'

    return (
      <div className={styles.dashboard}>
        <Head>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta
            content="https://draculatheme.com/dashboard"
            property="og:url"
          />
          <meta
            content={'https://draculatheme.com/static/img/facebook.png'}
            property="og:image"
          />
        </Head>

        <div className={styles.container}>
          <h3>Open Dashboard</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.metrics}>{this.renderMetrics()}</div>
        </div>
      </div>
    )
  }
}

Dashboard.Layout = Blogpost

export default Dashboard
