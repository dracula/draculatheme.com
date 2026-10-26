import "./page.css";

import type { Metadata } from "next";
import { Grenze_Gotisch } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { CodePreview } from "@/components/halloween/code-preview";
import { Countdown } from "@/components/halloween/countdown";
import { Palette } from "@/components/halloween/palette";
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
      <section className="container hero">
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
          <div className="offer">
            <div className="details">
              <span>
                $99 → <em>$49</em> Until Sunrise
              </span>
              <span>Saturday, November 21, 2026</span>
            </div>
            <Countdown
              target="2026-11-21T23:59:59Z"
              label="Time remaining until sunrise"
            />
          </div>
        </div>
        <div className="illustration">
          <Image
            src="/images/hero/staircase.png"
            alt="Nosferatu"
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
        <div className="bg" />
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
        <span className="eyebrow">Until sunrise</span>
        <h2 id="closing-title">
          One-time payment.
          <br />
          Yours forever.
        </h2>
        <p>
          Nosferatu ships with Dracula Pro — every variant, every update,{" "}
          <em>no subscription</em>.
        </p>
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
        <Link className="action primary" href="/pro#pricing">
          <TombstoneIcon />
          <span>Get Dracula Pro</span>
        </Link>
      </section>
    </div>
    <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
  </>
);

export default HalloweenPage;
