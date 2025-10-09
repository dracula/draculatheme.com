import "./globals.css";

import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";

import { DraculaRadio } from "@/components/shared/dracula-radio";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  fallback: ["sans-serif", "system-ui"]
});

const dmMono = DM_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  fallback: ["monospace", "system-ui"]
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
    url: "https://draculatheme.com",
    siteName: "Dracula Theme",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://draculatheme.com/images/og.png"
      }
    ]
  },
  twitter: {
    title: "Dracula Theme",
    card: "summary_large_image"
  },
  alternates: {
    canonical: "/"
  }
};

export const viewport = {
  colorScheme: "dark",
  themeColor: "#0E0D11"
};

const RootLayout = async ({
  children
}: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning={true}>
    <body className={`${dmSans.variable} ${dmMono.variable}`}>
      <ThemeProvider defaultTheme="dark" enableSystem={false}>
        <Header />
        <main>{children}</main>
        <DraculaRadio />
        <Footer />
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
