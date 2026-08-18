"use client";

import useSWR from "swr";

import type { Sales } from "@/lib/types";
import type { PurchasingPowerParityData } from "@/utils/pro/pricing";
import { resolveCheckout } from "@/utils/pro/pricing";

import { PricingCard } from "./pricing-card";

const pppFetcher = (url: string) =>
  fetch(url, { cache: "no-store", credentials: "omit" }).then((res) =>
    res.json()
  );

const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false
};

export const Checkout = ({ salesData }: { salesData: Sales }) => {
  const { data: pppData } = useSWR<PurchasingPowerParityData>(
    "https://ppp.dracula.workers.dev",
    pppFetcher,
    swrConfig
  );

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
