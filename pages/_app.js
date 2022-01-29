import App from "next/app";
import Router from "next/router";

import "@dracula/dracula-ui/styles/dracula-ui.css";
import "../styles/main.css";

import * as gtag from "../lib/gtag";
import easterEgg from "../lib/easter-egg";

Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

const Noop = ({ children }) => children;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component.Layout || Noop;

    // if (process.env.NODE_ENV === 'production') {
    //   console.log(easterEgg, "font-family:monospace");
    // }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}
