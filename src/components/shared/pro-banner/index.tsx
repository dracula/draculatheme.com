import "./index.css";

import Link from "next/link";

import { ArrowUpRight } from "@/icons/arrow-up-right";
import { CheckmarkBadge } from "@/icons/checkmark-badge";

export const ProBanner = () => (
  <Link href="/pro" className="pro-banner">
    <ArrowUpRight size={14} className="arrow" />
    <span>Invest in Your Productivity.</span>
    <h3>
      <CheckmarkBadge size={18} className="checkmark" /> Dracula Pro
    </h3>
    <p>
      More than a theme. <em>A productivity package</em> for developers.
    </p>
  </Link>
);
