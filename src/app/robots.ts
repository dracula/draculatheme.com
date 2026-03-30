import type { MetadataRoute } from "next";

const Robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/"
    }
  ],
  sitemap: "https://draculatheme.com/sitemap.xml",
  host: "https://draculatheme.com"
});

export default Robots;
