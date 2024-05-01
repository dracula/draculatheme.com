import "./page.scss";
import { Metadata } from "next";
import BlogpostList from "src/components/blog/blogpostList";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "The journey of building the most universal dark theme ever made.",
  alternates: {
    canonical: "/blog"
  }
};

const Blog = () => {
  return <BlogpostList />;
};

export default Blog;
