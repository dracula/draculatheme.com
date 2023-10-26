/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "github.com",
      "raw.githubusercontent.com",
    ],
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  transpilePackages: ["lucide-react"],
  async redirects() {
    return [
      {
        source: "/discord-invite",
        destination: "https://discord.gg/yDcFsrYuq9",
        permanent: true,
      },
      {
        source: "/ui",
        destination: "https://ui.draculatheme.com",
        permanent: true,
      },
      {
        source: "/shop/dracula-sticker-pack",
        destination: "https://draculatheme.com/shop/dracula-sticker-pack-n1",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
