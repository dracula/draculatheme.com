import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cssChunking: false
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com"
      },
      {
        hostname: "github.com"
      },
      {
        hostname: "raw.githubusercontent.com"
      }
    ]
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  async redirects() {
    return [
      {
        source: "/discord-invite",
        destination: "https://discord.gg/yDcFsrYuq9",
        permanent: true,
        basePath: false
      },
      {
        source: "/ui",
        destination: "https://ui.draculatheme.com",
        permanent: true,
        basePath: false
      },
      {
        source: "/shop/dracula-sticker-pack",
        destination: "https://draculatheme.com/shop/dracula-sticker-pack-n1",
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/discord-invite",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate"
          },
          {
            key: "X-Robots-Tag",
            value: "noindex"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
