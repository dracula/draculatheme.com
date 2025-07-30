import "./page.css";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CustomMDX } from "@/components/shared/mdx";
import { OnThisPage } from "@/components/shared/mdx/on-this-page";
import { ReturnArrow } from "@/icons/return-arrow";
import { type Author, authors } from "@/lib/authors";
import type { Post } from "@/lib/markdown";
import type { Props } from "@/lib/types";
import { getMdxDataFromDirectory, getMdxFromFile } from "@/utils/mdx";
import { extractHeadings } from "@/utils/mdx/extract-headings";

export const generateStaticParams = async () => {
  const posts = getMdxDataFromDirectory<Post>("content/blog");
  return posts.map((post) => ({ slug: post.slug }));
};

const BlogPostPage = async (props: Props) => {
  const params = await props.params;
  const { slug } = params;
  const post = getMdxFromFile("content/blog", slug) as Post;

  if (!post) {
    notFound();
  }

  return (
    <section className="container post">
      <div className="content">
        <Link href="/blog" className="back-link">
          <ReturnArrow />
          <span>Blog</span>
        </Link>
        <p className="time">
          <span>Published in </span>
          <time dateTime={post.date.createdAt}>
            {new Date(post.date.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </time>
        </p>
        <div className="authors">
          <span>By</span>
          {post.authors.map((humanId) => {
            const author = authors.find(
              (author: Author) => author.id === humanId
            );

            if (!author) return null;

            return (
              <Link
                key={humanId}
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="author"
              >
                <div className="avatar">
                  <Image
                    src={author?.avatar}
                    width={40}
                    height={40}
                    alt={author?.name}
                  />
                </div>
                <span>{author?.name}</span>
              </Link>
            );
          })}
        </div>
        <article className="prose">
          <h1>{post.title}</h1>
          <CustomMDX source={post.content} />
        </article>
      </div>
      <OnThisPage headings={extractHeadings(post.content)} />
    </section>
  );
};

export default BlogPostPage;
