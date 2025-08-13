"use client";

import Image from "next/image";
import { useState } from "react";

import type { Product } from "@/lib/types";

interface ProductGalleryProps {
  product: Product;
  images: string[];
}

export const ProductGallery = ({ product, images }: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="gallery">
      <div className="main">
        <Image
          src={`/images/shop/${images[selectedIndex]}`}
          alt={product.name}
          width={576}
          height={528}
          quality={100}
          priority
        />
      </div>
      <div className="thumbs">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={index === selectedIndex ? "active" : ""}
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={`/images/shop/${image}`}
              alt={`${product.name} - view ${index + 1}`}
              width={144}
              height={132}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
