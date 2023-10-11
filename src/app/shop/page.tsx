import "./page.scss";

import Grid from "src/components/shop/grid";
import { Metadata } from "next";
import fetchData from "src/lib/fetchData";
import { getBasePath } from "src/lib/environment";
import products from "src/lib/shop";

const fetchProducts = async (productsArray) => {
  const productPromises = productsArray.map((product) => {
    return fetchData(
      `${getBasePath()}/api/products?id=${product.params.gumroadId}`,
    );
  });

  return await Promise.all(productPromises);
};

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Premium merch for modern vampires. A collection of exclusive apparel and limited-run accessories designed for our community.",
};

const Shop = async () => {
  const productsList = await fetchProducts(products);

  return (
    <section className="shop">
      <div className="container">
        <Grid products={productsList} />
      </div>
    </section>
  );
};

export default Shop;
