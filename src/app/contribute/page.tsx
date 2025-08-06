import "./page.css";

import type { Metadata } from "next";
import Image from "next/image";

import { ColorPalette } from "@/components/contribute/color-palette";
import { Steps } from "@/components/contribute/steps";
import { Hero } from "@/components/shared/hero";
import { fetcher } from "@/utils/fetcher";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Check this guide to understand how to contribute to Dracula, including the most commonly asked questions and the color palette.",
  alternates: {
    canonical: "/contribute"
  }
};

const ContributePage = async () => {
  const contributorsData = await fetcher("/api/cache/contributors");
  const contributors = Object.values(contributorsData.contributors)
    .flatMap((repo) => JSON.parse(repo as string))
    .filter(
      (contributor, index, array) =>
        !contributor.login.includes("[bot]") &&
        array.findIndex((c) => c.login === contributor.login) === index
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
                          src={contributor.avatar_url}
                          width={24}
                          height={24}
                          alt={contributor.login}
                        />
                      )}
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="12"
                          height="12"
                          color="currentColor"
                          fill="none"
                        >
                          <title className="sr-only">Arrow Icon</title>
                          <path
                            d="M16.5 7.5L6 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M8 6.18791C8 6.18791 16.0479 5.50949 17.2692 6.73079C18.4906 7.95209 17.812 16 17.812 16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="tooltip">
                      <span>@{contributor.login}</span>
                    </div>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default ContributePage;
