import "./globals.css";

import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/react";

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
  title: "Dracula Theme",
  description: "One theme. All platforms."
};

const RootLayout = async ({
  children
}: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning>
    <body className={`${dmSans.variable} ${dmMono.variable}`}>
      <NuqsAdapter>
        <Header />
        <main>{children}</main>
        <Footer />
      </NuqsAdapter>
    </body>
  </html>
);

export default RootLayout;
