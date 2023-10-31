import "./index.scss";

import Link from "next/link";

const PromoBanner = () => {
  return (
    <Link
      href={"https://draculatheme.gumroad.com/l/dracula-pro/DRACULAOWEEN2023"}
      target="_blank"
      className="promo-banner"
    >
      <div className="container">
        <span>🦇 Dracula PRO is now at a fang-tastic 40% discount!</span>
      </div>
    </Link>
  );
};

export default PromoBanner;
