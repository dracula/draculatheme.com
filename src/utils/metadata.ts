import type { Metadata } from "next";

interface CreateMetadataProps {
  title: string;
  description: string;
  canonicalPath: string;
  imageUrl?: string;
  openGraphType?: "website" | "article";
}

export const createMetadata = ({
  title,
  description,
  canonicalPath,
  imageUrl = "https://draculatheme.com/images/og.webp",
  openGraphType = "website"
}: CreateMetadataProps): Metadata => {
  const absoluteUrl = new URL(
    canonicalPath,
    "https://draculatheme.com"
  ).toString();

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      type: openGraphType,
      images: [
        {
          url: imageUrl
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
};
