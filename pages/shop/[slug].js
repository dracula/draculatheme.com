import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ShopLayout from '../../layouts/Shop';
import { getColorFromName } from '../../lib/color';
import { getProduct } from '../../lib/gumroad';
import Faq from '../../components/shop/Faq';
import products from '../../lib/shop';
import { stripHtml } from '../../lib/string';
import dynamic from 'next/dynamic';
import { Magnifier } from 'react-image-magnifiers';
const SelectInput = dynamic(() => import('react-select'), { ssr: false });

export async function getStaticPaths() {
  return { paths: products, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const query = products.find(product => product.params.slug === params.slug).params;
  const product = await getProduct(query.gumroadId);

  const relatedProductsPromise = products
    .filter(product => product.params.slug !== query.slug && product.params.category === 'stickers')
    .map(product => {
      return getProduct(product.params.gumroadId);
    })

  const relatedProducts = await Promise.all(relatedProductsPromise);

  return {
    props: {
      ...query,
      product,
      relatedProducts,
      post: { color: query.color }
    }
  };
}

class Product extends React.Component {
  state = {
    size: { value: 'm', label: 'M' },
    quantity: 1,
    selectedImage: 0,
    ppp: {},
  };

  componentDidMount() {
    document.documentElement.style.setProperty("--cart-visibility", "block");
    this.fetchPPP();
  }

  componentWillUnmount() {
    document.documentElement.style.setProperty("--cart-visibility", "none");
  }

  async fetchPPP() {
    const pppReq = await fetch('https://ppp.dracula.workers.dev');
    const ppp = await pppReq.json();
    this.setState({ ppp });
  }

  renderSelect() {
    const sizes = this.props.product.variants[0].options.map(option => {
      return { value: option.name.toUpperCase(), label: option.name };
    });

    return <div className="item-sizes">
      <SelectInput id="theme" defaultValue={sizes[this.props.defaultVariant]} options={sizes} onChange={this.changeSize.bind(this)} isSearchable={true}
        styles={{
          option: (styles, state) => ({
            ...styles,
            cursor: 'pointer',
          }),
          control: (styles) => ({
            ...styles,
            cursor: 'pointer',
          })
        }}
        theme={theme => ({
          ...theme,
          borderRadius: 0,
          cursor: 'pointer',
          colors: {
            ...theme.colors,
            primary:   `#${getColorFromName(this.props.color)}`, // Opened - Border
            primary25: '#2a2c37', // Opened - Active
            primary50: '#2a2c37', // Opened - Focus
            neutral0:  '#1d1e26', // Closed - Background
            neutral10: `#${getColorFromName(this.props.color)}`, // Closed - Arrow
            neutral20: `#${getColorFromName(this.props.color)}`, // Closed - Border
            neutral30: `#${getColorFromName(this.props.color)}`, // Closed - Border Hover
            neutral40: `#${getColorFromName(this.props.color)}`, // Closed - Arrow Hover
            neutral60: `#${getColorFromName(this.props.color)}`, // Opened - Arrow
            neutral80: `#${getColorFromName(this.props.color)}`, // Closed - Text
          },
        })} />
    </div>
  }

  changeSize(e) {
    this.setState({ size: e });
  }

  changeQuantity(e) {
    this.setState({ quantity: e.target.value });
  }

  renderVariants() {
    if (this.props.variants && this.props.variants.length > 0) {
      return <div className="item-variant">
        <p>Size</p>
        {this.renderSelect()}
      </div>
    }
  }

  renderOtherImages() {
    if (this.props.images.length > 1) {
      return <div className="item-other-images">
        {this.props.images.map((image, index) => {
          return <img
            key={index}
            src={`/static/img/shop/${image}`}
            onClick={this.changeImage.bind(this, index)}
          />
        })}
      </div>
    }
  }

  changeImage(index) {
    this.setState({ selectedImage: index });
  }

  renderAvailability() {
    if (this.props.product.max_purchase_count > 0) {
      return <div className="item-ribbon">
        {this.props.product.max_purchase_count}
        {' '}
        left
      </div>
    }
  }

  renderProduct() {
    return <div className="item">
      <div className="item-column-left">
        <div className="item-image">
          {this.renderAvailability()}
          <Magnifier
            imageSrc={`/static/img/shop/${this.props.images[this.state.selectedImage]}`}
            imageAlt={this.props.product.name}
            dragToMove={false}
          />
        </div>
        {this.renderOtherImages()}
      </div>
      <div className="item-details">
        <h1 className="item-name">{this.props.product.name}</h1>
        <p className="item-price">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(this.props.product.price / 100)}
          {' '}
          {this.props.product.currency.toUpperCase()}
        </p>
        <div className="item-description" dangerouslySetInnerHTML={{ __html: this.props.product.description }} />
        <div className="item-variants">
          {this.renderVariants()}
          <div className="item-variant">
            <p>Quantity</p>
            <input
              className="item-number"
              value={this.state.quantity}
              onChange={this.changeQuantity.bind(this)}
              name="quantity"
              type="number"
              max="100"
              min="1"
            />
          </div>
        </div>
        <div className="item-cta">
          <a key={`${this.props.slug}-${this.state.size.value}-${this.state.quantity}`} href={`https://store.draculatheme.com/l/${this.props.slug}?wanted=true&variant=${this.state.size.value}&quantity=${this.state.quantity}`} className="item-add">Pre-order</a>
        </div>
      </div>
    </div>
  }

  renderRelatedProducts() {
    return this.props.relatedProducts
      .map(product => {
        return <div className="product" key={product.custom_permalink}>
          <Link href={`/shop/${product.custom_permalink}`}>
            <a>
              <div className="product-image">
                <img src={`/static/img/shop/${product.custom_permalink}-1.png`} />
              </div>
              <h4 className="product-name">{product.name}</h4>
              <p className="product-price">{product.formatted_price}</p>
            </a>
          </Link>
          <div className="item-cta">
            <a className="item-add" href={`https://store.draculatheme.com/l/${product.custom_permalink}?wanted=true`}>Pre-order</a>
          </div>
        </div>
      });
  }

  render() {
    const title = `${this.props.product.name} — Dracula Shop`;
    const description = stripHtml(this.props.product.description);

    const api = 'https://i.microlink.io/';
    const ogPrice = this.props.product.price / 100;
    const ogImage = `${this.props.product.custom_permalink}-1.png`;
    const cardUrl = `https://cards.microlink.io/?preset=dracula&p=2gkDPD4KICA8TGluawogICAgaHJlZj0naHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1GaXJhK0NvZGUmZmFtaWx5PVNvdXJjZStTYW5zK1BybycKICAgIHJlbD0nc3R5bGVzaGVldCcKICAvPgogIDxGbGV4CiAgICBzeD17ewogICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywKICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLAogICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJywKICAgICAgYmc6ICcjMjgyQTM2JywKICAgICAgcGw6IDUsCiAgICAgIHByOiA1LAogICAgICBib3JkZXI6IGAxMHB4IHNvbGlkICR7cXVlcnkuY29sb3J9YCwKICAgICAgYm9yZGVyUmFkaXVzOiA0LAogICAgfX0KICA-CiAgICA8RmxleCBhcz0nY29udGVudCc-CiAgICAgIDxGbGV4CiAgICAgICAgc3g9e3sKICAgICAgICAgIGJhY2tncm91bmQ6ICcjMzAzNDQyJywKICAgICAgICAgIGJvcmRlclJhZGl1czogMjAsCiAgICAgICAgICBtYXJnaW5SaWdodDogNTAsCiAgICAgICAgfX0KICAgICAgPgogICAgICAgIDxJbWFnZQogICAgICAgICAgc3g9e3sKICAgICAgICAgICAgd2lkdGg6IDYwMCwKICAgICAgICAgIH19CiAgICAgICAgICBzcmM9e2BodHRwczovL2RyYWN1bGF0aGVtZS5jb20vc3RhdGljL2ltZy9zaG9wLyR7cXVlcnkuaW1hZ2V9YH0KICAgICAgICAvPgogICAgICA8L0ZsZXg-CgogICAgICA8RmxleAogICAgICAgIHN4PXt7CiAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywKICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywKICAgICAgICB9fQogICAgICA-CiAgICAgICAgPFBhcmFncmFwaAogICAgICAgICAgc3g9e3sKICAgICAgICAgICAgd2lkdGg6IDQwMCwKICAgICAgICAgICAgbWF4V2lkdGg6ICcxMDAlJywKICAgICAgICAgICAgZm9udFNpemU6ICc1MHB4JywKICAgICAgICAgICAgZm9udFdlaWdodDogMzAwLAogICAgICAgICAgICBmb250RmFtaWx5OiAnU291cmNlIFNhbnMgUHJvJywKICAgICAgICAgICAgY29sb3I6ICcjZjJmMmYyJywKICAgICAgICAgIH19CiAgICAgICAgPgogICAgICAgICAgPFRleHQ-e3F1ZXJ5LnRpdGxlfTwvVGV4dD4KICAgICAgICA8L1BhcmFncmFwaD4KICAgICAgICAKICAgICAgICA8UGFyYWdyYXBoCiAgICAgICAgICBzeD17ewogICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywKICAgICAgICAgICAgZm9udFdlaWdodDogNDAwLAogICAgICAgICAgICBmb250U2l6ZTogMjAsCiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdGaXJhIENvZGUnLAogICAgICAgICAgICBjb2xvcjogJyNmMmYyZjInLAogICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsCiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLAogICAgICAgICAgICBtdDogMjAsCiAgICAgICAgICAgIG1sOiAtMSwKICAgICAgICAgIH19CiAgICAgICAgPgogICAgICAgICAgPEZsZXg-CiAgICAgICAgICAgIDxzdmcKICAgICAgICAgICAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICAgICAgICAgICAgd2lkdGg9IjI4IgogICAgICAgICAgICAgIGhlaWdodD0iMjgiCiAgICAgICAgICAgICAgdmlld0JveD0iMCAwIDI0IDI0IgogICAgICAgICAgICAgIGZpbGw9Im5vbmUiCiAgICAgICAgICAgICAgc3Ryb2tlPSIjNkQ3MjkwIgogICAgICAgICAgICAgIHN0cm9rZS13aWR0aD0iMiIKICAgICAgICAgICAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgICAgICAgICAgICAgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIKICAgICAgICAgICAgICBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWRvbGxhci1zaWduIgogICAgICAgICAgICA-CiAgICAgICAgICAgICAgICA8bGluZSB4MT0iMTIiIHkxPSIxIiB4Mj0iMTIiIHkyPSIyMyI-PC9saW5lPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE3IDVIOS41YTMuNSAzLjUgMCAwIDAgMCA3aDVhMy41IDMuNSAwIDAgMSAwIDdINiI-PC9wYXRoPgogICAgICAgICAgICA8L3N2Zz4KICAgICAgICAgICAgPFRleHQKICAgICAgICAgICAgICBzeD17ewogICAgICAgICAgICAgICAgbXQ6IDAsCiAgICAgICAgICAgICAgICBwbDogMiwKICAgICAgICAgICAgICAgIHByOiAyLAogICAgICAgICAgICAgICAgY29sb3I6IHF1ZXJ5LmNvbG9yLAogICAgICAgICAgICAgIH19CiAgICAgICAgICAgID4KICAgICAgICAgICAgICB7cXVlcnkucHJpY2V9CiAgICAgICAgICAgIDwvVGV4dD57JyAnfQogICAgICAgICAgICBVU0QKICAgICAgICAgIDwvRmxleD4KICAgICAgICA8L1BhcmFncmFwaD4KICAgICAgPC9GbGV4PgogICAgPC9GbGV4PgogIDwvRmxleD4KPC8-&color=%23${getColorFromName(this.props.color)}&title=${this.props.product.name}&price=${ogPrice}&image=${ogImage}`;
    const image = `${api}${encodeURIComponent(cardUrl)}`;

    return (
      <div className="shop">
        <Head>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta content={`https://draculatheme.com/shop/${this.props.slug}`} property="og:url" />
          <meta content={image} name="image" />
          <meta content={image} itemProp="image" />
          <meta content={image} name="twitter:image" />
          <meta content={image} property="og:image" />
        </Head>

        <div>
          <div className="theme">
            <Link href="/shop">
              <a className="back-link">← Back to Products</a>
            </Link>
            {this.renderProduct()}

            <h2 className="related-products-title">
              You might also like
            </h2>
            <div className="related-products products">
              {this.renderRelatedProducts()}
            </div>

            <h2 className="related-products-title">
              Frequently asked questions
            </h2>
            <Faq ppp={this.state.ppp} />
          </div>
        </div>
      </div>
    )
  }
}

Product.Layout = ShopLayout;

export default Product;