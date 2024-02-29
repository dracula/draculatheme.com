import "./page.scss";

import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import fetchData from "src/lib/fetchData";
import { getBasePath } from "src/lib/environment";

export const metadata: Metadata = {
  title: "Open Dashboard",
  description:
    "All our metrics and learnings are public. We believe in transparency and want to share our journey with you.",
  alternates: {
    canonical: "/open",
  },
};

const MetricCard = ({ metric }) => {
  if (metric.link) {
    return (
      <Link href={metric.link} target="_blank" className="metric-card">
        <div className="label-wrapper">
          <span className="label">{metric.label}</span>
          <span className="icon">
            <ExternalLinkIcon />
          </span>
        </div>
        <p className="value">{metric.value}</p>
      </Link>
    );
  } else {
    return (
      <div className="metric-card">
        <div className="label-wrapper">
          <span className="label">{metric.label}</span>
        </div>
        <p className="value">{metric.value}</p>
      </div>
    );
  }
};

const Open = async () => {
  const subscribers = 7399;
  const legacyViews = 10166543;

  // const twitterReq = await fetchData(`${getBasePath()}/api/twitter`);
  // const twitter = twitterReq.total || "--";

  const githubReq = await fetchData(`${getBasePath()}/api/githubStars`);
  const github = githubReq.total || "--";

  const proSalesReq = await fetchData(
    `${getBasePath()}/api/sales?product=tPfIDt`,
  );
  const proSales = proSalesReq.total || "--";

  const uiSalesReq = await fetchData(
    `${getBasePath()}/api/sales?product=MkxCD`,
  );
  const uiSales = uiSalesReq.total || "--";

  const plausibleReq = await fetchData(`${getBasePath()}/api/views`);
  const plausible = plausibleReq.total + legacyViews || "--";

  const metrics = [
    {
      label: "GitHub Stars",
      value: github,
      link: "https://github.com/dracula/dracula-theme",
    },
    // {
    //   label: "Twitter Followers",
    //   value: twitter,
    //   link: "https://twitter.com/draculatheme",
    // },
    {
      label: "Resend Subscribers",
      value: new Intl.NumberFormat().format(subscribers),
      link: "https://draculatheme.com/pro/journey#updates",
    },
    {
      label: "Website Pageviews",
      value: new Intl.NumberFormat().format(plausible),
    },
    {
      label: "Dracula UI Sales",
      value: uiSales,
      link: "https://draculatheme.com/ui",
    },
    {
      label: "Dracula PRO Sales",
      value: proSales,
      link: "https://draculatheme.com/pro",
    },
  ];

  return (
    <section className="open">
      <div className="container">
        <div className="text">
          <p>
            All our metrics and learnings are public. We believe in transparency
            and want to share our journey with you.
          </p>
          <p>
            You can read more about why here:{" "}
            <Link
              href="/blog/dracula-on-codepen-and-open-startup"
              target="_blank"
              className="inline"
            >
              Announcing Open Metrics
            </Link>
          </p>
        </div>
        <div className="grid">
          {metrics.map((metric, index) => {
            return <MetricCard key={index} metric={metric} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Open;
