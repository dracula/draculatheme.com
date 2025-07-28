"use client";

import { useState } from "react";

import type { Product } from "@/lib/types";

interface ProductDetailsProps {
  product: Product;
  options: { value: string; label: string }[];
  defaultVariant: number;
}

export const ProductDetails = ({
  product,
  options,
  defaultVariant
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(
    options[defaultVariant] || { value: "", label: "" }
  );

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const option = options.find((opt) => opt.value === selectedValue);
    if (option) {
      setSelectedOption(option);
    }
  };

  return (
    <div className="details">
      <h1>{product.name}</h1>
      <h2>
        {product.formatted_price} {product.currency.toUpperCase()}
      </h2>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
      <div className="options">
        <div className="quantity">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        {options.length > 0 && (
          <div className="size">
            <label htmlFor="size">Size:</label>
            <select
              id="size"
              name="size"
              value={selectedOption.value}
              onChange={handleOptionChange}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <a
        href={`https://store.draculatheme.com/l/${product.custom_permalink}?wanted=true&variant=${selectedOption.value}&quantity=${quantity}`}
        className="action primary add-to-cart"
      >
        Add to bag
      </a>
    </div>
  );
};
