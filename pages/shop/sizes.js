import React from "react";
import Head from "next/head";
import Shop from "../../layouts/Shop";
import { sizesInInches, sizesInCm } from "../../lib/sizes";
import SizeChart from "../../components/shop/SizeChart";

export async function getStaticProps() {
  return { props: { post: { color: "purple" } } };
}

class Sizes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInches: false
    };
  }

  componentDidMount() {
    document.documentElement.style.setProperty("--cart-visibility", "block");
    this.fetchPPP();
  }

  componentWillUnmount() {
    document.documentElement.style.setProperty("--cart-visibility", "none");
  }

  async fetchPPP() {
    const pppReq = await fetch("https://ppp.dracula.workers.dev");
    const ppp = await pppReq.json();

    let country = ppp.country;

    if (country === "CA" || country === "GB" || country === "US") {
      this.setState({ isInches: true });
    }
  }

  onClickUnit(index) {
    if (index === 0) {
      this.setState({ isInches: true });
    } else {
      this.setState({ isInches: false });
    }
  }

  renderUnits() {
    return (
      <span>
        <button
          onClick={this.onClickUnit.bind(this, 0)}
          className={this.state.isInches ? "size-unit-selected" : "size-unit"}
        >
          in
        </button>

        <button
          onClick={this.onClickUnit.bind(this, 1)}
          className={this.state.isInches ? "size-unit" : "size-unit-selected"}
        >
          cm
        </button>
      </span>
    );
  }

  renderSizes() {
    let sizes = sizesInCm;

    if (this.state.isInches) {
      sizes = sizesInInches;
    }

    return sizes.map((size, index) => {
      const sizeKey = Object.keys(size);
      return (
        <div key={index} className="sizes">
          <h2 id={sizeKey[0].toLowerCase()} className="size-subtitle">
            {sizeKey[0]}
          </h2>
          <SizeChart items={sizes[index][sizeKey]} />
        </div>
      );
    });
  }

  render() {
    const title = `Size Charts — Dracula Shop`;
    const description =
      "Do you like sticker packs? Exclusive t-shirts? Dark mode hoodies? Adorable baby bodysuits? Comfortable joggers? If yes, you'll have a look of fun over here!";
    const image = "/static/img/shop/og.jpg";

    return (
      <div className="shop">
        <Head>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta
            content="https://draculatheme.com/shop/sizes"
            property="og:url"
          />
          <meta
            content={`https://draculatheme.com${image}`}
            property="og:image"
          />
        </Head>

        <div>
          <div className="theme">
            <div className="size-header">
              <h1 className="size-title">Size Charts</h1>
              <div className="size-units">
                <span>Units</span>
                {this.renderUnits()}
              </div>
            </div>
            {this.renderSizes()}
          </div>
        </div>
      </div>
    );
  }
}

Sizes.Layout = Shop;

export default Sizes;
