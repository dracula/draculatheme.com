import "./index.scss";
import Link from "next/link";

const PromoBanner = () => {
  return (
    <Link href="/pro" className="promo-banner">
      <div className="container">
        <span>Alucard has arrived. Meet the Dracula light theme.</span>
      </div>
    </Link>
  );
};

export default PromoBanner;
