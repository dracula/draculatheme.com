import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './_error.module.css';

export async function getServerSideProps({ res, err }) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { props: { statusCode } };
}

class CustomError extends React.Component {
  render() {
    const title = `Error ${this.props.statusCode}`;
    const description = 'Something went wrong';
    const image = '/static/img/about.jpeg';

    return (
      <div className={styles.body}>
        <Head>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta content="https://draculatheme.com/static/img/facebook.png" property="og:image" />
        </Head>

        <div>
          <h1 className={styles.title}>{this.props.statusCode}</h1>
          <Link href="/"><a className={styles.link}>Back to Home</a></Link>
        </div>
      </div>
    )
  }
}

export default CustomError;
