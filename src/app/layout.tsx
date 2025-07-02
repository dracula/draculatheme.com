import "./globals.css";

import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  fallback: ["sans-serif", "system-ui"]
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  fallback: ["sans-serif", "system-ui"]
});

export const metadata: Metadata = {
  title: "Dracula Theme",
  description: "One theme. All platforms."
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning={true}>
    <body className={`${inter.variable} ${dmSans.variable}`}>
      <NuqsAdapter>
        <Header />
        <main>{children}</main>
        <Footer />
      </NuqsAdapter>
    </body>
  </html>
);

export default RootLayout;
