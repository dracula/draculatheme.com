import "./index.scss";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const PromoBanner = () => {
  return (
    <Link href="/pro" className="promo-banner">
      <span className="container">
        Dracula's locked up by the Grinch. 40% OFF!
        <ChevronRightIcon size={12} strokeWidth={3} className="icon" />
      </span>
    </Link>
  );
};

export default PromoBanner;
