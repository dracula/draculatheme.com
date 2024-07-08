import "./index.scss";
import Link from "next/link";

const PromoBanner = () => {
  return (
    <Link href="/pro" className="card-promo-banner">
      <span>Be more productive</span>
      <h2>Dracula PRO</h2>
      <div className="text">
        <p>
          Aesthetically pleasing, Dracula PRO is a color scheme and UI theme
          tailored for programming.
        </p>
      </div>
    </Link>
  );
};

export default PromoBanner;
