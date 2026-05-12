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
import { createMetadata } from "@/utils/metadata";

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
  const description = `The most famous theme for ${theme.title}, plus an ever-growing list of apps.`;

  return createMetadata({
    title,
    description,
    canonicalPath: `/${theme.repo}`
  });
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

  const defaultBranchResponse = await fetcher(`/api/branches?id=${theme.repo}`);
  const defaultBranchNameFromCache =
    defaultBranchResponse.status === 200
      ? defaultBranchResponse.branches
      : undefined;
  const repositoryDefaultBranch =
    typeof defaultBranchNameFromCache === "string" &&
    defaultBranchNameFromCache.trim().length > 0
      ? defaultBranchNameFromCache
      : "main";

  const contributorsResponse = await fetcher(
    `/api/contributors?id=${theme.repo}`
  );
  const contributorsPayload: unknown =
    typeof contributorsResponse.contributors === "string"
      ? JSON.parse(contributorsResponse.contributors)
      : contributorsResponse.contributors;

  const contributors = filterBots(
    Array.isArray(contributorsPayload) ? contributorsPayload : []
  );

  const installGuideResponse = await fetcher(`/api/installs?id=${theme.repo}`);
  const installGuideBase64Payload = installGuideResponse.install;
  const installGuideMarkdown = Buffer.from(
    installGuideBase64Payload,
    "base64"
  ).toString("utf8");

  const githubThemeScreenshotUrl = `https://raw.githubusercontent.com/dracula/${theme.repo}/${repositoryDefaultBranch}/screenshot.png`;
  const githubThemeScreenshotHeadResponse = await fetch(
    githubThemeScreenshotUrl,
    {
      method: "HEAD",
      redirect: "follow",
      cache: "no-store"
    }
  ).catch(() => null);
  const hasGithubThemeScreenshot =
    githubThemeScreenshotHeadResponse != null &&
    githubThemeScreenshotHeadResponse.ok;
  const themePreviewImageSrc = hasGithubThemeScreenshot
    ? githubThemeScreenshotUrl
    : "/images/dracula.webp";
  const themePreviewImageStructuredDataUrl = hasGithubThemeScreenshot
    ? githubThemeScreenshotUrl
    : "https://draculatheme.com/images/dracula.webp";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `Dracula Theme for ${theme.title}`,
    alternateName: `Dracula for ${theme.title}`,
    description: `The most famous theme for ${theme.title}, plus an ever-growing list of apps.`,
    url: `https://draculatheme.com/${theme.repo}`,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Code Editor Theme",
    screenshot: themePreviewImageStructuredDataUrl,
    downloadUrl: `https://github.com/dracula/${theme.repo}/archive/refs/heads/${repositoryDefaultBranch}.zip`,
    installUrl: `https://draculatheme.com/${theme.repo}`,
    license: "https://github.com/dracula/dracula-theme/blob/main/LICENSE",
    keywords: [
      "dracula theme",
      theme.title.toLowerCase(),
      "color scheme",
      "syntax highlighting",
      "developer tools"
    ],
    author: contributors
      .filter(
        (contributor): contributor is typeof contributor & { login: string } =>
          !!contributor.login
      )
      .map((contributor) => ({
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
        target: `https://github.com/dracula/${theme.repo}/archive/refs/heads/${repositoryDefaultBranch}.zip`,
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
                src={themePreviewImageSrc}
                alt={`${theme.repo} - Theme preview`}
                width={800}
                height={800}
                sizes="(max-width: 48rem) 100vw, 50rem"
                priority
              />
            </div>
            <article className="prose">
              <CustomMDX
                source={installGuideMarkdown}
                format="md"
                repositoryContext={{
                  repo: theme.repo,
                  branch: repositoryDefaultBranch
                }}
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
                  href={`https://github.com/dracula/${theme.repo}/archive/refs/heads/${repositoryDefaultBranch}.zip`}
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
                  href={`https://github.com/dracula/${theme.repo}/edit/${repositoryDefaultBranch}/README.md`}
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
              {contributors.map((contributor) => {
                if (!contributor.login) {
                  return null;
                }

                return (
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
                );
              })}
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
