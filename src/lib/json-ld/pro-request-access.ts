export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Request GitHub access to Dracula Pro",
  description:
    "Request access to Dracula Pro on GitHub and help shape what ships next.",
  url: "https://draculatheme.com/pro/request-access",
  isPartOf: {
    "@type": "WebSite",
    name: "Dracula Theme",
    url: "https://draculatheme.com"
  },
  inLanguage: "en",
  potentialAction: [
    {
      "@type": "RegisterAction",
      name: "Request access",
      target: "https://draculatheme.com/pro/request-access"
    }
  ],
  dateModified: new Date().toISOString().split("T")[0]
};
