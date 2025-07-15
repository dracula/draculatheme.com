import "./page.css";

import Image from "next/image";
import Link from "next/link";

import { CustomMDX } from "@/components/shared/mdx";
import { ReturnArrow } from "@/icons/return-arrow";
import { type Author, authors } from "@/lib/authors";
import type { Post } from "@/lib/markdown";
import type { Props } from "@/lib/types";
import {
  getMdxDataFromDirectory,
  getMdxFromFile
} from "@/utils/mdx/get-mdx-data-from-directory";

export const generateStaticParams = async () => {
  const posts = getMdxDataFromDirectory<Post>("content/blog");
  return posts.map((post) => ({ slug: post.slug }));
};

const BlogPostPage = async (props: Props) => {
  const params = await props.params;
  const { slug } = params;
  const post = (await getMdxFromFile("content/blog", slug)) as Post;

  return (
    <section className="container prose post">
      <Link href="/blog" className="back-link">
        <ReturnArrow />
        <span>Blog</span>
      </Link>
      <div className="meta">
        <time dateTime={post.date.createdAt}>
          {new Date(post.date.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </time>
        <span>/</span>
        <span>By</span>
        <div className="authors">
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
                <p>{author?.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <h1>{post.title}</h1>
      <CustomMDX {...post.content} />
    </section>
  );
};

export default BlogPostPage;
