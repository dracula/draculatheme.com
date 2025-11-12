import Script from "next/script";

type JsonLdScriptProps = {
  id: string;
  jsonLd: unknown;
};

const sanitizeJsonLd = (jsonLd: unknown) =>
  JSON.stringify(jsonLd).replace(/</g, "\\u003c");

export const createStructuredDataScriptId = (...segments: string[]) =>
  segments.join("-");

export const JsonLdScript = ({ id, jsonLd }: JsonLdScriptProps) => (
  <Script id={id} strategy="afterInteractive" type="application/ld+json">
    {sanitizeJsonLd(jsonLd)}
  </Script>
);
