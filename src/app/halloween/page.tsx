import "./page.css";

import type { Metadata } from "next";
import { Grenze_Gotisch } from "next/font/google";

import { Countdown } from "@/components/halloween/countdown";
import { FallingLeaves } from "@/components/halloween/falling-leaves";
import { LightSquircle } from "@/components/halloween/light-squircle";
import { NewsletterForm } from "@/components/halloween/newsletter-form";
import { Noise } from "@/components/halloween/noise";
import { createMetadata } from "@/utils/metadata";

const title = "Draculaween - A Halloween surprise from Dracula";
const description =
  "Something wicked is stirring in the shadows. Count down to Draculaween, a mysterious Halloween surprise from Dracula arriving October 28, 2026.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  canonicalPath: "/halloween"
});

const grenzeGotisch = Grenze_Gotisch({
  weight: "400",
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-grenze-gotisch",
  display: "swap"
});

const HalloweenPage = () => (
  <section
    className={`${grenzeGotisch.variable} halloween`}
    aria-labelledby="draculaween-title"
  >
    <LightSquircle />
    <div className="holder">
      <div className="candle">
        <div className="blinking-glow" />
        <div className="thread" />
        <div className="glow" />
        <div className="flame" />
      </div>
    </div>
    <div className="container">
      <div className="header">
        <h1 id="draculaween-title">Draculaween</h1>
        <Countdown target="2026-10-28T23:59:59Z" />
      </div>
      <NewsletterForm />
    </div>
    <FallingLeaves />
    <Noise />
  </section>
);

export default HalloweenPage;
