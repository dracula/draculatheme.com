import { countries } from "countries-list";

import {
  calculateDiscountedPrice,
  getStandardPromotion,
  pricing,
  type Promotion
} from "@/lib/pro/promos";

export type PurchasingPowerParityData = {
  country?: string;
  discount?: number;
  couponCode?: string;
};

// Re-export for backward compatibility
export type { Promotion };

export { pricing };

// Get country name from country code
const getCountryName = (code: string): string | null => {
  const key = code.toUpperCase() as keyof typeof countries;
  return countries[key]?.name || null;
};

// Create PPP (Purchasing Power Parity) promotion
export const createPppPromotion = (
  ppp: PurchasingPowerParityData
): Promotion | null => {
  const { country, discount, couponCode } = ppp;

  // Validate PPP data
  if (!country || !discount || discount <= 0 || !couponCode) {
    return null;
  }

  const basePrice = pricing.promoPrice;
  const finalPrice = calculateDiscountedPrice(basePrice, discount);
  const countryName = getCountryName(country);

  return {
    name: `${countryName} Promo`,
    displayName: `${discount}% off with Regional Pricing!`,
    originalPrice: basePrice,
    finalPrice,
    purchaseUrl: `${pricing.gumroadBaseUrl}&code=${couponCode}`,
    discountPercentage: discount,
    couponCode,
    country
  };
};

// Resolve checkout promotions (standard + PPP)
export const resolveCheckout = (ppp: PurchasingPowerParityData) => {
  return {
    standardPromotion: getStandardPromotion(),
    pppPromotion: createPppPromotion(ppp)
  };
};
