import "./page.css";

import { Bento } from "@/components/pro/bento";
import { Description } from "@/components/pro/description";
import { LightVariant } from "@/components/pro/light-variant";
import { PPPBanner } from "@/components/pro/ppp";
import { UsedBy } from "@/components/pro/used-by";
import { VariantsShowcase } from "@/components/pro/variants-showcase";
import { WhyPro } from "@/components/pro/why-pro";
import { Hero } from "@/components/shared/hero";
import { fetcher } from "@/utils/fetcher";

const ProPage = async () => {
  const ppp = await fetcher("https://ppp.dracula.workers.dev", "GET", {}, "");

  return (
    <>
      {ppp.discount && (
        <PPPBanner country={ppp.country} discount={ppp.discount} />
      )}
      <Hero />
      <section className="container pro">
        <Description />
        <UsedBy />
        <VariantsShowcase />
        <WhyPro />
        <LightVariant />
        <Bento />
      </section>
    </>
  );
};

export default ProPage;
