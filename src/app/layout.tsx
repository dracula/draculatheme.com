import "../styles/globals.scss";

import Footer from "src/components/footer";
import Header from "src/components/header";
import Hero from "src/components/hero";
import type { Metadata } from "next";
import Newsletter from "src/components/newsletter";
import PageTransition from "src/components/pageTransition";
import Providers from "src/components/providers";
import fetchData from "src/lib/fetchData";
import { getBasePath } from "src/lib/environment";
import localFont from "next/font/local";

const inter = localFont({
  display: "swap",
  src: "../../public/fonts/inter.ttf",
  variable: "--font-inter",
});

const satoshi = localFont({
  display: "swap",
  src: "../../public/fonts/satoshi.ttf",
  variable: "--font-satoshi",
});

const jetbrainsMono = localFont({
  display: "swap",
  src: "../../public/fonts/jetbrains-mono.ttf",
  variable: "--font-jetbrains-mono",
});

const caveat = localFont({
  display: "swap",
  src: "../../public/fonts/caveat.ttf",
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://draculatheme.com"),
  title: {
    default: "Dracula Theme",
    template: "%s - Dracula Theme",
  },
  description:
    "The most famous dark theme ever created and available everywhere. 🦇",
  openGraph: {
    url: "https://draculatheme.com/api/og",
    siteName: "Dracula Theme",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Dracula Theme",
    card: "summary_large_image",
  },
};

const RootLayout = async ({ children }) => {
  const ppp = await fetchData(`${getBasePath()}/api/ppp`);
  const githubStars = await fetchData(`${getBasePath()}/api/githubStars`);

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${satoshi.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
      >
        <Providers>
          <Header stars={githubStars} />
          <Hero ppp={ppp} />
          <PageTransition>
            {children}
            <Newsletter />
          </PageTransition>
          <Footer />
        </Providers>
        <script src="https://store.draculatheme.com/js/gumroad.js"></script>
      </body>
    </html>
  );
};

export default RootLayout;
