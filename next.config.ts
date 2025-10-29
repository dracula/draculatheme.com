import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  outputFileTracingExcludes: {
    "/*": ["public/icons/unused/**"]
  },
  images: {
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
        source: "/ui",
        destination: "https://ui.draculatheme.com",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
