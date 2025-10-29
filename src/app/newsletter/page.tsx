import "./page.css";

import type { Metadata } from "next";

import { NewsletterWrapper } from "@/components/newsletter/wrapper";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Subscribe to Dracula's newsletter for exclusive content and updates. Join 11,460+ subscribers!",
  alternates: {
    canonical: "/newsletter"
  }
};

const NewsletterPage = () => <NewsletterWrapper />;

export default NewsletterPage;
