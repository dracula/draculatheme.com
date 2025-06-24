import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { CustomMDX } from "@/components/shared/mdx";
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
    <section className="container">
      <Link href="/blog">Blog</Link>
      <time dateTime={post.date.createdAt}>
        {new Date(post.date.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        })}
      </time>
      <h1>{post.title}</h1>
      <div>
        {post.authors.map((humanId) => {
          const author = authors.find(
            (author: Author) => author.id === humanId
          );
          if (!author) return null;

          return (
            <Fragment key={humanId}>
              <div>
                <Image
                  src={author?.avatar}
                  width={40}
                  height={40}
                  alt={author?.name}
                />
              </div>
              <p>{author?.name}</p>
            </Fragment>
          );
        })}
      </div>
      <CustomMDX {...post.content} />
    </section>
  );
};

export default BlogPostPage;
