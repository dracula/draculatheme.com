import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Dracula Theme",
  description: "One theme. All platforms."
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning={true}>
    <body className={inter.variable}>
      <NuqsAdapter>
        <Header />
        <main>{children}</main>
        <Footer />
      </NuqsAdapter>
    </body>
  </html>
);

export default RootLayout;
