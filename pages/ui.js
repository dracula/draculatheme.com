import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Topbar from '../components/ui/Topbar';
import Discount from '../components/pro/Discount';
import Header from '../components/ui/Header';
import Tagline from '../components/ui/Tagline';
import Newsletter from '../components/ui/Newsletter';
import Pricing from '../components/ui/Pricing';
import Features from '../components/ui/Features';
import Highlights from '../components/ui/Highlights';
import Faq from '../components/ui/Faq';
import Authors from '../components/ui/Authors';
import Testimonial from '../components/ui/Testimonial';
import Footer from '../components/ui/Footer';
import styles from './ui.module.css';

class UI extends React.Component {
  state = {
    ppp: {},
  };

  static async getInitialProps() {
    const query = {
      color: 'green',
      icon: 'dracula.svg'
    };

    return { query };
  }

  componentDidMount() {
    this.fetchPPP();
  }

  async fetchPPP() {
    const pppReq = await fetch('https://ppp.dracula.workers.dev');
    const ppp = await pppReq.json();
    this.setState({ ppp });
  }

  render() {
    const title = 'Dracula UI';
    const description = 'A dark-first collection of UI patterns and components';

    return (
      <div className={styles.wrapper}>
        <Head>
          <meta charSet="utf-8" />
          <title>{title} &mdash; {description}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="https://draculatheme.com/ui" property="og:url" />
          <meta content="https://draculatheme.com/static/img/ui/og.jpg" property="og:image" />
          <meta name="theme-color" content="#9580ff" />

          <link rel="icon" type="image/x-icon" href="/static/img/ui/favicon.ico" />
          <script src="https://gumroad.com/js/gumroad.js"></script>
        </Head>

        <Topbar ppp={this.state.ppp} />
        <Discount ppp={this.state.ppp} suffix="UI" queryParams={{}} />
        <Header />
        <Tagline />
        <Features />
        <Highlights />
        <Testimonial />
        <Pricing ppp={this.state.ppp} queryParams={{}} />
        <Faq />
        <Newsletter />
        <Authors />
        <Footer />
      </div>
    )
  }
}

export default UI;