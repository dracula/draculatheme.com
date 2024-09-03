import "./index.scss";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const PromoBanner = () => {
  return (
    <Link
      href="https://codinginpublic.dev/fundraiser?ref=draculatheme.com"
      className="promo-banner"
    >
      <span className="container">
        Part of September&apos;s purchases will go towards curing childhood
        cancer. <i>Read more </i>
        <ChevronRightIcon size={12} strokeWidth={3} className="icon" />
      </span>
    </Link>
  );
};

export default PromoBanner;
