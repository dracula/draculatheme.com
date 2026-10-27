import "./page.css";

import type { Metadata } from "next";
import { Grenze_Gotisch } from "next/font/google";

import { FallingLeaves } from "@/components/halloween/falling-leaves";
import { LightSquircle } from "@/components/halloween/light-squircle";
import { Noise } from "@/components/halloween/noise";
import { TeaserGate } from "@/components/halloween/teaser-gate";
import { jsonLd } from "@/lib/json-ld/halloween-teaser";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";
import { createMetadata } from "@/utils/metadata";

const title = "Draculaween";
const description =
  "Something wicked is stirring in the shadows. Count down to Draculaween, a Halloween surprise from Dracula arriving October 27, 2026.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  canonicalPath: "/halloween/teaser"
});

const structuredDataScriptId = createStructuredDataScriptId(
  "halloween",
  "teaser",
  "structured",
  "data"
);

const grenzeGotisch = Grenze_Gotisch({
  weight: "400",
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-grenze-gotisch",
  display: "swap"
});

const HalloweenTeaserPage = () => (
  <>
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
        <TeaserGate />
      </div>
      <FallingLeaves />
      <Noise />
    </section>
    <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
  </>
);

export default HalloweenTeaserPage;
