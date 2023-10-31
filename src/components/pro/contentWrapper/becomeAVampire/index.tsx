"use client";

import "./index.scss";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import { CheckIcon } from "lucide-react";
import Link from "next/link";
import apps from "src/lib/pro";
import { countries } from "countries-list";
import { getDiscount } from "src/lib/discount";
import { textStagger } from "src/lib/framerMotion";

const BecomeAVampire = ({ ppp, sales }) => {
  const control = useAnimation();
  const tipRef = useRef(null);
  const inView = useInView(tipRef);

  let promoName = `${new Date().toLocaleString("default", {
    month: "long",
  })} Promo`;

  let beforePrice = 99;
  let afterPrice = 79;

  let gumroadURL = "https://store.draculatheme.com/l/dracula-pro?wanted=true";

  if (ppp && ppp.country && ppp.discount) {
    promoName = `${countries[ppp.country].name} Promo`;
    beforePrice = 79;
    afterPrice = Number(getDiscount(beforePrice, ppp.discount));
    gumroadURL = `https://store.draculatheme.com/l/dracula-pro/${ppp.country}?wanted=true`;
  }

  // Halloween Promo
  promoName = "Halloween Promo";
  beforePrice = 79;
  afterPrice = Number(getDiscount(beforePrice, 40));
  gumroadURL =
    "https://draculatheme.gumroad.com/l/dracula-pro/DRACULAOWEEN2023";

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <article id="pricing" className="become-a-vampire">
      <div className="title-wrapper">
        <span className="title p">Become a Vampire</span>
        <span>
          Join{" "}
          <span className="highlighted">
            {sales.count ? sales.count : "5.885"} developers
          </span>{" "}
          using Dracula PRO every day.
        </span>
      </div>
      <div className="pricing-card">
        <motion.span
          ref={tipRef}
          variants={textStagger}
          initial="hidden"
          animate={control}
          exit="exit"
          className="promo"
        >
          With {promoName}
        </motion.span>
        <div className="pricing-wrapper">
          <span className="previous-price">${beforePrice}</span>
          <span className="current-price">${afterPrice}</span>
        </div>
        <span className="info">One-time payment</span>
        <ul className="features">
          <li>
            <span className="icon">
              <CheckIcon />
            </span>
            <span>{Object.keys(apps).length + 1} Themes</span>
          </li>
          <li>
            <span className="icon">
              <CheckIcon />
            </span>
            <span>6 Variants</span>
          </li>
          <li>
            <span className="icon">
              <CheckIcon />
            </span>
            <span>4 Hand-picked Fonts</span>
          </li>
          <li>
            <span className="icon">
              <CheckIcon />
            </span>
            <span>1 Productivity E-book</span>
          </li>
          <li>
            <span className="icon">
              <CheckIcon />
            </span>
            <span>1 Bonus Screencast</span>
          </li>
          <li>
            <span className="icon">
              <CheckIcon />
            </span>
            <span>Design Files</span>
          </li>
          <li>
            <span className="icon">
              <CheckIcon />
            </span>
            <span>Wallpapers</span>
          </li>
          <li>
            <span className="icon">
              <CheckIcon />
            </span>
            <span>Constant updates</span>
          </li>
          <li>
            <span className="icon">
              <CheckIcon />
            </span>
            <span>Support included</span>
          </li>
          <li>
            <span className="icon">
              <CheckIcon />
            </span>
            <span>Discord Community</span>
          </li>
          <li>
            <span className="icon">
              <CheckIcon />
            </span>
            <span>License for 3 computers</span>
          </li>
        </ul>
        <Link href={gumroadURL} className="primary">
          Buy Dracula PRO
        </Link>
        <span className="info">30 days refund (no Q/A)</span>
      </div>
      <p className="info">
        <Link href="mailto:support@draculatheme.com" className="inline">
          Contact me
        </Link>{" "}
        to get a <span className="highlighted">Team License</span> to share with
        your team.
      </p>
    </article>
  );
};

export default BecomeAVampire;
