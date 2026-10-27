"use client";

import { Countdown } from "@/components/halloween/countdown";
import { useCountdown } from "@/hooks/use-countdown";
import { halloweenSaleEndsAt } from "@/lib/halloween";

export const SaleOffer = () => {
  const { hasEnded } = useCountdown(halloweenSaleEndsAt);

  if (hasEnded) {
    return <p className="ended">Sunrise has come.</p>;
  }

  return (
    <div className="offer">
      <div className="details">
        <span>
          $99 → <em>$49</em> Until Sunrise
        </span>
        <span>Saturday, November 21, 2026</span>
      </div>
      <Countdown
        target={halloweenSaleEndsAt}
        label="Time remaining until sunrise"
        ended={null}
      />
    </div>
  );
};
