import {
  calculateDiscountedPrice,
  getBasePriceValue,
  pricing
} from "./pricing";
import promosData from "./promos.json";

// Re-export pricing utilities for convenience
export { calculateDiscountedPrice, pricing };

export type PromoConfig = {
  name: string;
  displayName: string;
  announcementText: string;
  discountPercentage: number;
  couponCode?: string;
  purchaseUrl?: string; // Optional - auto-generated from couponCode if not provided
  basePrice: "listPrice" | "promoPrice";
  startDate: string;
  endDate: string;
};

export type PromosConfig = {
  promos: PromoConfig[];
  defaultPromo: {
    discountPercentage: number;
    basePrice: "listPrice" | "promoPrice";
  };
};

export type Promotion = {
  name: string;
  displayName: string;
  originalPrice: number;
  finalPrice: number;
  purchaseUrl: string;
  discountPercentage: number;
  couponCode?: string;
  country?: string;
};

const promosConfig = promosData as PromosConfig;

// Check if a date is within the promo date range
const isPromoActive = (startDate: string, endDate: string): boolean => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return now >= start && now <= end;
};

// Generate purchase URL from coupon code using the standard pattern
const generatePurchaseUrl = (couponCode?: string): string => {
  if (couponCode) {
    return `https://draculatheme.gumroad.com/l/dracula-pro/${couponCode}`;
  }
  return `${pricing.gumroadBaseUrl}&wanted=true`;
};

// Convert promo config to promotion object
const createPromotionFromConfig = (config: PromoConfig): Promotion => {
  const basePrice = getBasePriceValue(config.basePrice);
  const finalPrice = calculateDiscountedPrice(
    basePrice,
    config.discountPercentage
  );

  // Use provided purchaseUrl or auto-generate from couponCode
  const purchaseUrl =
    config.purchaseUrl || generatePurchaseUrl(config.couponCode);

  return {
    name: config.name,
    displayName: config.displayName,
    originalPrice: basePrice,
    finalPrice,
    purchaseUrl,
    discountPercentage: config.discountPercentage,
    couponCode: config.couponCode
  };
};

// Get the currently active promo based on date ranges
export const getActivePromo = (): PromoConfig | null => {
  return (
    promosConfig.promos.find((promo) =>
      isPromoActive(promo.startDate, promo.endDate)
    ) || null
  );
};

// Get active promotion (converted to Promotion type)
export const getActivePromotion = (): Promotion | null => {
  const activePromo = getActivePromo();
  return activePromo ? createPromotionFromConfig(activePromo) : null;
};

// Get announcement for the announcement bar
export const getActiveAnnouncement = (): PromoConfig | null => {
  return getActivePromo();
};

// Get default promo configuration
export const getDefaultPromoConfig = () => {
  return promosConfig.defaultPromo;
};

// Create default promotion (used when no active promo)
export const getDefaultPromotion = (): Promotion => {
  const defaultConfig = getDefaultPromoConfig();
  const basePrice = getBasePriceValue(defaultConfig.basePrice);
  const finalPrice = calculateDiscountedPrice(
    basePrice,
    defaultConfig.discountPercentage
  );

  const now = new Date();
  const monthName = now.toLocaleString("default", { month: "long" });

  return {
    name: `${monthName} Promo`,
    displayName: `${defaultConfig.discountPercentage}% off with ${monthName} Promo!`,
    originalPrice: basePrice,
    finalPrice,
    purchaseUrl: `${pricing.gumroadBaseUrl}&wanted=true`,
    discountPercentage: defaultConfig.discountPercentage
  };
};

// Get standard promotion (active promo or default)
export const getStandardPromotion = (): Promotion => {
  return getActivePromotion() || getDefaultPromotion();
};

// Get all configured promos
export const getAllPromos = () => {
  return promosConfig.promos;
};
