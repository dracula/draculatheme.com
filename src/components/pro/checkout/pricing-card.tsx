"use client";

import { countries } from "countries-list";
import Image from "next/image";
import { useState } from "react";

import { TickIcon } from "@/icons/tick";
import { apps } from "@/lib/pro/apps";

interface Promotion {
  name: string;
  displayName: string;
  originalPrice: number;
  finalPrice: number;
  purchaseUrl: string;
  discountPercentage: number;
  couponCode?: string;
  country?: string;
}

interface SalesData {
  count?: number;
}

interface PricingCardProps {
  standardPromotion: Promotion;
  pppPromotion: Promotion | null;
  salesData: SalesData;
}

const productFeatures = [
  `${Object.keys(apps).length + 1} Themes`,
  "6 Variants",
  "4 Hand-picked Fonts",
  "1 Productivity E-book",
  "1 Bonus Screencast",
  "Design Files",
  "Wallpapers",
  "Constant updates",
  "Support included",
  "Discord Community",
  "License for 3 computers"
] as const;

const formatPriceDisplay = (price: number): string => {
  return `$${price.toFixed(0)}`;
};

const formatSalesCount = (count?: number): string => {
  if (!count) {
    return "6,000";
  }

  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
};

export const PricingCard = ({
  standardPromotion,
  pppPromotion,
  salesData
}: PricingCardProps) => {
  const [pppEnabled, setPppEnabled] = useState(false);

  const activePromotion =
    pppEnabled && pppPromotion ? pppPromotion : standardPromotion;

  const countryCode = pppPromotion?.country as keyof typeof countries;
  const countryName = countries[countryCode]?.name || "Unknown";

  return (
    <div id="pricing">
      <div className="header">
        <h3>Become a Vampire</h3>
        <p>
          Join {formatSalesCount(salesData?.count)} developers using Dracula Pro
          every day.
        </p>
      </div>
      <div className="wrapper">
        <div className="price">
          <span>{activePromotion.displayName}</span>
          <h3 className="base">
            {formatPriceDisplay(activePromotion.originalPrice)}
          </h3>
          <h3 className="promo">
            {formatPriceDisplay(activePromotion.finalPrice)}
          </h3>
        </div>
        <span className="one-time">One-time payment!</span>
        <ul className="features">
          {productFeatures.map((feature) => (
            <li key={feature}>
              <TickIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <a href={activePromotion.purchaseUrl} className="action primary">
          Buy Dracula Pro
        </a>
        {pppPromotion && (
          <div className="ppp-banner">
            <p>
              We noticed you&apos;re from{" "}
              <Image
                src={`/images/flags/${pppPromotion.country}.svg`}
                alt={countryName}
                width={16}
                height={16}
                className="flag"
              />
              .
            </p>
            <p>
              We offer regional pricing <em>for those who need it.</em>
            </p>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={pppEnabled}
                onChange={(e) => setPppEnabled(e.target.checked)}
              />
              <span>
                <b>Apply discount</b>
              </span>
            </label>
          </div>
        )}
      </div>
      <div className="info">
        <p>30 days refund (no Q/A)</p>
        <p>Support response time: up to 5 business days.</p>
        <p>
          <a href="mailto:support@draculatheme.com">Contact us</a> to get a{" "}
          <em>Team License</em> to share with your team.
        </p>
      </div>
    </div>
  );
};
