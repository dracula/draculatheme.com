import "./page.css";

import ContentWrapper from "@/components/home/content-wrapper";
import Hero from "@/components/shared/hero";
import { isProd } from "@/lib/environment";
import { paths } from "@/lib/paths";
import { fetcher } from "@/utils/fetcher";

const HomePage = async () => {
  if (isProd()) {
    for (const item of paths) {
      const data = await fetcher(`/api/views?id=${item.repo}`);

      item.views = Number.parseInt(data.views) || 0;
    }

    paths.sort((a, b) => {
      return (b.views ?? 0) - (a.views ?? 0);
    });
  }

  return (
    <>
      <Hero />
      <section className="container home">
        <ContentWrapper />
      </section>
    </>
  );
};

export default HomePage;
