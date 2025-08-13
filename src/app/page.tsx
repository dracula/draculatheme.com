import "./page.css";

import type { Metadata } from "next";

import ContentWrapper from "@/components/home/content-wrapper";
import { Hero } from "@/components/shared/hero";
import { isProd } from "@/lib/environment";
import { paths } from "@/lib/paths";
import { fetcher } from "@/utils/fetcher";

export const metadata: Metadata = {
  title: "Dracula Theme for 400+ apps!",
  description:
    "Dracula is a color scheme for code editors and terminal emulators such as Vim, Notepad++, iTerm, VSCode, Terminal.app, ZSH, and much more."
};

const HomePage = async () => {
  const environment = isProd();

  if (environment) {
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
