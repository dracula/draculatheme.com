/**
 * Base list and promo prices for Dracula Pro plus helpers for coupon math.
 */

export const pricing = {
  listPrice: 99,
  promoPrice: 79,
  gumroadBaseUrl: "https://gumroad.com/checkout?product=tPfIDt"
} as const;

/**
 * @param basePrice Price before discount
 * @param discountPercentage Whole-number percent off (for example `20` for 20%)
 */
export const calculateDiscountedPrice = (
  basePrice: number,
  discountPercentage: number
): number => {
  return Number((basePrice * (1 - discountPercentage / 100)).toFixed(2));
};

/** Reads either catalog list or promotional base price. */
export const getBasePriceValue = (
  basePriceKey: "listPrice" | "promoPrice"
): number => {
  return pricing[basePriceKey];
};
