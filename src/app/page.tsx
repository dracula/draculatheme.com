import "./page.css";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

import { ContentWrapper } from "@/components/home/content-wrapper";
import { Hero } from "@/components/shared/hero";
import { jsonLd } from "@/lib/json-ld/home";
import { paths } from "@/lib/paths";
import { isProd } from "@/utils/environment";
import { fetcher } from "@/utils/fetcher";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";

export const metadata: Metadata = {
  title: "Dracula Theme for 400+ apps!",
  description:
    "Dracula is a color scheme for code editors and terminal emulators such as Vim, Notepad++, iTerm, VSCode, Terminal.app, ZSH, and much more."
};

const structuredDataScriptId = createStructuredDataScriptId(
  "home",
  "structured",
  "data"
);

const HomePage = async () => {
  const environment = isProd();

  if (environment) {
    const viewsPromises = paths.map(async (item) => {
      try {
        const data = await fetcher(`/api/views?id=${item.repo}`);
        return { item, views: Number.parseInt(data.views, 10) || 0 };
      } catch {
        return { item, views: 0 };
      }
    });

    const results = await Promise.all(viewsPromises);

    for (const { item, views } of results) {
      item.views = views;
    }

    paths.sort((a, b) => {
      // Team picks first
      if (a.teamPick && !b.teamPick) {
        return -1;
      }
      if (!a.teamPick && b.teamPick) {
        return 1;
      }
      // Then sort by views
      return (b.views ?? 0) - (a.views ?? 0);
    });
  }

  return (
    <>
      <Suspense>
        <NuqsAdapter>
          <Hero />
          <section className="container home">
            <ContentWrapper paths={paths} />
          </section>
        </NuqsAdapter>
      </Suspense>
      <noscript>
        <section className="container home noscript">
          <div>
            <h2>Exploring the castle off-grid</h2>
            <p>
              JavaScript is currently resting in its coffin, so enjoy this
              bite-sized list of themes while the magic sleeps.
            </p>
          </div>
          <ul>
            {paths.map((item) => (
              <li key={item.repo}>
                <Link href={`/${item.repo}`}>
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
