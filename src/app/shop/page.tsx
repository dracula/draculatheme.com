import "./page.css";

import type { Metadata } from "next";

import { Hero } from "@/components/shared/hero";
import { ProductList } from "@/components/shop/product-list";
import { products } from "@/lib/shop/products";
import type { Product } from "@/lib/types";
import { fetcher } from "@/utils/fetcher";
import { sanitizeDescription } from "@/utils/shop/sanitize-description";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Dracula Theme Shop",
    description:
      "Premium merch for modern vampires. A collection of exclusive apparel and limited-run accessories designed for our community.",
    url: "https://draculatheme.com/shop",
    image: "https://draculatheme.com/images/og.png",
    brand: {
      "@type": "Brand",
      name: "Dracula Theme",
      url: "https://draculatheme.com",
      logo: {
        "@type": "ImageObject",
        url: "https://draculatheme.com/images/hero/default.svg"
      }
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Dracula Theme",
      url: "https://draculatheme.com",
      sameAs: [
        "https://github.com/dracula",
        "https://twitter.com/draculatheme",
        "https://discord.gg/yDcFsrB"
      ]
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dracula Theme Products",
      itemListElement: productsList
        .filter((product) => product.published)
        .map((product) => ({
          "@type": "Offer",
          name: product.name,
          description:
            sanitizeDescription(product.description) ||
            `Premium ${product.name} from Dracula Shop.`,
          url: `https://draculatheme.com/shop/${products.find((p) => p.params.gumroadId === product.id)?.params.slug}`,
          image:
            product.preview_url ||
            `https://draculatheme.com/images/shop/${products.find((p) => p.params.gumroadId === product.id)?.params.images[0]}`,
          price: product.price,
          priceCurrency: "USD",
          availability: product.published
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: "Dracula Shop"
          },
          category:
            products.find((p) => p.params.gumroadId === product.id)?.params
              .category || "merchandise"
        }))
    },
    keywords: [
      "dracula theme",
      "developer merchandise",
      "programming apparel",
      "tech clothing",
      "vampire merch",
      "coding accessories",
      "geek theme clothing"
    ],
    potentialAction: [
      {
        "@type": "BuyAction",
        name: "Shop Dracula Merchandise",
        target: "https://draculatheme.com/shop"
      },
      {
        "@type": "ViewAction",
        name: "Browse Products",
        target: "https://draculatheme.com/shop"
      }
    ]
  };

  return (
    <>
      <Hero />
      <section className="container shop">
        <ProductList products={productsList} />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default ShopPage;
