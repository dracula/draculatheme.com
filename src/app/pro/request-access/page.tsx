import RequestAccessForm from "src/components/pro/request-access-form";
import "./page.scss";
import Link from "next/link";

const RequestAccess = () => (
  <section id="request-access">
    <div className="borders" aria-hidden>
      <div className="top" />
      <div className="left" />
      <div className="right" />
      <div className="bottom" />
    </div>
    <h1>Request GitHub Access</h1>
    <RequestAccessForm />
    <div className="notes">
      <p>Notes:</p>
      <ul>
        <li>Use the same email used to purchase the product;</li>
        <li>
          The email must be associated with a GitHub account and set as either
          primary or public email (
          <Link
            href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/changing-your-primary-email-address"
            target="_blank"
            rel="noopener noreferrer"
            className="inline"
          >
            Learn how to set your GitHub email as primary or public
          </Link>
          );
        </li>
        <li>After confirmation, you will receive an invitation from GitHub.</li>
      </ul>
    </div>
    <span className="tip">BETA</span>
  </section>
);

export default RequestAccess;
