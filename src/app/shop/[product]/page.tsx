import "./page.css";

import type { Metadata } from "next";

import { Disclosure } from "@/components/shared/disclosure";
import { ProductDetails } from "@/components/shop/product-details";
import { ProductGallery } from "@/components/shop/product-gallery";
import { ProductList } from "@/components/shop/product-list";
import { faqs } from "@/lib/shop/faqs";
import { products } from "@/lib/shop/products";
import type { Product } from "@/lib/types";
import { fetcher } from "@/utils/fetcher";

interface ProductParams {
  slug: string;
  gumroadId: string;
  images: string[];
  category: string;
  color: string;
  size?: string;
  defaultVariant?: number;
  variants?: string[];
}

interface ProductConfig {
  params: ProductParams;
}

interface PageParams {
  product: string;
}

export const generateStaticParams = async () => {
  return products.map((product) => ({
    product: product.params.slug
  }));
};

const fetchProduct = async (id: string): Promise<Product> => {
  return fetcher(`/api/products?id=${id}`);
};

const fetchRelatedProducts = async (
  productsArray: ProductConfig[],
  query: ProductParams
): Promise<Product[]> => {
  const relatedProductsPromise = productsArray
    .filter(
      (product) =>
        product.params.slug !== query.slug &&
        product.params.category === query.category
    )
    .map((product) => {
      return fetcher(`/api/products?id=${product.params.gumroadId}`);
    });

  return await Promise.all(relatedProductsPromise);
};

const sanitizeDescription = (htmlString: string): string => {
  let isFirstLi = true;
  let sanitized = htmlString
    .replace(/<li>/g, () => {
      if (isFirstLi) {
        isFirstLi = false;
        return "";
      }
      return ", ";
    })
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>|<p>/g, " ")
    .replace(/<\/?[^>]+(>|$)/g, "");

  sanitized = sanitized.replace(/\s\s+/g, " ").trim();

  return sanitized.length > 160
    ? `${sanitized.substring(0, 157)}...`
    : sanitized;
};

export const generateMetadata = async ({
  params
}: {
  params: Promise<PageParams>;
}): Promise<Metadata | undefined> => {
  const resolvedParams = await params;
  const productConfig = products.find(
    (product) => product.params.slug === resolvedParams.product
  );

  if (!productConfig) {
    return undefined;
  }

  const query = productConfig.params;
  const product = await fetchProduct(query.gumroadId);

  const title = product.name;
  const description = sanitizeDescription(product.description);

  return {
    title,
    description,
    alternates: {
      canonical: `/shop/${query.slug}`
    }
  };
};

const ProductPage = async ({ params }: { params: Promise<PageParams> }) => {
  const resolvedParams = await params;
  const productConfig = products.find(
    (product) => product.params.slug === resolvedParams.product
  );

  if (!productConfig) {
    return <div>Product not found</div>;
  }

  const query = productConfig.params;
  const product = await fetchProduct(query.gumroadId);
  const relatedProducts = await fetchRelatedProducts(products, query);

  const options =
    product?.variants?.[0]?.options?.map((option) => ({
      value: option.name.toUpperCase(),
      label: option.name
    })) || [];

  const defaultVariant = query.defaultVariant || 0;

  return (
    <section className="container product">
      <div className="overview">
        <ProductGallery product={product} images={query.images} />
        <ProductDetails
          product={product}
          options={options}
          defaultVariant={defaultVariant}
        />
      </div>
      <div className="related-products">
        <h3>Customers also purchased</h3>
        <ProductList products={relatedProducts.slice(0, 3)} />
      </div>
      <div className="faqs">
        <h3>Frequently Asked Questions</h3>
        <ul>
          {faqs.map((faq) => (
            <li key={faq.question}>
              <Disclosure question={faq.question} answer={faq.answer} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductPage;
