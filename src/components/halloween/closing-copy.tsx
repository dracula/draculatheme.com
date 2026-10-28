"use client";

import Link from "next/link";

import { useCountdown } from "@/hooks/use-countdown";
import { TombstoneIcon } from "@/icons/tombstone";
import { halloweenSaleEndsAt } from "@/lib/halloween";

export const ClosingCopy = () => {
  const { hasEnded } = useCountdown(halloweenSaleEndsAt);

  return (
    <>
      <span className="eyebrow">
        {hasEnded ? "The eighth variant" : "Until sunrise"}
      </span>
      <h2 id="closing-title">
        One-time payment.
        <br />
        Yours forever.
      </h2>
      <p>
        Nosferatu ships with Dracula Pro — every variant, every update,{" "}
        <em>no subscription</em>.
      </p>
      {!hasEnded && (
        <p className="price">
          <span className="original">
            <span className="sr-only">Original price</span>
            $99
          </span>
          <span className="current">
            <span className="sr-only">Sale price</span>
            $49
          </span>
        </p>
      )}
      <Link className="action primary" href="/pro#pricing">
        <TombstoneIcon />
        <span>Get Dracula Pro</span>
      </Link>
    </>
  );
};
