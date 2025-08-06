import "./page.css";

import type { Metadata } from "next";

import { Form } from "@/components/request-access/form";

export const metadata: Metadata = {
  title: "Request GitHub Access",
  description:
    "Request access to Dracula Pro on GitHub and help shape the project!",
  alternates: {
    canonical: "/pro/request-access"
  }
};

const RequestAccessPage = () => (
  <section className="container request-access">
    <div className="wrapper">
      <div className="borders" aria-hidden>
        <div className="top" />
        <div className="left" />
        <div className="right" />
        <div className="bottom" />
      </div>
      <h1>Request GitHub Access</h1>
      <Form />
      <div className="notes">
        <p>Notes:</p>
        <ul>
          <li>Use the same email used to purchase Dracula Pro;</li>
          <li>
            The email must be linked to your GitHub account and{" "}
            <a
              href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/changing-your-primary-email-address"
              target="_blank"
              rel="noopener noreferrer"
            >
              set to primary or public
            </a>
            ;
          </li>
          <li>
            After confirmation, you will receive an invitation from GitHub.
          </li>
        </ul>
      </div>
      <span className="tip">BETA</span>
    </div>
  </section>
);

export default RequestAccessPage;
