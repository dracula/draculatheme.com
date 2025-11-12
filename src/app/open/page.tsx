import "./page.css";

import type { Metadata } from "next";
import Link from "next/link";

import { Hero } from "@/components/shared/hero";
import { ArrowUpRight } from "@/icons/arrow-up-right";
import { fetcher } from "@/utils/fetcher";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";

interface Metric {
  label: string;
  value: string | number;
  link?: string;
}

const constants = {
  subscribers: 11460,
  legacyViews: 10166543,
  proProductId: "tPfIDt",
  links: {
    github: "https://github.com/dracula/dracula-theme",
    subscribers: "https://draculatheme.com/pro/journey",
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
    label: "Dracula Pro Sales",
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

const structuredDataScriptId = createStructuredDataScriptId(
  "open",
  "structured",
  "data"
);

const OpenPage = async () => {
  const metricData = await fetchMetricData();
  const metrics = createMetrics(metricData);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Open Dashboard - Dracula Theme",
    description:
      "All our metrics and learnings are public. We believe in transparency and want to share our journey with you.",
    url: "https://draculatheme.com/open",
    mainEntity: {
      "@type": "Dataset",
      name: "Dracula Theme Public Metrics",
      description:
        "Transparent business metrics including GitHub stars, subscribers, pageviews, and sales data",
      creator: {
        "@type": "Organization",
        name: "Dracula Theme",
        url: "https://draculatheme.com"
      },
      distribution: [
        {
          "@type": "DataDownload",
          name: "GitHub Repository Metrics",
          description: "Star count and repository statistics",
          contentUrl: constants.links.github,
          encodingFormat: "text/html"
        },
        {
          "@type": "DataDownload",
          name: "Subscriber Metrics",
          description: "Email newsletter subscription data",
          contentUrl: constants.links.subscribers,
          encodingFormat: "text/html"
        },
        {
          "@type": "DataDownload",
          name: "Product Sales Data",
          description: "Dracula Pro sales statistics",
          contentUrl: constants.links.proSales,
          encodingFormat: "text/html"
        }
      ],
      measurementTechnique: [
        "GitHub API",
        "Resend API",
        "Plausible Analytics",
        "Gumroad API"
      ],
      variableMeasured: [
        {
          "@type": "PropertyValue",
          name: "GitHub Stars",
          description: "Total stars across Dracula Theme repositories",
          value: metricData.github
        },
        {
          "@type": "PropertyValue",
          name: "Email Subscribers",
          description: "Newsletter subscribers via Resend",
          value: constants.subscribers
        },
        {
          "@type": "PropertyValue",
          name: "Website Pageviews",
          description: "Total pageviews including legacy data",
          value: metricData.plausible
        },
        {
          "@type": "PropertyValue",
          name: "Dracula Pro Sales",
          description: "Total sales of premium product",
          value: metricData.proSales
        }
      ]
    },
    about: {
      "@type": "SoftwareApplication",
      name: "Dracula Theme",
      url: "https://draculatheme.com"
    },
    keywords: [
      "open startup",
      "transparent metrics",
      "public dashboard",
      "business metrics",
      "dracula theme",
      "startup transparency"
    ],
    mentions: [
      {
        "@type": "Article",
        name: "Dracula on CodePen and Open Startup",
        url: "https://draculatheme.com/blog/dracula-on-codepen-and-open-startup",
        description:
          "Blog post explaining the decision to share metrics publicly"
      },
      {
        "@type": "WebPage",
        name: "Journey",
        url: "https://draculatheme.com/journey",
        description: "Public learnings and journey documentation"
      }
    ],
    isPartOf: {
      "@type": "WebSite",
      name: "Dracula Theme",
      url: "https://draculatheme.com"
    },
    publisher: {
      "@type": "Organization",
      name: "Dracula Theme",
      url: "https://draculatheme.com",
      logo: {
        "@type": "ImageObject",
        url: "https://draculatheme.com/images/hero/default.svg"
      },
      sameAs: [
        "https://github.com/dracula",
        "https://twitter.com/draculatheme",
        "https://discord.gg/yDcFsrB"
      ]
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://draculatheme.com"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Open Dashboard",
          item: "https://draculatheme.com/open"
        }
      ]
    },
    potentialAction: [
      {
        "@type": "ViewAction",
        name: "View Public Metrics",
        target: "https://draculatheme.com/open"
      },
      {
        "@type": "ReadAction",
        name: "Read About Open Startup",
        target:
          "https://draculatheme.com/blog/dracula-on-codepen-and-open-startup"
      }
    ],
    datePublished: new Date().toISOString().split("T")[0],
    inLanguage: "en"
  };

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
      <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
    </>
  );
};

export default OpenPage;
