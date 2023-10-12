import "./page.scss";

import ContentWrapper from "src/components/pro/contentWrapper";
import { Metadata } from "next";
import fetchData from "src/lib/fetchData";
import { getBasePath } from "src/lib/environment";

export const metadata: Metadata = {
  title: "Dracula PRO - Be more productive",
  description:
    "Dracula PRO is a color scheme and UI theme tailored for programming. Made for terminal emulators, code editors, and syntax highlighters. Designed to be aesthetically pleasing while keeping you focused.",
};

const Pro = async () => {
  const ppp = await fetchData(`${getBasePath()}/api/ppp`);
  const sales = await fetchData(`${getBasePath()}/api/sales?product=tPfIDt`);
  const reviews = await fetchData(`${getBasePath()}/api/reviews`);

  return (
    <section className="pro">
      <div className="container">
        <ContentWrapper ppp={ppp} sales={sales} reviews={reviews} />
      </div>
    </section>
  );
};

export default Pro;
