import "./globals.css";

import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import Script from "next/script";

import { AnnouncementBar } from "@/components/shared/announcement-bar";
import { DraculaRadio } from "@/components/shared/dracula-radio";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { themeBootstrapScript } from "@/components/shared/theme-provider/theme-bootstrap-script";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  fallback: ["sans-serif", "system-ui"],
  adjustFontFallback: true
});

const dmMono = DM_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  fallback: ["monospace", "system-ui"],
  preload: false
});

export const metadata: Metadata = {
  metadataBase: new URL("https://draculatheme.com"),
  title: {
    default: "Dracula Theme",
    template: "%s • Dracula Theme"
  },
  authors: {
    name: "Dracula Team",
    url: "https://draculatheme.com/about"
  },
  description:
    "Dracula is a color scheme for code editors and terminal emulators such as Vim, Notepad++, iTerm, VSCode, Terminal.app, ZSH, and much more.",
  openGraph: {
    title: "Dracula Theme",
    description:
      "Dracula is a color scheme for code editors and terminal emulators such as Vim, Notepad++, iTerm, VSCode, Terminal.app, ZSH, and much more.",
    siteName: "Dracula Theme",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://draculatheme.com/images/og.webp"
      }
    ]
  },
  twitter: {
    title: "Dracula Theme",
    description:
      "Dracula is a color scheme for code editors and terminal emulators such as Vim, Notepad++, iTerm, VSCode, Terminal.app, ZSH, and much more.",
    card: "summary_large_image",
    images: ["https://draculatheme.com/images/og.webp"],
    site: "@draculatheme",
    creator: "@draculatheme"
  }
};

export const viewport = {
  colorScheme: "dark",
  themeColor: "#0E0D11"
};

const RootLayout = async ({
  children
}: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={`${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <Script id="theme-bootstrap" strategy="beforeInteractive">
        {themeBootstrapScript}
      </Script>
      <ThemeProvider>
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <DraculaRadio />
      </ThemeProvider>
      <Script
        src="https://plausible.io/js/script.js"
        data-domain="draculatheme.com"
        strategy="afterInteractive"
      />
    </body>
  </html>
);

export default RootLayout;
