"use client";

import {
  ImageGallery,
  type ImageGalleryItem
} from "@/components/shared/image-gallery";
import type { Product } from "@/lib/types";

interface ProductGalleryProps {
  product: Product;
  images: string[];
}

export const ProductGallery = ({ product, images }: ProductGalleryProps) => {
  const galleryImages: ImageGalleryItem[] = images.map((image, index) => ({
    src: `/images/shop/${image}`,
    alt: index === 0 ? product.name : `${product.name} - view ${index + 1}`
  }));

  return (
    <ImageGallery
      images={galleryImages}
      sizes="(max-width: 48rem) 100vw, 36rem"
      priority
    />
  );
};
