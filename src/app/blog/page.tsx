import "./page.scss";

import BlogpostList from "src/components/blog/blogpostList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "The journey of building the most universal dark theme ever made.",
  alternates: {
    canonical: "/blog/",
  },
};

const Blog = () => {
  return <BlogpostList />;
};

export default Blog;
