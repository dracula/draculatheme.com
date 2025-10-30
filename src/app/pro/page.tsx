import "./page.css";

import type { Metadata } from "next";

import { Bento } from "@/components/pro/bento";
import { Book } from "@/components/pro/book";
import { Checkout } from "@/components/pro/checkout";
import { Description } from "@/components/pro/description";
import { LightVariant } from "@/components/pro/light-variant";
import { Testimonials } from "@/components/pro/testimonials";
import { UsedBy } from "@/components/pro/used-by";
import { VariantsShowcase } from "@/components/pro/variants-showcase";
import { WhyPro } from "@/components/pro/why-pro";
import { Disclosure } from "@/components/shared/disclosure";
import { Hero } from "@/components/shared/hero";
import { faqs } from "@/lib/pro/faqs";
import type { Review } from "@/lib/types";
import { fetcher } from "@/utils/fetcher";

export const metadata: Metadata = {
  title: "Be more productive with Dracula Pro",
  description:
    "Dracula Pro is a color scheme and UI theme designed for your workflow. Created to be aesthetically pleasing while keeping you focused.",
  alternates: { canonical: "/pro" }
};

const ProPage = async () => {
  const reviewsData = (await fetcher("/api/reviews")) as
    | Review[]
    | Record<string, Review>;

  const normalizedReviews = Array.isArray(reviewsData)
    ? reviewsData
    : Object.values(reviewsData);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Dracula Pro",
    alternateName: "Dracula Pro",
    description:
      "Dracula Pro is a color scheme and UI theme designed for your workflow. Created to be aesthetically pleasing while keeping you focused.",
    url: "https://draculatheme.com/pro",
    image: [
      "https://draculatheme.com/images/pro/vscode/1.png",
      "https://draculatheme.com/images/pro/zed/1.png",
      "https://draculatheme.com/images/pro/hyper/1.png"
    ],
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
    offers: {
      "@type": "Offer",
      name: "Dracula Pro License",
      price: "70",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2025-12-31",
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
    },
    audience: {
      "@type": "Audience",
      audienceType: [
        "Software Engineers",
        "Developers",
        "Designers",
        "Programmers"
      ]
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: normalizedReviews.length,
      bestRating: "5",
      worstRating: "1"
    },
    review: normalizedReviews.slice(0, 10).map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.name
      },
      reviewBody: review.body,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5"
      },
      datePublished: review.date
    })),
    potentialAction: [
      {
        "@type": "BuyAction",
        name: "Purchase Dracula Pro",
        target: "https://draculatheme.com/pro#pricing"
      },
      {
        "@type": "ViewAction",
        name: "Preview Themes",
        target: "https://draculatheme.com/pro"
      }
    ]
  };

  return (
    <>
      <Hero />
      <section className="container pro">
        <Description />
        <UsedBy />
        <VariantsShowcase />
        <WhyPro />
        <LightVariant />
        <Bento />
        <Book />
        <Testimonials reviews={reviewsData} />
        <Checkout />
        <div id="faqs" className="faqs">
          <h3>Frequently Asked Questions</h3>
          <ul>
            {faqs.map((faq) => (
              <li key={faq.question}>
                <Disclosure question={faq.question} answer={faq.answer} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default ProPage;
