import "./page.css";

import type { Metadata } from "next";

import { Hero } from "@/components/shared/hero";
import { ProductList } from "@/components/shop/product-list";
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

const fetchProducts = async (
  productsArray: ProductConfig[]
): Promise<Product[]> => {
  const productPromises = productsArray.map((product: ProductConfig) => {
    return fetcher(`/api/products?id=${product.params.gumroadId}`);
  });

  const productsList: Product[] = await Promise.all(productPromises);

  productsList.sort((a, b) => {
    if (a.published === b.published) return a.name.localeCompare(b.name);
    return a.published ? -1 : 1;
  });

  return productsList;
};

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Premium merch for modern vampires. A collection of exclusive apparel and limited-run accessories designed for our community.",
  alternates: {
    canonical: "/shop"
  }
};

const ShopPage = async () => {
  const productsList = await fetchProducts(products);

  return (
    <>
      <Hero />
      <section className="container shop">
        <ProductList products={productsList} />
      </section>
    </>
  );
};

export default ShopPage;
