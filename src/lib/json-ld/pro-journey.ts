export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Our journey",
  description: "Follow our journey and learn from our work.",
  url: "https://draculatheme.com/pro/journey",
  isPartOf: {
    "@type": "WebSite",
    name: "Dracula Theme",
    url: "https://draculatheme.com"
  },
  inLanguage: "en",
  dateModified: new Date().toISOString().split("T")[0]
};
