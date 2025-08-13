import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pro Changelog",
  description: "Discover the latest updates and improvements for Dracula Pro.",
  alternates: {
    canonical: "/pro/changelog"
  }
};

const ChangelogPage = () => {
  return (
    <section className="container changelog">
      <h1>Changelog</h1>
      <p>Discover the latest updates and improvements for Dracula Pro.</p>
      <br />
      <code>/WIP</code>
    </section>
  );
};

export default ChangelogPage;
