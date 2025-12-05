import "./page.css";

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Hero } from "@/components/shared/hero";
import { CustomMDX } from "@/components/shared/mdx";
import { ProBanner } from "@/components/shared/pro-banner";
import { BugIcon } from "@/icons/bug";
import { DownloadIcon } from "@/icons/download";
import { EditIcon } from "@/icons/edit";
import { GithubIcon } from "@/icons/github";
import { paths } from "@/lib/paths";
import { apps } from "@/lib/pro/apps";
import type { Props } from "@/lib/types";
import { filterBots } from "@/utils/contributors";
import { fetcher } from "@/utils/fetcher";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";

export const generateStaticParams = async () => {
  return paths.map((item) => ({
    theme: item.repo
  }));
};

export const generateMetadata = async (
  props: Props
): Promise<Metadata | undefined> => {
  const params = await props.params;
  const theme = paths.find((item) => item.repo === params.theme);

  if (!theme) {
    notFound();
  }

  const title = theme.title;
  const description = `The most famous theme for ${theme.title}, and an ever-growing selection of apps!`;
  const ogImage = "https://draculatheme.com/images/og.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://draculatheme.com/${theme.repo}`,
      images: [
        {
          url: ogImage
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    },
    alternates: {
      canonical: `/${theme.repo}`
    }
  };
};

const ThemePage = async (props: Props) => {
  const params = await props.params;
  const theme = paths.find((item) => item.repo === params.theme);

  if (!theme) {
    notFound();
  }

  const structuredDataScriptId = createStructuredDataScriptId(
    "theme",
    theme.repo,
    "structured",
    "data"
  );
  const isProApp = apps.some((app) => app.value === theme.repo);

  const branchData = await fetcher(`/api/branches?id=${theme.repo}`);
  const branchValue =
    branchData.status === 200 ? branchData.branches : undefined;
  const branch =
    typeof branchValue === "string" && branchValue.trim().length > 0
      ? branchValue
      : "main";

  const contributorsData = await fetcher(`/api/contributors?id=${theme.repo}`);
  const contributors = filterBots(JSON.parse(contributorsData.contributors));

  const installsResponse = await fetcher(`/api/installs?id=${theme.repo}`);
  const decodedBuffer = Buffer.from(installsResponse.install, "base64");
  const installsContent = decodedBuffer.toString("utf8");

  const screenshotUrl = `https://raw.githubusercontent.com/dracula/${theme.repo}/${branch}/screenshot.png`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `Dracula Theme for ${theme.title}`,
    alternateName: `Dracula for ${theme.title}`,
    description: `The most famous theme for ${theme.title}, and an ever-growing selection of apps!`,
    url: `https://draculatheme.com/${theme.repo}`,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Code Editor Theme",
    screenshot: screenshotUrl,
    downloadUrl: `https://github.com/dracula/${theme.repo}/archive/refs/heads/${branch}.zip`,
    installUrl: `https://draculatheme.com/${theme.repo}`,
    license: "https://github.com/dracula/dracula-theme/blob/main/LICENSE",
    keywords: [
      "dracula theme",
      theme.title.toLowerCase(),
      "color scheme",
      "syntax highlighting",
      "developer tools"
    ],
    author: contributors.map((contributor) => ({
      "@type": "Person",
      name: contributor.login,
      url: `https://github.com/${contributor.login}`,
      image: contributor.avatar_url
    })),
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
    isPartOf: {
      "@type": "SoftwareApplication",
      name: "Dracula Theme",
      url: "https://draculatheme.com"
    },
    offers: {
      "@type": "Offer",
      name: `Dracula Theme for ${theme.title}`,
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      description: `Dracula Theme for ${theme.title}`
    },
    potentialAction: [
      {
        "@type": "DownloadAction",
        target: `https://github.com/dracula/${theme.repo}/archive/refs/heads/${branch}.zip`,
        name: "Download Theme"
      },
      {
        "@type": "ViewAction",
        target: `https://github.com/dracula/${theme.repo}`,
        name: "View Source Code"
      }
    ],
    maintainer: {
      "@type": "Organization",
      name: "Dracula Theme Community",
      url: "https://github.com/dracula"
    },
    datePublished: "2013-10-27",
    dateModified: new Date().toISOString().split("T")[0]
  };

  return (
    <>
      <Hero />
      <section className="container theme">
        <div className="wrapper">
          <div className="instructions">
            <div className="screenshot">
              <Image
                src={screenshotUrl}
                alt={`${theme.repo} - Theme Preview`}
                quality={70}
                width={800}
                height={800}
                sizes="(max-width: 48rem) 100vw, 50rem"
              />
            </div>
            <article className="prose">
              <CustomMDX
                source={installsContent}
                format="md"
                repositoryContext={{ repo: theme.repo, branch }}
              />
            </article>
          </div>
          <aside className="sidebar">
            <h4>Details</h4>
            <ul>
              <li>
                <a
                  href={`https://github.com/dracula/${theme.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon /> <span>View source code</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://github.com/dracula/${theme.repo}/archive/refs/heads/${branch}.zip`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadIcon />{" "}
                  <span>
                    Download <code>ZIP</code> file
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`https://github.com/dracula/${theme.repo}/issues/new`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BugIcon /> <span>Report an issue</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://github.com/dracula/${theme.repo}/edit/${branch}/README.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EditIcon /> <span>Edit this page</span>
                </a>
              </li>
            </ul>
            <h4>
              Contributors<span className="count">{contributors.length}</span>
            </h4>
            <ul className="contributors">
              {contributors.map((contributor) => (
                <li key={contributor.login}>
                  <a
                    href={`https://github.com/${contributor.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contributor"
                  >
                    <div>
                      {contributor.avatar_url && (
                        <Image
                          src={contributor.avatar_url}
                          width={24}
                          height={24}
                          alt={contributor.login}
                        />
                      )}
                    </div>
                    <span>@{contributor.login}</span>
                  </a>
                </li>
              ))}
            </ul>
            <ProBanner isProApp={isProApp} appName={theme.title} />
          </aside>
        </div>
      </section>
      <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
    </>
  );
};

export default ThemePage;
