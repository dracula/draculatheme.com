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
import { frequentlyAskedQuestions } from "@/lib/pro/faqs";
import { shuffleReviews } from "@/lib/pro/shuffle-reviews";
import type { Review } from "@/lib/types";
import { fetcher } from "@/utils/fetcher";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";
import { createMetadata } from "@/utils/metadata";

const title = "Be more productive with Dracula Pro";
const description =
  "Dracula Pro is a color scheme and UI theme designed for your workflow. It looks great and helps you stay focused.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  canonicalPath: "/pro"
});

const structuredDataScriptId = createStructuredDataScriptId(
  "pro",
  "structured",
  "data"
);

const isReview = (value: unknown): value is Review => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const review = value as Record<string, unknown>;

  return (
    typeof review.id === "string" &&
    typeof review.name === "string" &&
    typeof review.body === "string" &&
    typeof review.country === "string" &&
    typeof review.github === "string" &&
    typeof review.date === "string"
  );
};

const ProPage = async () => {
  const reviewsResponse = await fetcher("/api/reviews");
  const normalizedReviews = (
    Array.isArray(reviewsResponse)
      ? reviewsResponse
      : Object.values(reviewsResponse)
  ).filter(isReview);

  const identifiedReviews = normalizedReviews.filter((review) =>
    Boolean(review.name.trim() || review.country.trim())
  );
  const shuffledDisplayReviews = shuffleReviews(identifiedReviews);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Dracula Pro",
    alternateName: "Dracula Pro",
    description:
      "Dracula Pro is a color scheme and UI theme designed for your workflow. It looks great and helps you stay focused.",
    url: "https://draculatheme.com/pro",
    image: [
      "https://draculatheme.com/images/pro/vscode/1.webp",
      "https://draculatheme.com/images/pro/zed/1.webp",
      "https://draculatheme.com/images/pro/hyper/1.webp"
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
        <Testimonials reviews={shuffledDisplayReviews} />
        <Checkout />
        <div
          id="frequently-asked-questions"
          className="frequently-asked-questions"
        >
          <h3>Frequently asked questions</h3>
          <ul>
            {frequentlyAskedQuestions.map((questionItem) => (
              <li key={questionItem.question}>
                <Disclosure
                  question={questionItem.question}
                  answer={questionItem.answer}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
    </>
  );
};

export default ProPage;
