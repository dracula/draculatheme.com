import { countries } from "countries-list";

export type PurchasingPowerParityData = {
  country?: string;
  discount?: number;
  couponCode?: string;
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

export const pricing = {
  listPrice: 99,
  promoPrice: 79,
  gumroadBaseUrl: "https://gumroad.com/checkout?product=tPfIDt"
};

const discountedPrice = (price: number, percent: number) =>
  Number((price * (1 - percent / 100)).toFixed(2));

const countryNameFromCode = (code: string) => {
  const key = code.toUpperCase() as keyof typeof countries;
  return countries[key]?.name || null;
};

const standardPromotion = (): Promotion => {
  const month = new Date().toLocaleString("default", { month: "long" });
  const discountPercentage = Number(
    (
      ((pricing.listPrice - pricing.promoPrice) / pricing.listPrice) *
      100
    ).toFixed(0)
  );

  return {
    name: `${month} Promo`,
    displayName: `${discountPercentage}% off with ${month} Promo!`,
    originalPrice: pricing.listPrice,
    finalPrice: pricing.promoPrice,
    purchaseUrl: `${pricing.gumroadBaseUrl}&wanted=true`,
    discountPercentage
  };
};

const pppPromotion = (ppp: PurchasingPowerParityData): Promotion | null => {
  const country = ppp?.country;
  const discount = typeof ppp?.discount === "number" ? ppp.discount : undefined;
  const couponCode = ppp?.couponCode;

  if (!country || !discount || discount <= 0 || !couponCode) {
    return null;
  }

  const price = discountedPrice(pricing.promoPrice, discount);
  const countryDisplayName = countryNameFromCode(country);

  return {
    name: `${countryDisplayName} Promo`,
    displayName: `${discount}% off with Regional Pricing!`,
    originalPrice: pricing.promoPrice,
    finalPrice: price,
    purchaseUrl: `${pricing.gumroadBaseUrl}&code=${couponCode}`,
    discountPercentage: discount,
    couponCode,
    country
  };
};

export const resolveCheckout = (ppp: PurchasingPowerParityData) => {
  const base = standardPromotion();
  const pppPromo = pppPromotion(ppp);

  return {
    standardPromotion: base,
    pppPromotion: pppPromo
  };
};
