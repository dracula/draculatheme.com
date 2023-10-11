import "./page.scss";

import AboutArticles from "src/components/about/aboutArticles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Our origin story - One Theme to rule them all...",
};

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <AboutArticles />
      </div>
    </section>
  );
};

export default About;
