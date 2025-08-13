import "./page.css";

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Hero } from "@/components/shared/hero";
import { CustomMDX } from "@/components/shared/mdx";
import { BugIcon } from "@/icons/bug";
import { DownloadIcon } from "@/icons/download";
import { EditIcon } from "@/icons/edit";
import { GithubIcon } from "@/icons/github";
import { paths } from "@/lib/paths";
import type { Props } from "@/lib/types";
import { fetcher } from "@/utils/fetcher";

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

  const branchData = await fetcher(`/api/branches?id=${theme.repo}`);
  const branch = branchData.branches || "main";

  const contributorsData = await fetcher(`/api/contributors?id=${theme.repo}`);
  const contributors = [...JSON.parse(contributorsData.contributors)];

  const installsResponse = await fetcher(`/api/installs?id=${theme.repo}`);
  const decodedBuffer = Buffer.from(installsResponse.install, "base64");
  const installsContent = decodedBuffer.toString("utf8");

  return (
    <>
      <Hero />
      <section className="container theme">
        <div className="wrapper">
          <div className="instructions">
            <div className="screenshot">
              <Image
                src={`https://raw.githubusercontent.com/dracula/${theme.repo}/master/screenshot.png`}
                alt={`${theme.repo} - Theme Preview`}
                quality={100}
                width={800}
                height={800}
              />
            </div>
            <article className="prose">
              <CustomMDX source={installsContent} format="md" />
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
          </aside>
        </div>
      </section>
    </>
  );
};

export default ThemePage;
