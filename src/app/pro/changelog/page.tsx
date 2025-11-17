import "./page.css";

import type { Metadata } from "next";
import Link from "next/link";

import { CustomMDX } from "@/components/shared/mdx";
import type { BaseContent } from "@/lib/markdown";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";
import { getMdxDataFromDirectory } from "@/utils/mdx";

export const metadata: Metadata = {
  title: "Pro Changelog",
  description: "Discover the latest updates and improvements for Dracula Pro.",
  alternates: {
    canonical: "/pro/changelog"
  }
};

interface ChangelogEntry extends BaseContent {
  authors?: string[];
}

const structuredDataScriptId = createStructuredDataScriptId(
  "pro",
  "changelog",
  "structured",
  "data"
);

const ChangelogPage = () => {
  const entries = getMdxDataFromDirectory<ChangelogEntry>("content/changelog");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dracula Pro Changelog",
    description:
      "Discover the latest updates and improvements for Dracula Pro.",
    url: "https://draculatheme.com/pro/changelog",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: entries.length,
      itemListElement: entries.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: entry.title,
          description: entry.excerpt,
          url: `https://draculatheme.com/pro/changelog#${entry.slug}`,
          datePublished: entry.date.createdAt,
          dateModified: entry.date.updatedAt || entry.date.createdAt
        }
      }))
    }
  };

  return (
    <>
      <section className="container changelog">
        <div className="changelog-hero">
          <div className="title-wrapper">
            <p>What we&apos;re shipping</p>
            <h1>The changelog</h1>
          </div>
          <div className="badge subscribe">
            Subscribe via <Link href="/newsletter">email</Link> or{" "}
            <Link href="/changelog-rss.xml">RSS</Link>
          </div>
        </div>
        <ul className="timeline">
          {entries.map((entry) => {
            const date = entry.date?.createdAt
              ? new Date(entry.date.createdAt)
              : new Date();
            const formattedDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            });

            return (
              <li key={entry.slug}>
                <article id={entry.slug} className="entry prose">
                  <time className="date">{formattedDate}</time>
                  <h2 className="title">{entry.title}</h2>
                  {entry.excerpt && <p className="excerpt">{entry.excerpt}</p>}
                  <CustomMDX source={entry.content} />
                </article>
              </li>
            );
          })}
        </ul>
      </section>
      <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
    </>
  );
};

export default ChangelogPage;
