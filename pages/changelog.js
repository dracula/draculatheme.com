import { format, parseISO } from 'date-fns'

import Footer from '../components/Footer'
import Topbar from '../components/Topbar'
import { convertMarkdownToReact } from '../lib/markdown'
import getLogs from '../lib/changelog.js'
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
      <Topbar />
      <div className={styles.changelog}>
        <div className={styles.header}>
          <div className={styles.container}>
            <h1 className={styles.titleP}>Changelog</h1>
            <h2 className={styles.titleT}>
              New updates and improvements to Dracula Theme projects.
            </h2>
          </div>
        </div>
        <div className={styles.container}>
          <ul className={styles.logs}>
            {logs.map((log, index) => (
              <li key={index}>
                <article>
                  <div className={styles.date}>
                    <span>
                      <time dateTime={log.date}>{log.date}</time>
                    </span>
                  </div>
                  <div className={styles.content}>
                    <div className={styles.project}>
                      <span>{log.project}</span>
                    </div>
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
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  )
}
