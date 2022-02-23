import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID } from '../lib/gtag'

export default class extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:type" content="website" />
          <meta content="summary_large_image" name="twitter:card" />
          <link rel="icon" type="image/x-icon" href="/static/img/favicon.ico" />

          <script src="https://store.draculatheme.com/js/gumroad.js"></script>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
            }}
          />
        <Main />
        <NextScript />
      </Html>
    )
  }
}
