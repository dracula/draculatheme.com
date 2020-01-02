import React from 'react';
import Head from 'next/head';
import ComingSoon from '../components/ComingSoon';

class Index extends React.Component {
  static async getInitialProps() {
    const query = {
      color: 'green',
      icon: 'dracula.svg'
    };

    return { query };
  }

  render() {
    const title = 'Dracula Pro';
    const description = 'A new theme is coming.';

    return (
      <div style={{ backgroundColor: '#2a2c37', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Head>
          <meta charSet="utf-8" />
          <title>{title} &mdash; {description}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta content="https://draculatheme.com/pro" property="og:url" />
          <meta content="https://draculatheme.com/static/img/facebook.png" property="og:image" />
        </Head>

        <ComingSoon />
      </div>
    )
  }
}

export default Index;
