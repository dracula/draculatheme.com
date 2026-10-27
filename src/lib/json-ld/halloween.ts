import { hasHalloweenSaleEnded } from "@/lib/halloween";

const saleHasEnded = hasHalloweenSaleEnded();

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Nosferatu",
  description:
    "The eighth Dracula Pro variant. Bone white on coffin black, lit by lantern flame, moss, moonlight and dried blood.",
  url: "https://draculatheme.com/halloween",
  image: "https://draculatheme.com/images/hero/staircase.png",
  inLanguage: "en",
  datePublished: "2026-10-27",
  dateModified: new Date().toISOString().split("T")[0],
  isPartOf: {
    "@type": "WebSite",
    name: "Dracula Theme",
    url: "https://draculatheme.com"
  },
  about: {
    "@type": "Product",
    name: "Nosferatu",
    alternateName: "Dracula Pro Nosferatu",
    description:
      "The eighth Dracula Pro variant. Bone white on coffin black, lit by lantern flame, moss, moonlight and dried blood.",
    image: "https://draculatheme.com/images/hero/staircase.png",
    url: "https://draculatheme.com/halloween",
    brand: {
      "@type": "Brand",
      name: "Dracula Theme",
      url: "https://draculatheme.com",
      logo: {
        "@type": "ImageObject",
        url: "https://draculatheme.com/images/hero/default.svg"
      }
    },
    category: "Developer Tools",
    isRelatedTo: {
      "@type": "Product",
      name: "Dracula Pro",
      url: "https://draculatheme.com/pro"
    },
    offers: {
      "@type": "Offer",
      name: "Dracula Pro License",
      url: "https://draculatheme.com/pro#pricing",
      price: saleHasEnded ? "99" : "49",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      ...(saleHasEnded ? {} : { priceValidUntil: "2026-11-21" }),
      seller: {
        "@type": "Organization",
        name: "Dracula Theme",
        url: "https://draculatheme.com"
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn"
      }
    }
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
        name: "Nosferatu",
        item: "https://draculatheme.com/halloween"
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
  },
  potentialAction: [
    {
      "@type": "BuyAction",
      name: "Get Dracula Pro",
      target: "https://draculatheme.com/pro#pricing"
    },
    {
      "@type": "ViewAction",
      name: "Preview Nosferatu",
      target: "https://draculatheme.com/halloween#preview"
    }
  ]
};
