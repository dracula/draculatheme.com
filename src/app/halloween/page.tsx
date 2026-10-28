import "./page.css";

import type { Metadata } from "next";
import { Grenze_Gotisch } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { ClosingCopy } from "@/components/halloween/closing-copy";
import { CodePreview } from "@/components/halloween/code-preview";
import { Palette } from "@/components/halloween/palette";
import { SaleOffer } from "@/components/halloween/sale-offer";
import { TombstoneIcon } from "@/icons/tombstone";
import { jsonLd } from "@/lib/json-ld/halloween";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";
import { createMetadata } from "@/utils/metadata";

const title = "Nosferatu";
const description =
  "The eighth Dracula Pro variant. Bone white on coffin black, lit by lantern flame, moss, moonlight and dried blood.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  canonicalPath: "/halloween"
});

const structuredDataScriptId = createStructuredDataScriptId(
  "halloween",
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

const HalloweenPage = () => (
  <>
    <div className={`${grenzeGotisch.variable} halloween`}>
      <section className="container opening">
        <div className="copy">
          <span className="eyebrow">
            <span className="pulse" aria-hidden />
            The Eighth Variant
          </span>
          <h1>Nosferatu</h1>
          <p>
            Dracula, seen by candlelight. <em className="bone">Bone</em> white
            on coffin black, lit by <em className="lantern">lantern</em> flame,{" "}
            <em className="moss">moss</em>,{" "}
            <em className="moonlight">moonlight</em> and{" "}
            <em className="dried-blood">dried blood</em>.
          </p>
          <div className="actions">
            <Link className="action primary" href="/pro#pricing">
              <TombstoneIcon />
              <span>Get Dracula Pro</span>
            </Link>
            <Link className="action" href="#preview">
              Preview
            </Link>
          </div>
          <SaleOffer />
        </div>
        <div className="illustration" aria-hidden>
          <Image
            src="/images/hero/staircase.png"
            alt=""
            fill
            sizes="50vw"
            priority
            unoptimized
          />
        </div>
      </section>
      <section
        id="preview"
        className="container showcase"
        aria-labelledby="showcase-title"
      >
        <div className="bg" aria-hidden />
        <div className="intro">
          <span className="eyebrow">See it in use</span>
          <h2 id="showcase-title">Candlelight in a stone room.</h2>
          <p>
            “Nosferatu. Does this word not sound like the midnight cry of the
            Deathbird?”
          </p>
        </div>
        <CodePreview />
      </section>
      <Palette />
      <section className="container closing" aria-labelledby="closing-title">
        <div className="castle" aria-hidden>
          <Image
            src="/images/hero/castle.svg"
            alt=""
            fill
            sizes="100vw"
            priority
            unoptimized
          />
        </div>
        <ClosingCopy />
      </section>
    </div>
    <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
  </>
);

export default HalloweenPage;
