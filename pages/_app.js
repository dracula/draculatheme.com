import '../styles/main.css'

import * as gtag from '../lib/gtag'

import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// import easterEgg from '../lib/easter-egg'

const Noop = ({ children }) => children

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const Layout = Component.Layout || Noop

  // if (process.env.NODE_ENV === 'production') {
  //   console.log(easterEgg, "font-family:monospace");
  // }

  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
