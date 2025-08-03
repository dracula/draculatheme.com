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
        <div className="description">
          <p>
            Dracula PRO is a color scheme and UI theme{" "}
            <em>tailored for programming.</em>
          </p>
          <p>
            Made for terminal emulators, <em>code editors,</em> and syntax
            highlighters.
          </p>
          <p>
            Designed to be aesthetically pleasing while{" "}
            <em>keeping you focused.</em>
          </p>
        </div>
        <div className="used-by">
          <h2>Used by software engineers from:</h2>
        </div>
      </section>
    </>
  );
};

export default ProPage;
