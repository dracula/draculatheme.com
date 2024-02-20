export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://draculatheme.com/sitemap.xml",
    host: "https://draculatheme.com",
  };
}
