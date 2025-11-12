import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  outputFileTracingExcludes: {
    "/*": [
      "public/icons/unused/**",
      "public/images/**/*.png",
      "public/images/**/*.jpg",
      "public/images/**/*.jpeg",
      "public/images/**/*.gif",
      "public/images/**/*.webp"
    ]
  },
  images: {
    deviceSizes: [360, 480, 600, 720, 840, 960, 1080, 1200, 1440],
    imageSizes: [24, 36, 48, 72, 96, 144, 192, 240, 288, 360],
    formats: ["image/avif", "image/webp"],
    qualities: [20, 30, 40, 50, 60, 70, 80, 90, 100],
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com"
      },
      {
        hostname: "github.com"
      },
      {
        hostname: "raw.githubusercontent.com"
      },
      {
        hostname: "user-images.githubusercontent.com"
      },
      {
        hostname: "img.shields.io"
      },
      {
        hostname: "i.imgur.com"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/discord-invite",
        destination: "https://discord.gg/yDcFsrYuq9",
        permanent: true
      },
      {
        source: "/journey",
        destination: "/pro/journey",
        permanent: true
      },
      {
        source: "/shop/dracula-sticker-pack",
        destination: "https://draculatheme.com/shop/dracula-sticker-pack-n1",
        permanent: true
      },
      {
        source: "/foot-terminal",
        destination: "/foot",
        permanent: true
      },
      {
        source: "/terminal",
        destination: "/terminal-app",
        permanent: true
      },
      {
        source: "/blog/pro/changelog",
        destination: "/pro/changelog",
        permanent: true
      },
      {
        source: "/ui",
        destination: "https://ui.draculatheme.com",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
