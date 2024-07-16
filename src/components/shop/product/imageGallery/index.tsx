/* eslint-disable @next/next/no-img-element */
"use client";

import { LayoutGroup, motion } from "framer-motion";
import { useState } from "react";

const ImageGallery = ({ imagesProps }) => {
  const [primaryImage, setPrimaryImage] = useState(imagesProps[0]);
  const [images, setImages] = useState(
    [...imagesProps].filter((image) => image !== primaryImage)
  );

  const setAsPrimary = (newPrimaryImage: string) => {
    const newCurrentImages = [
      ...images.filter((image: any) => image !== newPrimaryImage),
      primaryImage
    ];

    setPrimaryImage(newPrimaryImage);
    setImages(newCurrentImages);
  };

  const ProductImage = ({
    image,
    onExpand
  }: {
    image: string;
    onExpand: Function;
  }) => {
    return (
      <motion.div
        layoutId={`product-${imagesProps.indexOf(image)}`}
        onClick={() => onExpand(image)}
        className="non-active-image-wrapper"
      >
        <img src={`/images/shop/${image}`} alt={image} />
      </motion.div>
    );
  };

  return (
    <div className="image-gallery">
      <LayoutGroup>
        <div className="active-image-wrapper">
          <motion.div
            key={imagesProps.indexOf(primaryImage)}
            layoutId={`product-${imagesProps.indexOf(primaryImage)}`}
            className="active-image-container"
          >
            <img src={`/images/shop/${primaryImage}`} alt={primaryImage} />
          </motion.div>
        </div>
        <motion.div layoutScroll className="non-active-images">
          {images.map((image) => (
            <ProductImage
              key={imagesProps.indexOf(image)}
              image={image}
              onExpand={setAsPrimary}
            />
          ))}
        </motion.div>
      </LayoutGroup>
    </div>
  );
};

export default ImageGallery;
