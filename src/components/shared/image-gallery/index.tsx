"use client";

import "./index.css";

import Image from "next/image";
import { useState } from "react";

export type ImageGalleryItem = {
  src: string;
  alt: string;
};

interface ImageGalleryProps {
  images: ImageGalleryItem[];
  sizes?: string;
  priority?: boolean;
}

export const ImageGallery = ({
  images,
  sizes = "(max-width: 48rem) 100vw, 36rem",
  priority = false
}: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex] ?? images[0];
  const hasMultipleImages = images.length > 1;

  if (!selectedImage) {
    return null;
  }

  return (
    <div className="image-gallery">
      <div className="main">
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          width={800}
          height={800}
          sizes={sizes}
          quality={100}
          priority={priority}
        />
      </div>
      {hasMultipleImages && (
        <div className="thumbs" role="tablist" aria-label="Screenshot views">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={image.alt}
              className={index === selectedIndex ? "active" : ""}
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={image.src}
                alt=""
                width={144}
                height={132}
                aria-hidden
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
