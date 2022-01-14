import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ShopLayout from '../../../layouts/Shop';
import products from '../../../lib/shop';
import { getProduct } from '../../../lib/gumroad';

export async function getStaticPaths() {
  return { paths: products, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { category } = params;
  const productPromises = products
    .filter(product => product.params.category === category)
    .map(product => {
      return getProduct(product.params.gumroadId);
    })

  const list = await Promise.all(productPromises);
  return { props: { category, list, post: { color: 'purple' }} };
}

class Shop extends React.Component {
  renderProducts() {
    return this.props.list.map(product => {
      return <Link href={`/shop/${product.custom_permalink}`} key={product.custom_permalink}>
        <a className="product">
          <div className="product-image">
            <img src={`/static/img/shop/${product.custom_permalink}-1.png`} />
          </div>
          <h4 className="product-name">{product.name}</h4>
          <p className="product-price">{product.formatted_price}</p>
        </a>
      </Link>
    });
  }

  render() {
    const title = `${toTitleCase(this.props.category)} — Dracula Shop`;
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
            <h2 className="category-title">
              {toTitleCase(this.props.category)}
            </h2>
            <div className="products">
              {this.renderProducts()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

Shop.Layout = ShopLayout;

export default Shop;
