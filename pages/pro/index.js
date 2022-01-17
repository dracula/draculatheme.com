import React from 'react';
import Head from 'next/head';
import queryString from 'query-string';
import Airtable from 'airtable';

import Topbar from '../../components/pro/Topbar';
import Discount from '../../components/pro/Discount';
import Header from '../../components/pro/Header';
import Description from '../../components/pro/Description';
import Preview from '../../components/pro/Preview';
import Why from '../../components/pro/Why';
import Palette from '../../components/pro/Palette';
import Features from '../../components/pro/Features';
import Fonts from '../../components/pro/Fonts';
import Ebook from '../../components/pro/Ebook';
import Testimonial from '../../components/pro/Testimonial';
import Pricing from '../../components/pro/Pricing';
import Reviews from '../../components/pro/Reviews';
import Footer from '../../components/pro/Footer';

export async function getStaticProps() {
  try {
    const sales = await getSalesData();
    const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });

    const records = await airtable
      .base('appE8qDD7fxpKyDpf')('Table 1')
      .select({
        fields: ['ID', 'Name', 'Country', 'GitHub', 'Body', 'Date'],
        view: 'Approved'
      })
      .all();

    const reviews = records.map((review) => {
      return {
        id: review.get('ID'),
        name: review.get('Name') || '',
        country: review.get('Country') || '',
        github: review.get('GitHub') || '',
        body: review.get('Body') || '',
        date: review.get('Date') || '',
      };
    });

    return { props: { sales, reviews }, revalidate: 3600 };
  }
  catch (e) {
    console.error(e);
  }
}

class Pro extends React.Component {
  state = {
    app: 'vscode',
    variant: 1,
    ppp: {},
    queryParams: {}
  };

  componentDidMount() {
    const queryParams = queryString.parse(location.search);
    this.setState({ queryParams });
    this.fetchPPP();

    document.documentElement.style.setProperty("--cart-visibility", "block");
  }

  componentWillUnmount() {
    document.documentElement.style.setProperty("--cart-visibility", "none");
  }

  async fetchPPP() {
    const pppReq = await fetch('https://ppp.dracula.workers.dev');
    const ppp = await pppReq.json();
    this.setState({ ppp });
  }

  changeApp(e) {
    this.setState({ app: e.value });
  }

  changeVariant(val) {
    this.setState({ variant: val });
  }

  render() {
    const title = 'Dracula PRO — Be more productive';
    const description = 'Dracula PRO is a color scheme and UI theme tailored for programming. Made for terminal emulators, code editors, and syntax highlighters. Designed to be aesthetically pleasing while keeping you focused.';

    return (
      <div className="green" style={{ backgroundColor: '#2a2c37', fontFamily: 'Fira Code, monospace' }}>
        <Head>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta content={title} property="og:title" />
          <meta content={title} property="twitter:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta content="https://draculatheme.com/pro" property="og:url" />
          <meta content="https://draculatheme.com/static/img/pro/why-dracula.jpg" property="og:image" />
          <meta name="theme-color" content="#50fa7b" />

          <link rel="icon" type="image/x-icon" href="/static/img/pro/favicon.ico" />
        </Head>

        <Topbar ppp={this.state.ppp} />
        <Discount ppp={this.state.ppp} suffix="PRO" queryParams={this.state.queryParams} />
        <Header title={title} description={description} sales={this.props.sales} />
        <Description />
        <Preview app={this.state.app} variant={this.state.variant} changeApp={this.changeApp.bind(this)} changeVariant={this.changeVariant.bind(this)} />
        <Why />
        <Palette />
        <Features />
        <Fonts />
        <Ebook />
        <Testimonial />
        <Pricing ppp={this.state.ppp} queryParams={this.state.queryParams} sales={this.props.sales} />
        <Reviews reviews={this.props.reviews} />
        <Footer />
      </div>
    )
  }
}

async function getSalesData() {
  const accessToken = process.env.GUMROAD_ACCESS_TOKEN;
  const request = await fetch(`https://api.gumroad.com/v2/products/tPfIDt?access_token=${accessToken}`);
  const response = await request.json();

  return {
    count: response.product.sales_count.toLocaleString(),
    total: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(response.product.sales_usd_cents / 100),
  }
}

export default Pro;
