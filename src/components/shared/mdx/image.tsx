import type { ImageProps as NextImageProps } from "next/image";
import NextImage from "next/image";
import type * as React from "react";

interface CustomImageProps extends NextImageProps {
  showCaption?: boolean;
}

export const Image: React.FC<CustomImageProps> = ({
  showCaption = false,
  ...props
}) => (
  <figure>
    <NextImage {...props} width={1200} height={800} alt={props.alt} />
    {showCaption && props.alt && <figcaption>{props.alt}</figcaption>}
  </figure>
);
