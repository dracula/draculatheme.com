import "./page.css";

import ContentWrapper from "@/components/home/content-wrapper";
import Hero from "@/components/shared/hero";

const HomePage = () => (
  <>
    <Hero />
    <section className="container home">
      <ContentWrapper />
    </section>
  </>
);

export default HomePage;
