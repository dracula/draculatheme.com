export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Dracula Newsletter",
  description:
    "Subscribe to Dracula’s newsletter for exclusive updates. Join thousands of subscribers.",
  url: "https://draculatheme.com/newsletter",
  isPartOf: {
    "@type": "WebSite",
    name: "Dracula Theme",
    url: "https://draculatheme.com"
  },
  inLanguage: "en",
  potentialAction: [
    {
      "@type": "SubscribeAction",
      name: "Subscribe to the Dracula newsletter",
      target: "https://draculatheme.com/newsletter"
    }
  ],
  dateModified: new Date().toISOString().split("T")[0]
};
