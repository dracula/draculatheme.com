import Image from "next/image";
import Link from "next/link";

import { findProductConfig } from "@/lib/shop/products";
import type { Product } from "@/lib/types";

export const ProductList = ({
  products,
  id = "products",
  className
}: {
  products: Product[];
  id?: string;
  className?: string;
}) => (
  <ul id={id} className={className}>
    {products.map((product) => {
      const productConfig = findProductConfig(product);
      const slug = productConfig?.params.slug ?? product.custom_permalink;
      const previewImage =
        productConfig?.params.images[0] ?? `${product.custom_permalink}-1.webp`;

      return (
        <li key={product.id}>
          <Link href={`/shop/${slug}`} className="item">
            <div className="thumb">
              <Image
                src={`/images/shop/${previewImage}`}
                alt={product.name}
                width={320}
                height={320}
                quality={100}
              />
            </div>
            <div className="content">
              {!product.published && (
                <span className="item-ribbon sold-out">sold out</span>
              )}
              <h3>{product.name}</h3>
              <span className="price">{product.formatted_price}</span>
            </div>
          </Link>
        </li>
      );
    })}
  </ul>
);
