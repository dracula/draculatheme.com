// Base pricing configuration
export const pricing = {
  listPrice: 99,
  promoPrice: 79,
  gumroadBaseUrl: "https://gumroad.com/checkout?product=tPfIDt"
} as const;

// Calculate discounted price
export const calculateDiscountedPrice = (
  basePrice: number,
  discountPercentage: number
): number => {
  return Number((basePrice * (1 - discountPercentage / 100)).toFixed(2));
};

// Get base price value from string key
export const getBasePriceValue = (
  basePriceKey: "listPrice" | "promoPrice"
): number => {
  return pricing[basePriceKey];
};
