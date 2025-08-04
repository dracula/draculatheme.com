import "./page.css";

import { Bento } from "@/components/pro/bento";
import { Book } from "@/components/pro/book";
import { Description } from "@/components/pro/description";
import { LightVariant } from "@/components/pro/light-variant";
import { PPPBanner } from "@/components/pro/ppp";
import { Testimonials } from "@/components/pro/testimonials";
import { UsedBy } from "@/components/pro/used-by";
import { VariantsShowcase } from "@/components/pro/variants-showcase";
import { WhyPro } from "@/components/pro/why-pro";
import { Hero } from "@/components/shared/hero";
import { fetcher } from "@/utils/fetcher";

const ProPage = async () => {
  const ppp = await fetcher("https://ppp.dracula.workers.dev", "GET", {}, "");
  const reviews = await fetcher("/api/reviews");

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
        <Book />
        <Testimonials reviews={reviews} />
      </section>
    </>
  );
};

export default ProPage;
