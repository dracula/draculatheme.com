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
};

module.exports = withContentlayer(nextConfig);
