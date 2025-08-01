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
        <p>
          Hey! 👋🏻 You&apos;re coming from{" "}
          <span className="highlight">{countryName}</span>, where this could be
          too expensive.
        </p>
        {country === "BR" ? (
          <p>
            I&apos;m Brazilian, too, so I know how hard it is to buy things
            online.
          </p>
        ) : (
          <p>
            I believe in{" "}
            <span className="highlight">Purchasing Parity Power</span>, and I
            want to make this affordable.
          </p>
        )}
        <p>
          ✅ If you need it, use the code{" "}
          <span className="highlight">{country}PRO</span> for an extra{" "}
          <span className="highlight">{discount}% off</span> the regular price.
        </p>
      </div>
    </aside>
  );
};
