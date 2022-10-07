import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from './ErrorMessage.module.css'

export default function ErrorMessage({ code }) {
  let title = 'Error 404'
  let description = 'Page Not Found'

  if (code === 500) {
    title = 'Error 500'
    description = "Something isn't right."
  }

  return (
    <div className={styles.body}>
      <Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="Zeno Rocha" name="author" />
        <meta
          content="https://draculatheme.com/static/img/facebook.png"
          property="og:image"
        />
      </Head>

      <div>
        <h1 className={styles.title}>{code}</h1>
        <Link href="/">
          <a className={styles.link}>Back to Home</a>
        </Link>
      </div>
    </div>
  )
}
