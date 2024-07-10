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
  const contributorsList = [];

  for (const key in contributors) {
    contributorsList.push(...JSON.parse(contributors[key]));
  }

  const filteredContributorsList = contributorsList.filter(
    (contributor) => !contributor.login.includes("[bot]")
  );

  const contributorCounts = filteredContributorsList.reduce(
    (acc, contributor) => {
      acc[contributor.login] = (acc[contributor.login] || 0) + 1;
      return acc;
    },
    {}
  );

  filteredContributorsList.sort(
    (a, b) =>
      contributorCounts[b.login] - contributorCounts[a.login] ||
      a.login.localeCompare(b.login)
  );

  const seen = new Set();

  const uniqueContributors = filteredContributorsList.filter((contributor) => {
    const duplicate = seen.has(contributor.login);
    seen.add(contributor.login);
    return !duplicate;
  });

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
