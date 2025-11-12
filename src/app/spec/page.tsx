import "./page.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CustomMDX } from "@/components/shared/mdx";
import { OnThisPage } from "@/components/shared/mdx/on-this-page";
import { jsonLd } from "@/lib/json-ld/spec";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";
import { getMdxFromFile } from "@/utils/mdx";
import { extractHeadings } from "@/utils/mdx/extract-headings";

export const metadata: Metadata = {
  title: "Spec",
  description: "The official specification for the Dracula color scheme.",
  alternates: {
    canonical: "/spec"
  }
};

const SpecPage = () => {
  const structuredDataScriptId = createStructuredDataScriptId(
    "spec",
    "structured",
    "data"
  );
  const spec = getMdxFromFile("content", "spec");

  if (!spec) {
    notFound();
  }

  return (
    <>
      <section className="container spec">
        <div className="prose">
          <CustomMDX source={spec.content} />
        </div>
        <OnThisPage headings={extractHeadings(spec.content)} />
      </section>
      <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
    </>
  );
};

export default SpecPage;
