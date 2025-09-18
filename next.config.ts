import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  async redirects() {
    return [
      {
        source: "/discord-invite",
        destination: "https://discord.gg/yDcFsrYuq9",
        permanent: true
      },
      {
        source: "/ui",
        destination: "https://ui.draculatheme.com",
        permanent: true
      },
      {
        source: "/shop/dracula-sticker-pack",
        destination: "https://draculatheme.com/shop/dracula-sticker-pack-n1",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
