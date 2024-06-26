import "./page.scss";
import { Metadata } from "next";
import AboutArticles from "src/components/about/aboutArticles";

export const metadata: Metadata = {
  title: "About",
  description:
    "The origin story - Because every story opens the door to a new one.",
  alternates: {
    canonical: "/about"
  }
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
