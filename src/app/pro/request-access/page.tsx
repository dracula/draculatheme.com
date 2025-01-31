import "./page.scss";
import Link from "next/link";
import RequestAccessForm from "src/components/pro/request-access-form";

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
          The email must be linked to your GitHub account and{" "}
          <Link
            href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/changing-your-primary-email-address"
            target="_blank"
            rel="noopener noreferrer"
            className="inline"
          >
            set to primary or public
          </Link>
          ;
        </li>
        <li>After confirmation, you will receive an invitation from GitHub.</li>
      </ul>
    </div>
    <span className="tip">BETA</span>
  </section>
);

export default RequestAccess;
