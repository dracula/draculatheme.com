import React from 'react';
import Head from 'next/head';
import Shop from '../../layouts/Shop';
import sizes from '../../lib/sizes';
import SizeChart from '../../components/shop/SizeChart';

export async function getStaticProps() {
  return { props: { post: { color: 'purple' }} };
}

class Sizes extends React.Component {
  componentDidMount() {
    document.documentElement.style.setProperty("--cart-visibility", "block");
  }

  componentWillUnmount() {
    document.documentElement.style.setProperty("--cart-visibility", "none");
  }

  renderSizes() {
    return sizes.map((size, index) => {
      return <div key={index} className="sizes">
        <h2 className="category-title">{Object.keys(size)}</h2>
        <SizeChart items={sizes[index][Object.keys(size)]} />
      </div>
    })
  }

  render() {
    const title = `Size Charts — Dracula Shop`;
    const description = 'Do you like sticker packs? Exclusive t-shirts? Dark mode hoodies? Adorable baby bodysuits? Comfortable joggers? If yes, you\'ll have a look of fun over here!';
    const image = '/static/img/shop/og.jpg';

    return (
      <div className="shop">
        <Head>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta content="https://draculatheme.com/shop" property="og:url" />
          <meta content={`https://draculatheme.com${image}`} property="og:image" />
        </Head>

        <div>
          <div className="theme">
            {this.renderSizes()}
          </div>
        </div>
      </div>
    )
  }
}

Sizes.Layout = Shop;

export default Sizes;
