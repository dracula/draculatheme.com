import React from 'react';
import Head from 'next/head';

import Topbar from '../components/pro/Topbar';
import Header from '../components/pro/Header';
import Description from '../components/pro/Description';
import Preview from '../components/pro/Preview';
import Why from '../components/pro/Why';
import Palette from '../components/pro/Palette';
import Features from '../components/pro/Features';
import Fonts from '../components/pro/Fonts';
import Ebook from '../components/pro/Ebook';
import Pricing from '../components/pro/Pricing';
import Footer from '../components/pro/Footer';

class Pro extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  state = {
    app: 'vscode',
    variant: '1'
  };

  changeApp(e) {
    this.setState({ app: e.target.value });
  }

  changeVariant(e) {
    this.setState({ variant: e.target.value });
  }

  render() {
    const title = 'Dracula PRO';
    const description = 'Be more productive';

    return (
      <div className="pro" style={{ backgroundColor: '#2a2c37', fontFamily: 'Fira Code, monospace' }}>
        <Head>
          <meta charSet="utf-8" />
          <title>{title} &mdash; {description}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta content="https://draculatheme.com/pro" property="og:url" />
          <meta content="https://draculatheme.com/static/img/pro/why-dracula.jpg" property="og:image" />
          <meta name="theme-color" content="#50fa7b" />

          <link rel="icon" type="image/x-icon" href="/static/img/pro/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Fira+Code:400,500,700&display=swap" rel="stylesheet" />
          <script type="module" src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js"></script>
          <script noModule src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.js"></script>
          <script src="https://gumroad.com/js/gumroad.js"></script>
        </Head>

        <Topbar />
        <Header title={title} description={description} />
        <Description />
        <Preview app={this.state.app} variant={this.state.variant} changeApp={this.changeApp.bind(this)} changeVariant={this.changeVariant.bind(this)} />
        <Why />
        <Palette />
        <Features />
        <Fonts />
        <Ebook />
        <Pricing app={this.state.app} changeApp={this.changeApp.bind(this)} />
        <Footer />
      </div>
    )
  }
}

export default Pro;
