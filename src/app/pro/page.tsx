import "./page.css";

import { countries } from "countries-list";
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
import type { Review } from "@/lib/types";
import { fetcher } from "@/utils/fetcher";

interface PurchasingPowerParityData {
  country?: string;
  discount?: number;
}

interface SalesData {
  count?: number;
}

interface Promotion {
  name: string;
  originalPrice: number;
  finalPrice: number;
  purchaseUrl: string;
  discountPercentage: number;
}

const pricingConfiguration = {
  standardPrice: 99,
  currentPromotionalPrice: 79,
  gumroadBaseUrl: "https://draculatheme.gumroad.com/l/dracula-pro"
} as const;

const calculateDiscountedPrice = (
  originalPrice: number,
  discountPercentage: number
): number => {
  return Number((originalPrice * (1 - discountPercentage / 100)).toFixed(2));
};

const calculateDiscountPercentage = (
  originalPrice: number,
  finalPrice: number
): number => {
  return ((originalPrice - finalPrice) / originalPrice) * 100;
};

const createStandardPromotion = (): Promotion => ({
  name: `${new Date().toLocaleString("default", { month: "long" })} Promotion`,
  originalPrice: pricingConfiguration.standardPrice,
  finalPrice: pricingConfiguration.currentPromotionalPrice,
  purchaseUrl: `${pricingConfiguration.gumroadBaseUrl}?wanted=true`,
  discountPercentage: calculateDiscountPercentage(
    pricingConfiguration.standardPrice,
    pricingConfiguration.currentPromotionalPrice
  )
});

const generatePppCode = (country: string, discount: number): string => {
  const currentYear = String(new Date().getFullYear()).slice(-2);
  return `PPP${currentYear}${country}${discount}`;
};

const createPurchasingPowerParityPromotion = (
  purchasingPowerParityData: PurchasingPowerParityData
): Promotion | null => {
  if (
    !purchasingPowerParityData.country ||
    !purchasingPowerParityData.discount
  ) {
    return null;
  }

  const countryName =
    countries[purchasingPowerParityData.country as keyof typeof countries]
      ?.name;
  if (!countryName) {
    return null;
  }

  const finalPrice = calculateDiscountedPrice(
    pricingConfiguration.currentPromotionalPrice,
    purchasingPowerParityData.discount
  );

  const pppCode = generatePppCode(
    purchasingPowerParityData.country,
    purchasingPowerParityData.discount
  );

  return {
    name: `${countryName} Promo`,
    originalPrice: pricingConfiguration.currentPromotionalPrice,
    finalPrice: finalPrice,
    purchaseUrl: `${pricingConfiguration.gumroadBaseUrl}?discount=${pppCode}&wanted=true`,
    discountPercentage: purchasingPowerParityData.discount
  };
};

const selectBestPromotion = (promotions: Promotion[]): Promotion => {
  return promotions.reduce((bestPromotion, currentPromotion) => {
    const currentEffectiveDiscount = calculateDiscountPercentage(
      currentPromotion.originalPrice,
      currentPromotion.finalPrice
    );
    const bestEffectiveDiscount = calculateDiscountPercentage(
      bestPromotion.originalPrice,
      bestPromotion.finalPrice
    );

    return currentEffectiveDiscount > bestEffectiveDiscount
      ? currentPromotion
      : bestPromotion;
  });
};

export const metadata: Metadata = {
  title: "Be more productive with Dracula Pro",
  description:
    "Dracula Pro is a color scheme and UI theme tailored for programming. Designed to be aesthetically pleasing while keeping you focused.",
  alternates: {
    canonical: "/pro"
  }
};

const ProPage = async () => {
  const [purchasingPowerParityData, salesData, reviewsData] = await Promise.all(
    [
      fetcher(
        "https://ppp.dracula.workers.dev",
        "GET",
        {},
        ""
      ) as Promise<PurchasingPowerParityData>,
      fetcher("/api/sales?product=tPfIDt") as Promise<SalesData>,
      fetcher("/api/reviews") as Promise<Review[] | Record<string, Review>>
    ]
  );

  const availablePromotions = [createStandardPromotion()];
  const purchasingPowerParityPromotion = createPurchasingPowerParityPromotion(
    purchasingPowerParityData
  );

  if (purchasingPowerParityPromotion) {
    availablePromotions.push(purchasingPowerParityPromotion);
  }

  const bestAvailablePromotion = selectBestPromotion(availablePromotions);

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
        {purchasingPowerParityData.discount &&
          purchasingPowerParityData.country && (
            <PPPBanner
              country={purchasingPowerParityData.country}
              discount={purchasingPowerParityData.discount}
              pppCode={generatePppCode(
                purchasingPowerParityData.country,
                purchasingPowerParityData.discount
              )}
            />
          )}
        <PricingCard
          activePromotion={bestAvailablePromotion}
          salesData={salesData}
        />
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
