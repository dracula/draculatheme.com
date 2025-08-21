export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  name: "Dracula Syntax Highlighting Specification",
  description:
    "Official syntax highlighting and design specification for the Dracula Theme ecosystem.",
  url: "https://draculatheme.com/spec",
  author: [
    {
      "@type": "Person",
      name: "Zeno Rocha",
      url: "https://zenorocha.com"
    },
    {
      "@type": "Person",
      name: "Lucas de França",
      url: "https://luxonauta.com"
    },
    {
      "@type": "Person",
      name: "Derek Sifford",
      description: "Creator of the first version of this specification."
    }
  ],
  publisher: {
    "@type": "Organization",
    name: "Dracula Theme",
    url: "https://draculatheme.com",
    logo: {
      "@type": "ImageObject",
      url: "https://draculatheme.com/images/hero/default.svg"
    }
  },
  about: {
    "@type": "SoftwareApplication",
    name: "Dracula Theme",
    url: "https://draculatheme.com",
    applicationCategory: "DeveloperApplication"
  },
  mainEntity: {
    "@type": "Dataset",
    name: "Dracula Color Palette",
    description:
      "Complete color specifications for dark and light variants of Dracula Theme.",
    distribution: [
      {
        "@type": "DataDownload",
        name: "Dracula Classic Colors",
        description: "Dark theme color palette",
        encodingFormat: "application/json",
        contentUrl: "https://draculatheme.com/spec#color-palette"
      },
      {
        "@type": "DataDownload",
        name: "Alucard Classic Colors",
        description: "Light theme color palette",
        encodingFormat: "application/json",
        contentUrl: "https://draculatheme.com/spec#color-palette"
      }
    ]
  },
  keywords: [
    "dracula theme",
    "color scheme",
    "syntax highlighting",
    "specification",
    "developer tools",
    "design guidelines",
    "accessibility",
    "color palette"
  ],
  inLanguage: "en",
  dateCreated: "2017-05-28",
  dateModified: new Date().toISOString().split("T")[0],
  version: "2.0",
  educationalLevel: "Advanced",
  audience: {
    "@type": "Audience",
    audienceType: "Developers"
  },
  teaches: [
    "Color theory for syntax highlighting",
    "Accessibility guidelines for themes",
    "Implementation standards for code editors",
    "UI design principles for developer tools"
  ],
  mentions: [
    {
      "@type": "SoftwareApplication",
      name: "TextMate",
      description: "Scoping conventions reference"
    },
    {
      "@type": "WebAPI",
      name: "WCAG 2.1",
      description: "Web Content Accessibility Guidelines"
    }
  ],
  hasPart: [
    {
      "@type": "Article",
      name: "Color Palette",
      description: "Complete HEX, RGB, and HSL values for all theme colors.",
      about: "Color specifications"
    },
    {
      "@type": "Article",
      name: "Syntax Highlighting Rules",
      description: "Token classification and color mapping guidelines.",
      about: "Syntax highlighting implementation"
    },
    {
      "@type": "Article",
      name: "Implementation Guidelines",
      description: "Accessibility standards and consistency requirements.",
      about: "Development standards"
    },
    {
      "@type": "Article",
      name: "UI Design Guidelines",
      description: "Visual hierarchy and component design principles.",
      about: "User interface design"
    }
  ],
  citation: {
    "@type": "CreativeWork",
    name: "Original Dracula Theme Specification",
    author: {
      "@type": "Person",
      name: "Derek Sifford"
    },
    dateCreated: "2017-05-28"
  },
  isBasedOn: {
    "@type": "SoftwareApplication",
    name: "Dracula Theme",
    url: "https://draculatheme.com"
  },
  license: "https://github.com/dracula/dracula-theme/blob/main/LICENSE",
  isPartOf: {
    "@type": "WebSite",
    name: "Dracula Theme",
    url: "https://draculatheme.com"
  },
  potentialAction: [
    {
      "@type": "ReadAction",
      name: "Read Specification",
      target: "https://draculatheme.com/spec"
    },
    {
      "@type": "UseAction",
      name: "Implement Dracula Theme",
      description:
        "Use this specification to create Dracula theme implementations",
      target: "https://github.com/dracula/template"
    }
  ]
};
