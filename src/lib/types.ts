import type { paths } from "./paths";

export type Props<T = Record<string, string>> = { params: Promise<T> };

export type Path = {
  repo: string;
  title: string;
  icon: string;
  platform?: string[];
  synonyms?: string[];
  categories: string[];
  legacyViews?: number;
  views?: number;
};

export type PathItem = (typeof paths)[number];

export type ProductVariantOption = {
  name: string;
  price_difference: number;
  is_pay_what_you_want: boolean;
  recurrence_prices?: string;
  url?: string;
};

export type ProductVariant = {
  title: string;
  options: ProductVariantOption[];
};

export type Product = {
  id: string;
  name: string;
  preview_url: string;
  description: string;
  customizable_price: boolean;
  require_shipping: boolean;
  currency: string;
  custom_delivery_url?: string;
  custom_fields: string[];
  custom_permalink: string;
  custom_receipt: string;
  custom_summary: string;
  deleted: boolean;
  file_info: object;
  formatted_price: string;
  is_tiered_membership: boolean;
  max_purchase_count?: number;
  price: number;
  published: boolean;
  recurrences?: string[];
  sales_count: number;
  sales_usd_cents: number;
  short_url: string;
  status: number;
  subscription_duration?: string;
  tags: string[];
  thumbnail_url: string;
  url?: string;
  variants: ProductVariant[];
};
