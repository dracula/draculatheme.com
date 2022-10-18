import Head from 'next/head'
import Hero from '../../components/shop/Hero'
import Link from 'next/link'
import React from 'react'
import ShopLayout from '../../layouts/Shop'
import { getProduct } from '../../lib/gumroad'
import products from '../../lib/shop'

export async function getStaticProps() {
  const productPromises = products.map(product => {
    return getProduct(product.params.gumroadId)
  })

  const list = await Promise.all(productPromises)
  return { props: { list, post: { color: 'purple' } } }
}

class Shop extends React.Component {
  componentDidMount() {
    document.documentElement.style.setProperty(
      '--cart-visibility',
      'inline-flex'
    )
  }

  componentWillUnmount() {
    document.documentElement.style.setProperty('--cart-visibility', 'none')
  }

  renderAvailability(product) {
    if (!product.published) {
      return (
        <div className="item-ribbon item-ribbon-sold-out">
          sold out
        </div>
      )
    }
  }

  renderProducts() {
    return this.props.list.map(product => {
      return (
        <Link
          href={`/shop/${product.custom_permalink}`}
          key={product.custom_permalink}
        >
          <a className="product">
            <div className="product-image">
              {this.renderAvailability(product)}
              <img
                src={`/static/img/shop/${product.custom_permalink}-1.png`}
                alt={product.name}
              />
            </div>
            <h4 className="product-name">{product.name}</h4>
            <p className="product-price">{product.formatted_price}</p>
          </a>
        </Link>
      )
    })
  }

  render() {
    const title = 'Shop — Premium merch from the Dracula theme'
    const description =
      "Do you like sticker packs? Exclusive t-shirts? Dark mode hoodies? Adorable baby bodysuits? Comfortable joggers? If yes, you'll have a look of fun over here!"
    const image = '/static/img/shop/og.jpg'

    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta content="https://draculatheme.com/shop" property="og:url" />
          <meta
            content={`https://draculatheme.com${image}`}
            property="og:image"
          />
        </Head>
        <Hero />
        <div id="browse" className="product-container">
          <div className="theme">
            <div className="products">{this.renderProducts()}</div>
          </div>
        </div>
      </div>
    )
  }
}

Shop.Layout = ShopLayout

export default Shop
