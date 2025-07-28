import Image from "next/image";
import Link from "next/link";

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
    {products.map((product) => (
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
            <h3>{product.name}</h3>
            <span className="price">{product.formatted_price}</span>
          </div>
        </Link>
      </li>
    ))}
  </ul>
);
