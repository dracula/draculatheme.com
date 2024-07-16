/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

const renderAvailability = (product) => {
  if (!product.published) {
    return <span className="item-ribbon sold-out">sold out</span>;
  }
};

const RelatedProducts = ({ products }) => {
  return (
    <div className="related-products">
      <h2>You might also like:</h2>
      <div className="grid">
        {products.slice(0, 3).map((product, index) => (
          <Link
            key={index}
            href={`/shop/${product.custom_permalink}`}
            className="item"
          >
            <div className="image">
              <img
                src={`/images/shop/${product.custom_permalink}-1.png`}
                alt={product.name}
              />
            </div>
            <div className="content">
              {renderAvailability(product)}
              <span className="title name">{product.name}</span>
              <span className="price">{product.formatted_price}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
