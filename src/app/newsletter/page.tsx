import "./page.css";

import type { Metadata } from "next";

import { NewsletterWrapper } from "@/components/newsletter/wrapper";
import { jsonLd } from "@/lib/json-ld/newsletter";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Subscribe to Dracula’s newsletter for exclusive updates. Join 11,460 subscribers.",
  alternates: {
    canonical: "/newsletter"
  }
};

const structuredDataScriptId = createStructuredDataScriptId(
  "newsletter",
  "structured",
  "data"
);

const NewsletterPage = () => (
  <>
    <NewsletterWrapper />
    <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
  </>
);

export default NewsletterPage;
