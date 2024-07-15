import "./page.scss";
import { Metadata } from "next";
import ColorPalette from "src/components/contribute/colorPalette";
import OurCommunity from "src/components/contribute/ourCommunity";
import OurProject from "src/components/contribute/ourProject";
import Steps from "src/components/contribute/steps";
import { getBasePath } from "src/lib/environment";
import fetchData from "src/lib/fetchData";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Check this guide to understand how to contribute to Dracula, including the most commonly asked questions and the color palette.",
  alternates: {
    canonical: "/contribute"
  }
};

const Contribute = async () => {
  const contributorsData = await fetchData(
    `${getBasePath()}/api/cache/contributors`
  );

  const contributors = contributorsData.contributors;
  const contributorsList: { login: string; avatar_url: string }[] = [];

  for (const key in contributors) {
    contributorsList.push(...JSON.parse(contributors[key]));
  }

  if (contributorsList.length === 0) {
    return (
      <section className="contribute">
        <div className="container">
          <OurProject />
          <Steps />
          <ColorPalette />
          <OurCommunity contributorsList={[]} />
        </div>
      </section>
    );
  }

  const contributorCounts = contributorsList.reduce(
    (acc: { [key: string]: number }, contributor: { login: string }) => {
      if (!contributor.login.includes("[bot]")) {
        acc[contributor.login] = (acc[contributor.login] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  const uniqueContributors = Object.entries(contributorCounts)
    .sort(([, a]: [string, number], [, b]: [string, number]) => b - a)
    .map(([login]) => contributorsList.find((c) => c.login === login)!);

  return (
    <section className="contribute">
      <div className="container">
        <OurProject />
        <Steps />
        <ColorPalette />
        <OurCommunity contributorsList={uniqueContributors} />
      </div>
    </section>
  );
};

export default Contribute;
