import "./index.css";

import Link from "next/link";

export const ProBanner = () => (
  <Link href="/pro" className="pro-banner">
    <div className="cube-wrapper" aria-hidden="true">
      <div className="cube">
        <div className="face"></div>
        <div className="face"></div>
        <div className="face"></div>
        <div className="face"></div>
        <div className="face"></div>
      </div>
    </div>
    <svg
      className="texture"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <title className="sr-only">Texture</title>
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency=".8"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
    <span>Put the Pro in Productivity.</span>
    <h3>Dracula Pro</h3>
    <p>
      Be more productive <em>today</em> and <em>everyday.</em> More than just a
      theme.
    </p>
  </Link>
);
