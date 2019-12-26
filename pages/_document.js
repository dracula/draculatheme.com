import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import { GA_TRACKING_ID } from '../lib/gtag';

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />

          <link rel="stylesheet" href="//cdn.jsdelivr.net/flexboxgrid/6.3.0/flexboxgrid.min.css" type="text/css" />
          <link rel="stylesheet" href="/static/css/main.css" />
          <link rel="icon" type="image/x-icon" href="/static/img/favicon.ico" />

          <script src="https://use.typekit.net/ybn2zyq.js"></script>
          <script dangerouslySetInnerHTML={{ __html: `try{Typekit.load({ async: true });}catch(e){}` }}></script>

          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}} />
        </Head>
        <Main />
        <NextScript />
      </html>
    )
  }
}