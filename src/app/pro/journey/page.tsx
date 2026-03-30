import "./page.css";

import type { Metadata } from "next";

import { jsonLd } from "@/lib/json-ld/pro-journey";
import { lessons } from "@/lib/pro/lessons";
import { fetcher } from "@/utils/fetcher";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";

export const metadata: Metadata = {
  title: "Our journey",
  description: "Follow our journey and learn from our work.",
  alternates: {
    canonical: "/pro/journey"
  }
};

const structuredDataScriptId = createStructuredDataScriptId(
  "pro",
  "journey",
  "structured",
  "data"
);

const JourneyPage = async () => {
  const sales = await fetcher("/api/sales?product=tPfIDt");

  return (
    <>
      <section className="container journey">
        <div className="journey-hero">
          <h1>
            <span>Our Journey to</span> <code>{sales.total}</code>
          </h1>
          <p>
            Dracula Pro reached <em>{sales.count}</em> sales to date.
            <br /> Here are the insights from reaching this milestone.
          </p>
        </div>
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.title} className="item">
              <h2>{lesson.title}</h2>
              <p>{lesson.content}</p>
            </li>
          ))}
        </ul>
      </section>
      <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
    </>
  );
};

export default JourneyPage;
