import "./index.scss";

import Image from "next/image";
import Link from "next/link";

const logos = [
  {
    href: "https://www.adobe.com",
    src: "/images/pro/companys/adobe.svg",
    alt: "Adobe Logo",
    className: "adobe",
  },
  {
    href: "https://www.amazon.com",
    src: "/images/pro/companys/amazon.svg",
    alt: "Amazon Logo",
    className: "amazon",
  },
  {
    href: "https://www.apple.com",
    src: "/images/pro/companys/apple.svg",
    alt: "Apple Logo",
    className: "apple",
  },
  {
    href: "https://www.google.com",
    src: "/images/pro/companys/google.svg",
    alt: "Google Logo",
    className: "google",
  },
  {
    href: "https://www.ibm.com",
    src: "/images/pro/companys/ibm.svg",
    alt: "IBM Logo",
    className: "ibm",
  },
  {
    href: "https://www.intel.com",
    src: "/images/pro/companys/intel.svg",
    alt: "Intel Logo",
    className: "intel",
  },
  {
    href: "https://www.linear.app",
    src: "/images/pro/companys/linear.svg",
    alt: "Linear Logo",
    className: "linear",
  },
  {
    href: "https://www.meta.com",
    src: "/images/pro/companys/meta.svg",
    alt: "Meta Logo",
    className: "meta",
  },
  {
    href: "https://www.microsoft.com",
    src: "/images/pro/companys/microsoft.svg",
    alt: "Microsoft Logo",
    className: "microsoft",
  },
  {
    href: "https://www.oracle.com",
    src: "/images/pro/companys/oracle.svg",
    alt: "Oracle Logo",
    className: "oracle",
  },
  {
    href: "https://www.paypal.com",
    src: "/images/pro/companys/paypal.svg",
    alt: "Paypal Logo",
    className: "paypal",
  },
  {
    href: "https://www.shopify.com",
    src: "/images/pro/companys/shopify.svg",
    alt: "Shopify Logo",
    className: "shopify",
  },
  {
    href: "https://www.spotify.com",
    src: "/images/pro/companys/spotify.svg",
    alt: "Spotify Logo",
    className: "spotify",
  },
  {
    href: "https://www.vercel.com",
    src: "/images/pro/companys/vercel.svg",
    alt: "Vercel Logo",
    className: "vercel",
  },
];

const LogoWall = () => {
  return (
    <article className="logo-wall">
      <span className="title t">Used by software engineers from:</span>
      <div className="logos">
        {logos.map((logo, index) => (
          <Link
            key={index}
            href={logo.href}
            target="_blank"
            className={`icon ${logo.className}`}
            aria-label={`Visit ${logo.alt}`}
          >
            <Image src={logo.src} alt={logo.alt} width={100} height={100} />
          </Link>
        ))}
      </div>
    </article>
  );
};

export default LogoWall;
