import "./page.css";

import Image from "next/image";

import { PPPBanner } from "@/components/pro/ppp";
import { VariantsShowcase } from "@/components/pro/variants-showcase";
import { Hero } from "@/components/shared/hero";
import { companies } from "@/lib/pro/companies";
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
          <ul className="logos-cloud">
            {companies.map((company) => (
              <li key={company.id}>
                <a
                  href={company.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={company.src}
                    width={100}
                    height={100}
                    alt={company.alt}
                  />
                  <span className="sr-only">{company.alt}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <VariantsShowcase />
      </section>
    </>
  );
};

export default ProPage;
