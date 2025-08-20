import "./page.css";

import type { Metadata } from "next";

import { Bento } from "@/components/pro/bento";
import { Book } from "@/components/pro/book";
import { Description } from "@/components/pro/description";
import { LightVariant } from "@/components/pro/light-variant";
import { PPPBanner } from "@/components/pro/ppp";
import { PricingCard } from "@/components/pro/pricing-card";
import { Testimonials } from "@/components/pro/testimonials";
import { UsedBy } from "@/components/pro/used-by";
import { VariantsShowcase } from "@/components/pro/variants-showcase";
import { WhyPro } from "@/components/pro/why-pro";
import { Disclosure } from "@/components/shared/disclosure";
import { Hero } from "@/components/shared/hero";
import { faqs } from "@/lib/pro/faqs";
import type { PurchasingPowerParityData } from "@/lib/pro/pricing";
import { resolveCheckout } from "@/lib/pro/pricing";
import type { Review } from "@/lib/types";
import { fetcher } from "@/utils/fetcher";

interface SalesData {
  count?: number;
}

export const metadata: Metadata = {
  title: "Be more productive with Dracula Pro",
  description:
    "Dracula Pro is a color scheme and UI theme tailored for programming. Designed to be aesthetically pleasing while keeping you focused.",
  alternates: { canonical: "/pro" }
};

const ProPage = async () => {
  const [pppData, salesData, reviewsData] = await Promise.all([
    fetcher(
      "https://ppp.dracula.workers.dev",
      "GET",
      {},
      ""
    ) as Promise<PurchasingPowerParityData>,
    fetcher("/api/sales?product=tPfIDt") as Promise<SalesData>,
    fetcher("/api/reviews") as Promise<Review[] | Record<string, Review>>
  ]);

  const { activePromotion, pppBanner } = resolveCheckout(pppData);

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
        {pppBanner && (
          <PPPBanner
            country={pppBanner.country}
            discount={pppBanner.discount}
            pppCode={pppBanner.code}
          />
        )}
        <PricingCard activePromotion={activePromotion} salesData={salesData} />
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
    </>
  );
};

export default ProPage;
