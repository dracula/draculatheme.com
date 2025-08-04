import "./page.css";

import Image from "next/image";
import Link from "next/link";

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
        <div className="why-pro">
          <div className="content">
            <h3>Why Dracula PRO?</h3>
            <p>
              In 2013,{" "}
              <Link href="/about">Zeno Rocha&apos;s laptop was stolen,</Link>{" "}
              forcing him to reconfigure everything from scratch. There were
              already many themes available at the time, but none appealed to
              him. So, he decided to <em>create his own.</em>
            </p>
            <p>
              Fast forward to 2020, Dracula became one of the most popular
              themes in the world. Still, for Zeno, something was missing.
              Something <em>beyond just a theme,</em> so he created Dracula PRO.
            </p>
            <p>
              This package was designed for developers who want to{" "}
              <em>invest in their productivity.</em>
            </p>
          </div>
          <div className="photo">
            <Image
              src="/images/pro/why-dracula.jpg"
              alt="Zeno Rocha"
              width={400}
              height={400}
            />
          </div>
        </div>
        <div className="light-variant">
          <div className="content">
            <h3>For those who thrive on light</h3>
            <p>
              For years, we resisted the idea of a light theme for Dracula.
              However, we recognize its importance for accessibility and use in
              bright environments.
            </p>
            <p>
              That&apos;s why we created Alucard, a light variant that
              seamlessly integrates with Dracula PRO. It meets{" "}
              <code>WCAG AA</code> contrast standards, ensuring legibility and
              inclusivity.
            </p>
          </div>
          <div className="preview">
            <Image
              src="/images/pro/vscode/7.png"
              alt="VsCode with Alucard"
              width={1680}
              height={1008}
              quality={100}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProPage;
