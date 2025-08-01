import "./page.css";

import { PPPBanner } from "@/components/pro/ppp";
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
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non,
          quibusdam.
        </p>
      </section>
    </>
  );
};

export default ProPage;
