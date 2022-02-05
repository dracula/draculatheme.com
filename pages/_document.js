import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../lib/gtag";

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

					<script
						dangerouslySetInnerHTML={{
							__html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KMBFFLG');
          `,
						}}
					/>
				</Head>

				<noscript
					dangerouslySetInnerHTML={{
						__html: `
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KMBFFLG" height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `,
					}}
				/>

				<Main />
				<NextScript />
			</Html>
		);
	}
}
