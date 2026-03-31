import "./page.css";

import type { Metadata } from "next";

import { Form } from "@/components/request-access/form";
import { jsonLd } from "@/lib/json-ld/pro-request-access";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";
import { createMetadata } from "@/utils/metadata";

const title = "Request GitHub access";
const description =
  "Request access to Dracula Pro on GitHub and help shape what ships next.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  canonicalPath: "/pro/request-access"
});

const structuredDataScriptId = createStructuredDataScriptId(
  "pro",
  "request",
  "access",
  "structured",
  "data"
);

const RequestAccessPage = () => (
  <>
    <section className="container request-access">
      <div className="wrapper">
        <div className="borders" aria-hidden>
          <div className="top" />
          <div className="left" />
          <div className="right" />
          <div className="bottom" />
        </div>
        <h1>Request GitHub access</h1>
        <Form />
        <div className="notes">
          <p>Before you start</p>
          <ul>
            <li>Use the same email you used to buy Dracula Pro.</li>
            <li>
              The email must be linked to your GitHub account and{" "}
              <a
                href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/changing-your-primary-email-address"
                target="_blank"
                rel="noopener noreferrer"
              >
                set to primary or public
              </a>
              .
            </li>
            <li>
              After confirmation, you will receive an invitation from GitHub.
            </li>
          </ul>
        </div>
        <h2 className="tip">Beta</h2>
      </div>
    </section>
    <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
  </>
);

export default RequestAccessPage;
