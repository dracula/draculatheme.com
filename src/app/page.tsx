import "./page.scss";

import { getBasePath, isProd } from "src/lib/environment";

import Grid from "src/components/home/grid";
import { Metadata } from "next";
import Sidebar from "src/components/home/sidebar";
import fetchData from "src/lib/fetchData";
import paths from "src/lib/paths";
import PromoBanner from "src/components/promoBanner";

export const metadata: Metadata = {
  title: "Dracula — Dark theme for 300+ apps",
  description:
    "Dracula is a color scheme for code editors and terminal emulators such as Vim, Notepad++, iTerm, VSCode, Terminal.app, ZSH, and much more.",
};

const Home = async () => {
  if (isProd()) {
    for (const path of paths) {
      const data = await fetchData(
        `${getBasePath()}/api/views?id=${path.params.theme}`,
      );

      path.params.views = parseInt(data.views) || 0;
    }

    paths.sort((a, b) => {
      return b.params.views - a.params.views;
    });
  }

  return (
    <section id="apps" className="home">
      <div className="container">
        <div className="side-wrapper">
          <Sidebar />
          <PromoBanner />
        </div>
        <div className="apps-wrapper">
          <div className="title-wrapper">
            <h2>Discover</h2>
            <span>Browse the ever-growing selection of apps supported.</span>
          </div>
          <Grid paths={paths} />P
        </div>
      </div>
    </section>
  );
};

export default Home;
