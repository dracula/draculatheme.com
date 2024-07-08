import "./index.scss";
import Link from "next/link";

const PromoBanner = () => {
  return (
    <Link href="/pro" target="_blank" className="promo-banner">
      <div className="container">
        <span>🌄 Alucard has arrived! Meet our first light theme!</span>
      </div>
    </Link>
  );
};

export default PromoBanner;
