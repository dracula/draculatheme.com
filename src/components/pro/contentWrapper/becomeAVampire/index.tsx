"use client";

import "./index.scss";
import { countries } from "countries-list";
import { motion, useAnimation, useInView } from "framer-motion";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { getDiscount } from "src/lib/discount";
import { textStagger } from "src/lib/framerMotion";
import apps from "src/lib/pro";

const calculateEffectiveDiscount = (promo) => {
  return ((promo.beforePrice - promo.afterPrice) / promo.beforePrice) * 100;
};

const BecomeAVampire = ({ ppp, sales }) => {
  const control = useAnimation();
  const tipRef = useRef(null);
  const inView = useInView(tipRef);

  const defaultPromo = {
    name: `${new Date().toLocaleString("default", { month: "long" })} Promo`,
    beforePrice: 99,
    afterPrice: 79,
    url: "https://draculatheme.gumroad.com/l/dracula-pro?wanted=true",
    discount: ((99 - 79) / 99) * 100
  };

  const spookyPromo = {
    name: "A Scary Christmas!",
    beforePrice: 79,
    afterPrice: Number(getDiscount(79, 40)),
    url: "https://draculatheme.gumroad.com/l/dracula-pro/GRINCHSMISCHIEF?wanted=true",
    discount: 40
  };

  // Calculate PPP promo if available
  const pppPromo =
    ppp?.country && ppp.discount
      ? {
          name: `${countries[ppp.country].name} Promo`,
          beforePrice: 79,
          afterPrice: Number(getDiscount(79, ppp.discount)),
          url: `https://draculatheme.gumroad.com/l/dracula-pro/${ppp.country}PRO?wanted=true`,
          discount: ppp.discount
        }
      : null;

  const promos = [defaultPromo];

  // Add PPP promo if it exists
  if (pppPromo) {
    promos.push(pppPromo);
  }

  // Add spooky promo
  promos.push(spookyPromo);

  // Find the best promo by comparing effective discounts
  const bestPromo = promos.reduce((best, current) => {
    const currentDiscount = calculateEffectiveDiscount(current);
    const bestDiscount = calculateEffectiveDiscount(best);
    return currentDiscount > bestDiscount ? current : best;
  }, promos[0]);

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
          {bestPromo.name}
        </motion.span>
        <div className="pricing-wrapper">
          <span className="previous-price">${bestPromo.beforePrice}</span>
          <span className="current-price">${bestPromo.afterPrice}</span>
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
        <Link href={bestPromo.url} className="primary">
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
