import "./page.scss";
import type { Metadata } from "next";
import ContentWrapper from "src/components/pro/contentWrapper";
import { getBasePath } from "src/lib/environment";
import fetchData from "src/lib/fetchData";

export const metadata: Metadata = {
  title: "Dracula PRO - Be more productive",
  description:
    "Dracula PRO is a color scheme and UI theme tailored for programming. Designed to be aesthetically pleasing while keeping you focused.",
  alternates: {
    canonical: "/pro"
  }
};

const Pro = async () => {
  const sales = await fetchData(`${getBasePath()}/api/sales?product=tPfIDt`);
  const reviews = await fetchData(`${getBasePath()}/api/reviews`);

  return (
    <section className="pro">
      <div className="container">
        <ContentWrapper sales={sales} reviews={reviews} />
      </div>
    </section>
  );
};

export default Pro;
