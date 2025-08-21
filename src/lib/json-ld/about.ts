export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Dracula Theme",
  description:
    "The origin story - Because every story opens the door to a new one.",
  url: "https://draculatheme.com/about",
  mainEntity: {
    "@type": "Person",
    name: "Zeno Rocha",
    url: "https://zenorocha.com",
    sameAs: ["https://twitter.com/zenorocha", "https://github.com/zenorocha"],
    knowsAbout: [
      {
        "@type": "SoftwareApplication",
        name: "Dracula Theme",
        url: "https://draculatheme.com"
      }
    ]
  },
  about: [
    {
      "@type": "SoftwareApplication",
      name: "Dracula Theme",
      url: "https://draculatheme.com",
      creator: {
        "@type": "Person",
        name: "Zeno Rocha",
        url: "https://zenorocha.com"
      }
    }
  ],
  mentions: [
    {
      "@type": "Event",
      name: "First Dracula Theme Commit",
      startDate: "2013-10-27",
      url: "https://github.com/dracula/dracula-theme/commit/7e4d17ade6a54b7b7d8037a0d2160a293f17ef5c",
      description: "The first commit that started the Dracula Theme project."
    },
    {
      "@type": "SocialMediaPosting",
      url: "https://twitter.com/zenorocha/status/390120821257039872",
      author: {
        "@type": "Person",
        name: "Zeno Rocha"
      },
      datePublished: "2013-10-12"
    },
    {
      "@type": "SocialMediaPosting",
      url: "https://twitter.com/zenorocha/status/395216794249486336",
      author: {
        "@type": "Person",
        name: "Zeno Rocha"
      },
      datePublished: "2013-10-27",
      description: "Tweet announcing the Dracula Theme to the community."
    }
  ],
  isPartOf: {
    "@type": "WebSite",
    name: "Dracula Theme",
    url: "https://draculatheme.com"
  },
  inLanguage: "en",
  datePublished: "2013-10-27",
  dateModified: new Date().toISOString().split("T")[0]
};
