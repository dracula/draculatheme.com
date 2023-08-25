import Document, { Head, Html, Main, NextScript } from "next/document";

import React from "react";

export default class extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:type" content="website" />
          <meta content="summary_large_image" name="twitter:card" />
          <link rel="icon" type="image/x-icon" href="/static/img/favicon.ico" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
            rel="stylesheet"
          />

          <script src="https://store.draculatheme.com/js/gumroad.js"></script>
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}
