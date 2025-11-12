import "./index.css";

import Link from "next/link";

import { ArrowUpRight } from "@/icons/arrow-up-right";

interface ProBannerProps {
  isProApp?: boolean;
  appName?: string;
}

export const ProBanner = ({ isProApp, appName }: ProBannerProps = {}) => (
  <Link href="/pro" className="pro-banner">
    <ArrowUpRight size={14} className="arrow" />
    {isProApp ? (
      <>
        <span>Upgrade to Pro</span>
        <h3>Dracula Pro for {appName}</h3>
      </>
    ) : (
      <>
        <span>Join 7,000+ creators</span>
        <h3>Dracula Pro</h3>
      </>
    )}
    <p>
      Refined colors, <em>crafted for focus.</em>
      <br /> Everything you need in one complete package.
    </p>
  </Link>
);
