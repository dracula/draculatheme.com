"use client";

import { useId, useMemo, useState } from "react";

import type { Product } from "@/lib/types";
import { normalizeStoreLinks } from "@/utils/shop/normalize-store-links";

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
  const quantityInputId = useId();
  const sizeSelectId = useId();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptionsByProduct, setSelectedOptionsByProduct] = useState<
    Record<string, string>
  >({});

  const userSelectedOptionValue = selectedOptionsByProduct[product.id];

  const defaultOptionValue = useMemo(() => {
    return options[defaultVariant]?.value ?? "";
  }, [options, defaultVariant]);

  const selectedOptionValue = useMemo(() => {
    if (
      userSelectedOptionValue &&
      options.some((option) => option.value === userSelectedOptionValue)
    ) {
      return userSelectedOptionValue;
    }

    return defaultOptionValue;
  }, [userSelectedOptionValue, options, defaultOptionValue]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const normalizedDescription = useMemo(() => {
    return normalizeStoreLinks(product.description);
  }, [product.description]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    if (options.some((option) => option.value === selectedValue)) {
      setSelectedOptionsByProduct((previous) => ({
        ...previous,
        [product.id]: selectedValue
      }));
      return;
    }

    setSelectedOptionsByProduct((previous) => {
      if (previous[product.id] === undefined) {
        return previous;
      }

      const updated = { ...previous };
      delete updated[product.id];

      return updated;
    });
  };

  const checkoutUrl = useMemo(() => {
    const baseUrl = `https://store.draculatheme.com/l/${product.custom_permalink}`;
    const searchParams = new URLSearchParams();

    searchParams.set("wanted", "true");
    searchParams.set("quantity", quantity.toString());

    if (selectedOptionValue !== "") {
      searchParams.set("variant", selectedOptionValue);
    } else {
      searchParams.delete("variant");
    }

    const queryString = searchParams.toString();

    if (queryString === "") {
      return baseUrl;
    }

    return `${baseUrl}?${queryString}`;
  }, [product.custom_permalink, quantity, selectedOptionValue]);

  const iconContent = (
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
        <title>Shopping Bag Icon</title>
        <path d="M7.96973 8.96877C7.9866 8.42891 8.42911 8 8.96924 8H23.0308C23.5709 8 24.0134 8.4289 24.0303 8.96877L24.4033 20.9063C24.4562 22.599 23.0984 24 21.4048 24H10.5952C8.90164 24 7.54378 22.599 7.59668 20.9063L7.96973 8.96877Z" />
        <path d="M12.5 5V4.5C12.5 2.567 14.067 1 16 1V1C17.933 1 19.5 2.567 19.5 4.5V5" />
      </svg>
      <div className="count">{quantity}</div>
    </div>
  );

  const buttonText = product.published ? "Add to bag" : "Sold out";

  return (
    <div className="details">
      <h1>{product.name}</h1>
      <h2>
        {product.formatted_price} {product.currency.toUpperCase()}
      </h2>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: normalizedDescription }} />
      <div className="options">
        <div className="quantity">
          <label htmlFor={quantityInputId}>Quantity:</label>
          <input
            type="number"
            autoComplete="off"
            id={quantityInputId}
            name={quantityInputId}
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        {options.length > 0 && (
          <div className="size">
            <label htmlFor={sizeSelectId}>Size:</label>
            <select
              id={sizeSelectId}
              name={sizeSelectId}
              value={selectedOptionValue}
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
      {product.published ? (
        <a href={checkoutUrl} className="action primary add-to-cart">
          {iconContent}
          {buttonText}
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="action primary add-to-cart"
          aria-disabled="true"
        >
          {iconContent}
          {buttonText}
        </button>
      )}
    </div>
  );
};
