import "./page.scss";

import type { Metadata } from "next";
import Wrapper from "src/components/theme/wrapper";
import fetchData from "src/lib/fetchData";
import { getBasePath } from "src/lib/environment";
import paths from "src/lib/paths";

// export async function generateStaticParams() {
//   return paths.map((path) => ({
//     theme: path.params.theme,
//   }));
// }

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const theme = paths.find((path) => path.params.theme === params.theme).params;
  if (!theme) {
    return;
  }

  const title = theme.title;
  const description = `A dark theme for ${theme.title}`;
  const ogImage = `https://draculatheme.vercel.app/api/og?description=${description}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://draculatheme.vercel.app/${theme.theme}`,
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
  };
}

const Theme = async ({ params }) => {
  const query = paths.find((path) => path.params.theme === params.theme).params;

  const installData = await fetchData(
    `${getBasePath()}/api/installs?id=${query.repo}`,
  );
  const buffer = Buffer.from(installData.install, "base64");
  const markdown = buffer.toString("utf8");

  const contributorsData = await fetchData(
    `${getBasePath()}/api/contributors?id=${query.repo}`,
  );
  const contributors = [...JSON.parse(contributorsData.contributors)];
  contributors.sort((a, b) => a.login.localeCompare(b.login));

  return (
    <section className="theme">
      <div className="container">
        <Wrapper
          query={query}
          markdown={markdown}
          contributors={contributors}
        />
      </div>
    </section>
  );
};

export default Theme;
