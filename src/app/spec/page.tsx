import "./page.css";

import { notFound } from "next/navigation";

import { CustomMDX } from "@/components/shared/mdx";
import { OnThisPage } from "@/components/shared/mdx/on-this-page";
import { getMdxFromFile } from "@/utils/mdx";
import { extractHeadings } from "@/utils/mdx/extract-headings";

const SpecPage = () => {
  const spec = getMdxFromFile("content", "spec");

  if (!spec) {
    notFound();
  }

  return (
    <section className="container spec">
      <div className="prose">
        <CustomMDX source={spec.content} />
      </div>
      <OnThisPage headings={extractHeadings(spec.content)} />
    </section>
  );
};

export default SpecPage;
