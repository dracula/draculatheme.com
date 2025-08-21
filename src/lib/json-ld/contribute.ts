export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Contribute to Dracula Theme",
  description:
    "“We learn big things from small experiences” - Bram Stoker, Dracula.",
  url: "https://draculatheme.com/contribute",
  mainEntity: {
    "@type": "SoftwareSourceCode",
    name: "Dracula Theme",
    description: "Open-source project driven by and for the community.",
    url: "https://draculatheme.com",
    codeRepository: "https://github.com/dracula",
    license: "https://github.com/dracula/dracula-theme/blob/main/LICENSE",
    maintainer: {
      "@type": "Organization",
      name: "Dracula Theme Community",
      url: "https://github.com/dracula"
    }
  },
  about: [
    {
      "@type": "SoftwareApplication",
      name: "Dracula Theme",
      url: "https://draculatheme.com",
      applicationCategory: "DeveloperApplication"
    },
    {
      "@type": "Guide",
      name: "Contribution Guidelines",
      description:
        "Guidelines, tips, and specifications for applying the Dracula Theme to any application.",
      about: {
        "@type": "SoftwareApplication",
        name: "Dracula Theme"
      }
    }
  ],
  isPartOf: {
    "@type": "WebSite",
    name: "Dracula Theme",
    url: "https://draculatheme.com"
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://draculatheme.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contribute",
        item: "https://draculatheme.com/contribute"
      }
    ]
  },
  publisher: {
    "@type": "Organization",
    name: "Dracula Theme",
    url: "https://draculatheme.com",
    logo: {
      "@type": "ImageObject",
      url: "https://draculatheme.com/images/hero/default.svg"
    },
    sameAs: [
      "https://github.com/dracula",
      "https://twitter.com/draculatheme",
      "https://discord.gg/yDcFsrB"
    ]
  }
};
