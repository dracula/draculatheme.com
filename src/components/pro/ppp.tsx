import { countries } from "countries-list";
import Image from "next/image";

interface PPPBannerProps {
  country: string;
  discount: number;
}

export const PPPBanner = ({ country, discount }: PPPBannerProps) => {
  const countryCode = country as keyof typeof countries;
  const countryName = countries[countryCode]?.name || "Unknown";

  return (
    <aside className="ppp-banner">
      <div className="container">
        <div className="flag">
          <Image
            src={`/images/flags/${country}.svg`}
            alt={countryName}
            width={100}
            height={100}
          />
        </div>
        <div className="content">
          <p>
            Hey! You&apos;re coming from <em>{countryName}</em>, where this
            could be too expensive. We believe in{" "}
            <em>Purchasing Parity Power</em>, and want to make this affordable.
          </p>
          <p>
            If you need it, use the code <code>{country}PRO</code> for an extra{" "}
            <code>{discount}%</code> off the regular price.
          </p>
        </div>
      </div>
    </aside>
  );
};
