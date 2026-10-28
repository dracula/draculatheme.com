"use client";

import Link from "next/link";

import { Countdown } from "@/components/halloween/countdown";
import { NewsletterForm } from "@/components/halloween/newsletter-form";
import { useCountdown } from "@/hooks/use-countdown";
import { halloweenTeaserEndsAt } from "@/lib/halloween";

export const TeaserGate = () => {
  const { hasEnded } = useCountdown(halloweenTeaserEndsAt);

  return (
    <>
      <div className="header">
        <h1 id="draculaween-title">Draculaween</h1>
        {hasEnded ? (
          <p className="arrived">The veil is open.</p>
        ) : (
          <Countdown target={halloweenTeaserEndsAt} />
        )}
      </div>
      {hasEnded ? (
        <Link className="enter" href="/halloween">
          Meet Nosferatu
        </Link>
      ) : (
        <NewsletterForm />
      )}
    </>
  );
};
