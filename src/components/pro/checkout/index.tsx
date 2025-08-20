"use client";

import useSWR from "swr";

import type { PurchasingPowerParityData } from "@/lib/pro/pricing";
import { resolveCheckout } from "@/lib/pro/pricing";
import { fetcher } from "@/utils/fetcher";

import { PPPBanner } from "./ppp";
import { PricingCard } from "./pricing-card";

interface SalesData {
  count?: number;
}

const pppFetcher = (url: string) =>
  fetch(url, { cache: "no-store", credentials: "omit" }).then((res) =>
    res.json()
  );

const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false
};

export const Checkout = () => {
  const { data: pppData } = useSWR<PurchasingPowerParityData>(
    "https://ppp.dracula.workers.dev",
    pppFetcher,
    swrConfig
  );
  const { data: salesData } = useSWR<SalesData>(
    "/api/sales?product=tPfIDt",
    fetcher,
    swrConfig
  );

  if (!salesData) return null;

  const { activePromotion, pppBanner } = resolveCheckout(pppData || {});

  return (
    <>
      {pppBanner && (
        <PPPBanner
          country={pppBanner.country}
          discount={pppBanner.discount}
          pppCode={pppBanner.code}
        />
      )}
      {activePromotion && (
        <PricingCard activePromotion={activePromotion} salesData={salesData} />
      )}
    </>
  );
};
