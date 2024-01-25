import Link from "next/link";
import "./index.scss";

const PromoBanner = () => {
  return (
    <Link href="/pro" className="promo-banner">
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
