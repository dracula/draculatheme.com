"use client";

import {
  ImageGallery,
  type ImageGalleryItem
} from "@/components/shared/image-gallery";

interface ScreenshotGalleryProps {
  title: string;
  images: string[];
}

export const ScreenshotGallery = ({
  title,
  images
}: ScreenshotGalleryProps) => {
  const galleryImages: ImageGalleryItem[] = images.map((image, index) => ({
    src: image,
    alt: `${title} - screenshot ${index + 1}`
  }));

  return (
    <ImageGallery
      images={galleryImages}
      sizes="(max-width: 48rem) 100vw, 50rem"
      priority
    />
  );
};
