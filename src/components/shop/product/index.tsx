"use client";

import Link from "next/link";
import { useState } from "react";
import ImageGallery from "./imageGallery";
import QuantityInput from "./quantityInput";
import SizeSelect from "./sizeSelect";

const Product = ({ product }) => {
  const options =
    product?.variants?.[0]?.options?.map((option) => ({
      value: option.name.toUpperCase(),
      label: option.name
    })) || [];

  const defaultVariant = product.defaultVariant || 0;

  const [selectedOption, setSelectedOption] = useState(
    options[defaultVariant] || { value: "", label: "" }
  );

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product">
      <ImageGallery imagesProps={product.images} />
      <div className="content">
        <div className="text">
          <h1 className="name">{product.name}</h1>
          <span className="price title s">
            {product.formatted_price} {product.currency.toUpperCase()}
          </span>
        </div>
        <hr />
        <div
          className="item-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        {product.published && (
          <>
            <div className="options">
              <QuantityInput quantity={quantity} setQuantity={setQuantity} />
              {options.length > 0 && (
                <SizeSelect
                  options={options}
                  defaultVariant={defaultVariant}
                  setSelectedOption={setSelectedOption}
                />
              )}
            </div>
            <Link
              href={`https://store.draculatheme.com/l/${
                product.slug
              }?wanted=true&variant=${
                selectedOption?.value || ""
              }&quantity=${quantity}`}
              className="primary add-to-cart"
            >
              <span>Add to cart</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
