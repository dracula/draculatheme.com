import ChangelogDate from '../../components/pro/ChangelogDate'
import Footer from '../../components/pro/Footer'
import Head from 'next/head'
import Topbar from '../../components/pro/Topbar'
import { convertMarkdownToReact } from '../../lib/markdown'
import getLogs from '../../lib/changelog.js'
import styles from './changelog.module.css'

export async function getStaticProps() {
  return {
    props: {
      logs: await getLogs(),
    },
  }
}

export default function Changelog({ logs }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Dracula PRO - Changelog</title>
        <meta content="Dracula PRO - Changelog" property="og:title" />
        <meta
          content="Discover the latest updates and improvements for Dracula Pro."
          name="description"
        />
        <meta
          content="Discover the latest updates and improvements for Dracula Pro."
          property="og:description"
        />
        <meta content="Dracula PRO Team" name="author" />
        <meta
          content="https://draculatheme.com/pro/changelog"
          property="og:url"
        />
        <meta
          content="https://draculatheme.com/static/img/pro/why-dracula.jpg"
          property="og:image"
        />
      </Head>
      <Topbar />
      <div className={styles.changelog}>
        <div className={styles.header}>
          <div className={styles.container}>
            <h1 className={styles.titleP}>Changelog</h1>
            <h2 className={styles.titleT}>
              Discover the latest updates and improvements for Dracula Pro.
            </h2>
          </div>
          <a
            href="/changelog-rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.rssLink}
          >
            RSS Feed
          </a>
        </div>
        <div className={styles.container}>
          <ul className={styles.logs}>
            {logs.map((log, index) => {
              let style = { '--item-color': 'var(--' + log.color + ')' }
              return (
                <li key={index} id={log.id} style={style}>
                  <article>
                    <div className={styles.date}>
                      <span>
                        <ChangelogDate dateString={log.date} />
                      </span>
                    </div>
                    <div className={styles.content}>
                      <h3 className={styles.titleS}>{log.title}</h3>
                      <div className={styles.logContent}>
                        {convertMarkdownToReact(log.markdown)}
                      </div>
                      <div className={styles.author}>
                        <div className={styles.avatar}>
                          <img src={log.author.avatar} alt={log.author.name} />
                        </div>
                        <span className={styles.authorName}>
                          {log.author.name}
                        </span>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  )
}
