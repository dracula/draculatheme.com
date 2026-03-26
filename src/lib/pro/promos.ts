import {
  calculateDiscountedPrice,
  getBasePriceValue,
  pricing
} from "./pricing";
import promosData from "./promos.json";

export { calculateDiscountedPrice, pricing };

type PromoConfig = {
  name: string;
  displayName: string;
  announcementText: string;
  discountPercentage: number;
  couponCode?: string;
  /**
   * When omitted, the Gumroad URL is derived from `couponCode` when present,
   * otherwise the default checkout URL is used.
   */
  purchaseUrl?: string;
  basePrice: "listPrice" | "promoPrice";
  startDate: string;
  endDate: string;
};

type PromosConfig = {
  promos: PromoConfig[];
  defaultPromo: {
    discountPercentage: number;
    basePrice: "listPrice" | "promoPrice";
  };
};

/** Offer surfaced by pricing components and passed into checkout links. */
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

const isPromoActive = (startDate: string, endDate: string): boolean => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return now >= start && now <= end;
};

const generatePurchaseUrl = (couponCode?: string): string => {
  if (couponCode) {
    return `https://draculatheme.gumroad.com/l/dracula-pro/${couponCode}`;
  }
  return `${pricing.gumroadBaseUrl}&wanted=true`;
};

const createPromotionFromConfig = (config: PromoConfig): Promotion => {
  const basePrice = getBasePriceValue(config.basePrice);
  const finalPrice = calculateDiscountedPrice(
    basePrice,
    config.discountPercentage
  );

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

const getActivePromo = (): PromoConfig | null => {
  return (
    promosConfig.promos.find((promo) =>
      isPromoActive(promo.startDate, promo.endDate)
    ) || null
  );
};

const getActivePromotion = (): Promotion | null => {
  const activePromo = getActivePromo();
  return activePromo ? createPromotionFromConfig(activePromo) : null;
};

/**
 * Returns the promo row matching the current date window, or `null` when none apply.
 * Shapes announcement bar messaging.
 */
export const getActiveAnnouncement = (): PromoConfig | null => {
  return getActivePromo();
};

const getDefaultPromoConfig = () => {
  return promosConfig.defaultPromo;
};

const getDefaultPromotion = (): Promotion => {
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

/**
 * Promotion used for standard checkout: active dated campaign when valid,
 * otherwise the generated monthly default offer.
 */
export const getStandardPromotion = (): Promotion => {
  return getActivePromotion() || getDefaultPromotion();
};
