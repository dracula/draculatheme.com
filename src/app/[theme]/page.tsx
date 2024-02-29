import "./page.scss";

import type { Metadata } from "next";
import Wrapper from "src/components/theme/wrapper";
import fetchData from "src/lib/fetchData";
import { getBasePath } from "src/lib/environment";
import { notFound } from "next/navigation";
import paths from "src/lib/paths";

export async function generateStaticParams() {
  return paths.map((path) => ({
    theme: path.params.theme,
  }));
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const pathObj = paths.find((path) => path.params.theme === params.theme);

  if (!pathObj) notFound();

  const theme = pathObj.params;

  const title = theme.title;
  const description = `The most famous dark theme for ${theme.title}. 🦇`;
  const ogImage = `https://draculatheme.com/images/og.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://draculatheme.com/${theme.theme}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `/${theme.theme}/`,
    },
  };
}

const Theme = async ({ params }) => {
  const pathObj = paths.find((path) => path.params.theme === params.theme);

  if (!pathObj) notFound();

  const theme = pathObj.params;

  const defaultBranchData = await fetchData(
    `${getBasePath()}/api/branches?id=${theme.repo}`,
  );
  const defaultBranch = defaultBranchData.branches;

  const installData = await fetchData(
    `${getBasePath()}/api/installs?id=${theme.repo}`,
  );
  const buffer = Buffer.from(installData.install, "base64");
  const markdown = buffer.toString("utf8");

  const contributorsData = await fetchData(
    `${getBasePath()}/api/contributors?id=${theme.repo}`,
  );
  const contributors = [...JSON.parse(contributorsData.contributors)];
  contributors.sort((a, b) => a.login.localeCompare(b.login));

  return (
    <section className="theme">
      <div className="container">
        <Wrapper
          query={theme}
          defaultBranch={defaultBranch}
          markdown={markdown}
          contributors={contributors}
        />
      </div>
    </section>
  );
};

export default Theme;
