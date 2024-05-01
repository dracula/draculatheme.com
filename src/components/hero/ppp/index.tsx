import { countries } from "countries-list";
import Image from "next/image";

const SpecialMessage = ({ country }) => {
  if (country === "BR") {
    return (
      <p>
        I&apos;m Brazilian, too, so I know how hard it is to buy things online.
      </p>
    );
  }

  return (
    <p>
      I believe in <span className="highlight">Purchasing Parity Power</span>,
      and I want to make this affordable.
    </p>
  );
};

const PPP = ({ ppp }) => {
  if (!ppp || !ppp.discount) return null;

  return (
    <aside className="ppp">
      <div className="wrapper">
        <div className="flag">
          <Image
            src={`/images/flags/${ppp.country}.svg`}
            alt={countries[ppp.country].name}
            width={100}
            height={100}
          />
        </div>
        <div className="message col">
          <p>
            Hey! 👋🏻 You&apos;re coming from{" "}
            <span className="highlight">{countries[ppp.country].name}</span>,
            where this could be too expensive.
          </p>
          <SpecialMessage country={ppp.country} />
          <p>
            ✅ If you need it, use the code{" "}
            <span className="highlight">{ppp.country}PRO</span> for an extra{" "}
            <span className="highlight">{ppp.discount}% off</span> the regular
            price.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default PPP;
