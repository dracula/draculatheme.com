import "luxacss";
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
import Script from "next/script";

const inter = localFont({
  adjustFontFallback: false,
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  preload: true,
  src: [
    {
      path: "../../public/fonts/inter.woff2",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter.woff2",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  weight: "400 900",
});

const satoshi = localFont({
  adjustFontFallback: false,
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  preload: true,
  src: [
    {
      path: "../../public/fonts/satoshi.woff2",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi.woff2",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  weight: "400 900",
});

const jetbrainsMono = localFont({
  adjustFontFallback: false,
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
  src: [
    {
      path: "../../public/fonts/jetbrains-mono.woff2",
      style: "normal",
    },
    {
      path: "../../public/fonts/jetbrains-mono.woff2",
      style: "italic",
    },
  ],
  variable: "--font-jetbrains-mono",
  weight: "400 700",
});

const caveat = localFont({
  adjustFontFallback: false,
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  src: [
    {
      path: "../../public/fonts/caveat.woff2",
      style: "normal",
    },
    {
      path: "../../public/fonts/caveat.woff2",
      style: "italic",
    },
  ],
  variable: "--font-caveat",
  weight: "400 700",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://draculatheme.com"),
  title: {
    default: "Dracula Theme",
    template: "%s • Dracula Theme",
  },
  authors: {
    name: "Dracula Team",
    url: "https://draculatheme.com/about",
  },
  description:
    "Dracula is a color scheme for code editors and terminal emulators such as Vim, Notepad++, iTerm, VSCode, Terminal.app, ZSH, and much more.",
  openGraph: {
    title: "Dracula Theme",
    description:
      "Dracula is a color scheme for code editors and terminal emulators such as Vim, Notepad++, iTerm, VSCode, Terminal.app, ZSH, and much more.",
    url: "https://draculatheme.com",
    siteName: "Dracula Theme",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://draculatheme.com/images/og.png",
      },
    ],
  },
  twitter: {
    title: "Dracula Theme",
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

const RootLayout = async ({ children }) => {
  const githubStars = await fetchData(`${getBasePath()}/api/githubStars`);

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#7359F8" />
      </head>
      <body
        className={`${inter.variable} ${satoshi.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
      >
        <Providers>
          <Header stars={githubStars} />
          <Hero />
          <PageTransition>
            {children}
            <Newsletter />
          </PageTransition>
          <Footer />
        </Providers>
        <Script
          src="https://store.draculatheme.com/js/gumroad.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://plausible.io/js/script.js"
          data-domain="draculatheme.com"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
};

export default RootLayout;
