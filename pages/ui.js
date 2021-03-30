import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Discount from '../components/pro/Discount';
import Tagline from '../components/ui/Tagline';
import Highlights from '../components/ui/Highlights';
import Authors from '../components/ui/Authors';
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
          <meta content="https://draculatheme.com/static/img/og-ui.jpg" property="og:image" />

          <script src="https://gumroad.com/js/gumroad.js"></script>
        </Head>

        <div className={styles.header}>
          <p className={styles.comingSoon}>Coming Soon</p>
          <h1 className={styles.title}>Dracula <span className={styles.purple}>UI</span></h1>
          <p className={styles.subtitle}>A dark-first collection of <span className={styles.purple}>UI patterns and components</span></p>
          <div className={styles.buy}>
            <a href={gumroadURL} className="gumroad-button" className={styles.cta}>Buy Dracula UI</a>
          </div>
        </div>

        <div className={styles.body}>
          <h2 className={styles.bodyTitle}>Join the Waitlist</h2>
          <p className={styles.bodyText}>Be among the first to build stunning dark mode apps with Dracula UI.</p>
          <div className={styles.bodyForm}>
            <form className="form" action="https://draculatheme.us4.list-manage.com/subscribe/post?u=91b5113403e18d357704e4b08&amp;id=023365a1d4" method="post">
              <input name="EMAIL" placeholder="your@email.com" id="mce-EMAIL" type="email" required />
              <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" />
            </form>
          </div>
        </div>

        <div className={styles.footer}>
          <p style={{ fontFamily: 'Fira Code, monospace', fontSize: 16, margin: 0 }} className="credits">Made with <span style={{ fontSize: 36 }} className="love">♥</span> by <a className="cyan" href="https://zenorocha.com" target="blank">Zeno Rocha</a> & <a className="cyan" href="https://twitter.com/nettofarah" target="blank">Netto Farah</a></p>
        </div>
        <Discount ppp={this.state.ppp} suffix="UI" queryParams={{}} />
        <Tagline />
        <Highlights />
        <Pricing ppp={this.state.ppp} queryParams={{}} />
        <Authors />
        <Footer />
      </div>
    )
  }
}

export default UI;