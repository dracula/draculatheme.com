export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dracula Theme",
  alternateName: "Dracula",
  description:
    "Dracula is a color scheme for code editors and terminal emulators such as Vim, Notepad++, iTerm, VSCode, Terminal.app, ZSH, and much more. A universal theme for 400+ applications.",
  url: "https://draculatheme.com",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Code Editor Theme",
  operatingSystem: ["Windows", "macOS", "Linux"],
  datePublished: "2013-10-27",
  dateModified: "2025-08-20",
  author: [
    {
      "@type": "Person",
      name: "Zeno Rocha",
      url: "https://zenorocha.com"
    },
    {
      "@type": "Person",
      name: "Lucas de França",
      url: "https://www.luxonauta.com"
    }
  ],
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
  },
  license: "https://github.com/dracula/dracula-theme/blob/main/LICENSE",
  keywords: ["color scheme", "theme", "developer tools", "syntax highlighting"],
  downloadUrl: "https://draculatheme.com",
  installUrl: "https://draculatheme.com",
  screenshot: "https://draculatheme.com/images/og.png",
  featureList: [
    "Support for 400+ applications",
    "Color Scheme optimized for programming",
    "Consistent color scheme",
    "Reduced context switching",
    "Custom fonts with ligatures",
    "WCAG 2.0 Level AA compliance"
  ],
  offers: [
    {
      "@type": "Offer",
      name: "Dracula Theme (MIT)",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      description:
        "The free and open-source version of Dracula Theme, available under the MIT license for multiple applications."
    },
    {
      "@type": "Offer",
      name: "Dracula Pro",
      price: "70",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://draculatheme.com/pro",
      description:
        "Premium version with additional features, variants, fonts and a productivity e-book."
    }
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "3000000",
    bestRating: "5",
    worstRating: "1"
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Dracula Theme?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dracula is a color scheme created for code editors and terminal emulators, available for over 400 different applications."
        }
      },
      {
        "@type": "Question",
        name: "Which applications support Dracula Theme?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Visual Studio Code, Sublime Text, Atom, Vim, JetBrains IDEs, iTerm, Terminal.app, ZSH and over 400 other applications."
        }
      }
    ]
  }
};
