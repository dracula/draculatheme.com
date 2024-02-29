import ChangelogList from "src/components/changelog/changelogList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PRO Changelog",
  description: "Discover the latest updates and improvements for Dracula Pro.",
  alternates: {
    canonical: "/pro/changelog/",
  },
};

const Changelog = () => {
  return <ChangelogList />;
};

export default Changelog;
