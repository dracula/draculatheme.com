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
            autoComplete="off"
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
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="24"
            height="24"
            color="currentColor"
            fill="none"
            aria-hidden="true"
          >
            <title className="sr-only">Shopping Bag Icon</title>
            <path d="M7.96973 8.96877C7.9866 8.42891 8.42911 8 8.96924 8H23.0308C23.5709 8 24.0134 8.4289 24.0303 8.96877L24.4033 20.9063C24.4562 22.599 23.0984 24 21.4048 24H10.5952C8.90164 24 7.54378 22.599 7.59668 20.9063L7.96973 8.96877Z" />
            <path d="M12.5 5V4.5C12.5 2.567 14.067 1 16 1V1C17.933 1 19.5 2.567 19.5 4.5V5" />
          </svg>
          <div className="count">{quantity}</div>
        </div>
        Add to bag
      </a>
    </div>
  );
};
