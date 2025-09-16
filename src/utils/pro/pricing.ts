import { countries } from "countries-list";

export type PurchasingPowerParityData = {
  country?: string;
  discount?: number;
};

export type Promotion = {
  name: string;
  originalPrice: number;
  finalPrice: number;
  purchaseUrl: string;
  discountPercentage: number;
  code?: string;
};

export const pricing = {
  listPrice: 99,
  promoPrice: 79,
  gumroadBaseUrl: "https://gumroad.com/checkout?product=tPfIDt"
};

const discountedPrice = (price: number, percent: number) =>
  Number((price * (1 - percent / 100)).toFixed(2));

export const buildPppCode = (
  country: string,
  discount: number,
  now = new Date()
) => `PPP${String(now.getFullYear()).slice(-2)}${country}${discount}`;

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
    originalPrice: pricing.listPrice,
    finalPrice: pricing.promoPrice,
    purchaseUrl: `${pricing.gumroadBaseUrl}&wanted=true`,
    discountPercentage
  };
};

const pppPromotion = (ppp: PurchasingPowerParityData): Promotion | null => {
  const country = ppp?.country;
  const discount = typeof ppp?.discount === "number" ? ppp.discount : undefined;

  if (!country || !discount || discount <= 0) {
    return null;
  }

  const price = discountedPrice(pricing.promoPrice, discount);
  const code = buildPppCode(country, discount);

  return {
    name: `${countryNameFromCode(country)} Promo`,
    originalPrice: pricing.promoPrice,
    finalPrice: price,
    purchaseUrl: `${pricing.gumroadBaseUrl}&code=${code}`,
    discountPercentage: discount,
    code
  };
};

const bestPromotion = (promos: Promotion[]) =>
  promos.reduce((a, b) => (b.finalPrice < a.finalPrice ? b : a));

export const resolveCheckout = (ppp: PurchasingPowerParityData) => {
  const base = standardPromotion();
  const pppPromo = pppPromotion(ppp);
  const options = pppPromo ? [base, pppPromo] : [base];
  const activePromotion = bestPromotion(options);

  const pppBanner =
    pppPromo && pppPromo.discountPercentage > 0 && pppPromo.code
      ? {
          country: ppp?.country as string,
          discount: pppPromo.discountPercentage,
          code: pppPromo.code
        }
      : null;

  return { activePromotion, pppBanner };
};
