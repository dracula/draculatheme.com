import Link from "next/link";

export const metadata = {
  title: `🥲 Not found`
};

const NotFound = () => {
  return (
    <section id="not-found" className="not-found">
      <div className="row flow-column-wrap">
        <h1 className="title p">This page does not exist.</h1>
        <p>Please check the URL and try again.</p>
        <div className="row">
          <Link href="/" className="primary">
            <span>Theme</span>
          </Link>
          <Link href="/pro" className="primary pro">
            <span>PRO</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
