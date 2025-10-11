"use client";

import useSWR from "swr";

import { fetcher } from "@/utils/fetcher";
import type { PurchasingPowerParityData } from "@/utils/pro/pricing";
import { resolveCheckout } from "@/utils/pro/pricing";

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

  if (!salesData) {
    return null;
  }

  const { standardPromotion, pppPromotion } = resolveCheckout(pppData || {});

  return (
    <>
      {standardPromotion && (
        <PricingCard
          standardPromotion={standardPromotion}
          pppPromotion={pppPromotion}
          salesData={salesData}
        />
      )}
    </>
  );
};
