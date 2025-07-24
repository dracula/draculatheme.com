import "./page.css";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Disclosure } from "@/components/shared/disclosure";
import { faqs } from "@/lib/shop/faqs";
import { products } from "@/lib/shop/products";
import { fetcher } from "@/utils/fetcher";

interface Product {
  id: string;
  name: string;
  description: string;
  custom_permalink: string;
  published: boolean;
  formatted_price: string;
}

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

export async function generateMetadata({
  params
}: {
  params: PageParams;
}): Promise<Metadata | undefined> {
  const productConfig = products.find(
    (product) => product.params.slug === params.product
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
}

const ProductPage = async ({ params }: { params: PageParams }) => {
  const productConfig = products.find(
    (product) => product.params.slug === params.product
  );

  if (!productConfig) {
    return <div>Product not found</div>;
  }

  const query = productConfig.params;
  const product = await fetchProduct(query.gumroadId);
  const relatedProducts = await fetchRelatedProducts(products, query);

  return (
    <section className="container product">
      <div className="related-products">
        <h2>You might also like:</h2>
        <ul className="related-products">
          {relatedProducts.slice(0, 3).map((product: Product) => (
            <li key={product.id}>
              <Link href={`/shop/${product.custom_permalink}`} className="item">
                <div className="thumb">
                  <Image
                    src={`/images/shop/${product.custom_permalink}-1.png`}
                    alt={product.name}
                    width={576}
                    height={528}
                    quality={100}
                  />
                </div>
                <div className="content">
                  {!product.published && (
                    <span className="item-ribbon sold-out">sold out</span>
                  )}
                  <h2>{product.name}</h2>
                  <span className="price">{product.formatted_price}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="faqs">
        <h3>Frequently Asked Questions</h3>
        {faqs.map((faq) => (
          <Disclosure
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductPage;
