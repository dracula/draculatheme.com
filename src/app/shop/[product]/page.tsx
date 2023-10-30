import "./page.scss";

import FAQ from "src/components/shop/faq";
import Product from "src/components/shop/product";
import RelatedProducts from "src/components/shop/relatedProducts";
import fetchData from "src/lib/fetchData";
import { getBasePath } from "src/lib/environment";
import products from "src/lib/shop";

export async function generateStaticParams() {
  return products.map((product) => ({
    product: product.params.slug,
  }));
}

const fetchProduct = async (id) => {
  return fetchData(`${getBasePath()}/api/products?id=${id}`);
};

const fetchRelatedProducts = async (productsArray, query) => {
  const relatedProductsPromise = productsArray
    .filter(
      (product) =>
        product.params.slug !== query.slug &&
        product.params.category === query.category,
    )
    .map((product) => {
      return fetchData(
        `${getBasePath()}/api/products?id=${product.params.gumroadId}`,
      );
    });

  return await Promise.all(relatedProductsPromise);
};

const ProductPage = async ({ params }) => {
  const query = products.find(
    (product) => product.params.slug === params.product,
  ).params;

  const product = await fetchProduct(query.gumroadId);

  const relatedProducts = await fetchRelatedProducts(products, query);

  return (
    <section className="product">
      <div className="container">
        <Product product={{ ...query, ...product }} />
        <RelatedProducts products={relatedProducts} />
        <FAQ />
      </div>
    </section>
  );
};

export default ProductPage;
