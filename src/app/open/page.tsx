import "./page.css";

import type { Metadata } from "next";
import Link from "next/link";

import { Hero } from "@/components/shared/hero";
import { ArrowUpRight } from "@/icons/arrow-up-right";
import { fetcher } from "@/utils/fetcher";

interface Metric {
  label: string;
  value: string | number;
  link?: string;
}

const constants = {
  subscribers: 7399,
  legacyViews: 10166543,
  proProductId: "tPfIDt",
  links: {
    github: "https://github.com/dracula/dracula-theme",
    subscribers: "https://draculatheme.com/pro/journey#updates",
    proSales: "https://draculatheme.com/pro"
  }
};

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat().format(value);
};

const fetchMetricData = async () => {
  try {
    const [githubReq, proSalesReq, plausibleReq] = await Promise.all([
      fetcher("/api/github-stars"),
      fetcher(`/api/sales?product=${constants.proProductId}`),
      fetcher("/api/views")
    ]);

    return {
      github: githubReq?.total || "--",
      proSales: proSalesReq?.total || "--",
      plausible: (plausibleReq?.total || 0) + constants.legacyViews
    };
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return {
      github: "--",
      proSales: "--",
      plausible: constants.legacyViews
    };
  }
};

const createMetrics = (data: {
  github: string | number;
  proSales: string | number;
  plausible: number;
}): Metric[] => [
  {
    label: "GitHub Stars",
    value: data.github,
    link: constants.links.github
  },
  {
    label: "Resend Subscribers",
    value: formatNumber(constants.subscribers),
    link: constants.links.subscribers
  },
  {
    label: "Website Pageviews",
    value: formatNumber(data.plausible)
  },
  {
    label: "Dracula PRO Sales",
    value: data.proSales,
    link: constants.links.proSales
  }
];

const MetricCard = ({ metric }: { metric: Metric }) => {
  const content = (
    <>
      <div className="label-wrapper">
        <span className="label">{metric.label}</span>
        {metric.link && (
          <span className="icon">
            <ArrowUpRight />
          </span>
        )}
      </div>
      <p className="value">{metric.value}</p>
    </>
  );

  if (metric.link) {
    return (
      <Link href={metric.link} target="_blank" className="metric-card">
        {content}
      </Link>
    );
  }

  return <div className="metric-card">{content}</div>;
};

export const metadata: Metadata = {
  title: "Open Dashboard",
  description:
    "All our metrics and learnings are public. We believe in transparency and want to share our journey with you.",
  alternates: {
    canonical: "/open"
  }
};

const OpenPage = async () => {
  const metricData = await fetchMetricData();
  const metrics = createMetrics(metricData);

  return (
    <>
      <Hero />
      <section className="container open">
        <div className="header">
          <p>
            All our metrics and <Link href="/journey">learnings</Link> are
            public. We believe in transparency and want to share our journey
            with you.
          </p>
          <p>
            You can read more about why here:{" "}
            <Link href="/blog/dracula-on-codepen-and-open-startup">
              Announcing Open Metrics
            </Link>
          </p>
        </div>
        <div className="grid">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </section>
    </>
  );
};

export default OpenPage;
