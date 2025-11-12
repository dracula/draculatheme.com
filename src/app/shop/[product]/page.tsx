import "./page.css";

import type { Metadata } from "next";

import { Disclosure } from "@/components/shared/disclosure";
import { ProductDetails } from "@/components/shop/product-details";
import { ProductGallery } from "@/components/shop/product-gallery";
import { ProductList } from "@/components/shop/product-list";
import { frequentlyAskedQuestions } from "@/lib/shop/faqs";
import { products } from "@/lib/shop/products";
import type { Product } from "@/lib/types";
import { fetcher } from "@/utils/fetcher";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: sanitizeDescription(product.description),
    url: `https://draculatheme.com/shop/${query.slug}`,
    image: query.images.map(
      (image) => `https://draculatheme.com/images/shop/${image}`
    ),
    brand: {
      "@type": "Brand",
      name: "Dracula Theme",
      url: "https://draculatheme.com",
      logo: {
        "@type": "ImageObject",
        url: "https://draculatheme.com/images/hero/default.svg"
      }
    },
    category: query.category,
    sku: query.gumroadId,
    gtin: query.gumroadId,
    productID: query.slug,
    color: query.color,
    material: query.category === "shirts" ? "Cotton" : undefined,
    size: query.variants ? query.variants : undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: product.published
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Dracula Theme",
        url: "https://draculatheme.com"
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn"
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD"
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "DAY"
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 5,
            maxValue: 14,
            unitCode: "DAY"
          }
        }
      }
    },
    audience: {
      "@type": "Audience",
      audienceType: ["Developers", "Designers", "Tech Enthusiasts"]
    },
    isRelatedTo: relatedProducts.slice(0, 3).map((relatedProduct) => {
      const relatedConfig = products.find(
        (p) => p.params.gumroadId === relatedProduct.id
      );
      return {
        "@type": "Product",
        name: relatedProduct.name,
        url: `https://draculatheme.com/shop/${relatedConfig?.params.slug}`
      };
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://draculatheme.com/shop/${query.slug}`
    },
    potentialAction: [
      {
        "@type": "BuyAction",
        name: `Buy ${product.name}`,
        target: `https://draculatheme.com/shop/${query.slug}`
      },
      {
        "@type": "ViewAction",
        name: "View Product Details",
        target: `https://draculatheme.com/shop/${query.slug}`
      }
    ]
  };

  return (
    <>
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
        <div className="frequently-asked-questions">
          <h3>Frequently Asked Questions</h3>
          <ul>
            {frequentlyAskedQuestions.map((questionItem) => (
              <li key={questionItem.question}>
                <Disclosure
                  question={questionItem.question}
                  answer={questionItem.answer}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <JsonLdScript
        id={createStructuredDataScriptId(
          "shop",
          query.slug,
          "structured",
          "data"
        )}
        jsonLd={jsonLd}
      />
    </>
  );
};

export default ProductPage;
