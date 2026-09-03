import "./page.css";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

import { ContentWrapper } from "@/components/home/content-wrapper";
import { Hero } from "@/components/shared/hero";
import { getAllViews } from "@/lib/data/views";
import { jsonLd } from "@/lib/json-ld/home";
import { paths } from "@/lib/paths";
import { getCategoryImportance } from "@/utils/home/filter";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";
import { createMetadata } from "@/utils/metadata";

const title = "Dracula Theme for 400+ apps";
const description =
  "Dracula is a color scheme for code editors and terminal emulators such as Vim, Notepad++, iTerm, VSCode, Terminal.app, ZSH, and much more.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  canonicalPath: "/"
});

const structuredDataScriptId = createStructuredDataScriptId(
  "home",
  "structured",
  "data"
);

const HomePage = async () => {
  const viewsByRepository = await getAllViews();
  const pathsWithViews = paths.map((item) => ({
    ...item,
    views: viewsByRepository[item.repo] ?? 0
  }));

  pathsWithViews.sort((a, b) => {
    if (a.teamPick && !b.teamPick) {
      return -1;
    }

    if (!a.teamPick && b.teamPick) {
      return 1;
    }

    if (a.teamPick && b.teamPick) {
      const categoryDiff =
        getCategoryImportance(a.categories) -
        getCategoryImportance(b.categories);

      if (categoryDiff !== 0) {
        return categoryDiff;
      }

      return (b.views ?? 0) - (a.views ?? 0);
    }

    return (b.views ?? 0) - (a.views ?? 0);
  });

  return (
    <>
      <Suspense>
        <NuqsAdapter>
          <Hero />
          <section className="container home">
            <ContentWrapper paths={pathsWithViews} />
          </section>
        </NuqsAdapter>
      </Suspense>
      <noscript>
        <section className="container home noscript">
          <div>
            <h2>Exploring the castle off-grid</h2>
            <p>
              JavaScript is resting in its coffin. Enjoy this bite-sized list of
              themes while the magic sleeps.
            </p>
          </div>
          <ul>
            {pathsWithViews.map((item) => (
              <li key={item.repo}>
                <Link href={`/${item.repo}`} prefetch={false}>
                  <div className="icon">
                    <Image
                      src={`/icons/${item.icon}`}
                      width={200}
                      height={200}
                      alt={`${item.title} Icon`}
                    />
                  </div>
                  <div className="content">
                    <div className="title-row">
                      <h3>{item.title}</h3>
                      {item.teamPick && (
                        <span className="team-pick-badge">Team Pick</span>
                      )}
                    </div>
                    {(item.views ?? 0) > 0 && (
                      <p>
                        {new Intl.NumberFormat().format(item.views ?? 0)} views
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </noscript>
      <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
    </>
  );
};

export default HomePage;
