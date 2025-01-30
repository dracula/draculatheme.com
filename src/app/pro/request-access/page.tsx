import RequestAccessForm from "src/components/pro/request-access-form";
import "./page.scss";

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
        <li>The email must be associated with a GitHub account;</li>
        <li>After confirmation, you will receive an invitation from GitHub.</li>
      </ul>
    </div>
    <span className="tip">BETA</span>
  </section>
);

export default RequestAccess;
