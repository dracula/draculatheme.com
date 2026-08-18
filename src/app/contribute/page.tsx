import "./page.css";

import type { Metadata } from "next";
import Image from "next/image";

import { ColorPalette } from "@/components/contribute/color-palette";
import { Steps } from "@/components/contribute/steps";
import { Hero } from "@/components/shared/hero";
import { getAllContributors } from "@/lib/data/contributors";
import { jsonLd } from "@/lib/json-ld/contribute";
import { getContributorAvatarUrl } from "@/utils/contributors";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";
import { createMetadata } from "@/utils/metadata";

const title = "Contribute";
const description =
  "Learn how to contribute to Dracula, including FAQs and the color palette.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  canonicalPath: "/contribute"
});

const structuredDataScriptId = createStructuredDataScriptId(
  "contribute",
  "structured",
  "data"
);

const ContributePage = async () => {
  const contributorsByRepository = await getAllContributors();
  const contributors = Object.values(contributorsByRepository)
    .flat()
    .filter(
      (contributor, index, array) =>
        array.findIndex((item) => item.login === contributor.login) === index
    );

  return (
    <>
      <Hero />
      <section className="container contribute">
        <div className="our-project">
          <h2>Readme</h2>
          <p>
            Dracula Theme is an open-source project driven by and for the
            community. Most apps that support the theme are contributions from
            our community.
          </p>
          <br />
          <p>
            As much as the team is responsible for the core theme and wants to
            support all available applications, we simply don&apos;t have the
            capacity to do it all ourselves.
          </p>
          <br />
          <p>
            That&apos;s why the community is essential for this project to keep
            evolving. Below are some guidelines, tips, and specifications for
            those who want to apply the theme to any application.
          </p>
        </div>
        <Steps />
        <ColorPalette />
        <div className="contributors">
          <h3>
            Join over <em>{contributors.length}</em> contributors
          </h3>
          <p>
            Whether you&apos;re maintaining a port, contributing via a pull
            request, or reporting an issue, the community is the heart and soul
            of the Dracula Theme.
          </p>
          <ul>
            {contributors.length > 0 &&
              contributors.map((contributor) => (
                <li key={contributor.login}>
                  <a
                    href={`https://github.com/${contributor.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="item"
                  >
                    <div className="avatar">
                      {contributor.avatar_url && (
                        <Image
                          src={getContributorAvatarUrl(
                            contributor.avatar_url,
                            30
                          )}
                          width={30}
                          height={30}
                          alt={contributor.login}
                          unoptimized
                        />
                      )}
                    </div>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </section>
      <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
    </>
  );
};

export default ContributePage;
