import "./page.css";

import Image from "next/image";
import Link from "next/link";

import { Hero } from "@/components/shared/hero";
import { products } from "@/lib/products";
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

interface Product {
  params: ProductParams;
}

interface FetchedProduct {
  id: string;
  name: string;
  custom_permalink: string;
  formatted_price: string;
  published: boolean;
}

const fetchProducts = async (
  productsArray: Product[]
): Promise<FetchedProduct[]> => {
  const productPromises = productsArray.map((product: Product) => {
    return fetcher(`/api/products?id=${product.params.gumroadId}`);
  });

  const productsList: FetchedProduct[] = await Promise.all(productPromises);

  productsList.sort((a, b) => {
    if (a.published === b.published) return a.name.localeCompare(b.name);
    return a.published ? -1 : 1;
  });

  return productsList;
};

const ShopPage = async () => {
  const productsList = await fetchProducts(products);

  return (
    <>
      <Hero />
      <section className="container shop">
        <ul>
          {productsList.map((product) => (
            <li key={product.id}>
              <Link href={`/shop/${product.custom_permalink}`} className="item">
                <div>
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
      </section>
    </>
  );
};

export default ShopPage;
