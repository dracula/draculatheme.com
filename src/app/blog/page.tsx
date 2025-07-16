import "./page.css";

import Image from "next/image";
import Link from "next/link";

import { Hero } from "@/components/shared/hero";
import type { Post } from "@/lib/markdown";
import { getMdxDataFromDirectory } from "@/utils/mdx/get-mdx-data-from-directory";

interface PostCardProps {
  post: Post;
  imageWidth: number;
  imageHeight: number;
  href: string;
}

const PostCard = ({ post, imageWidth, imageHeight, href }: PostCardProps) => (
  <li key={post.slug}>
    <Link href={href}>
      <div className="cover">
        <Image
          src={post.cover}
          alt={post.title}
          width={imageWidth}
          height={imageHeight}
        />
      </div>
      <div className="content">
        <time dateTime={post.date.createdAt}>
          {new Date(post.date.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </time>
        <h4>{post.title}</h4>
        <p>{post.excerpt}</p>
      </div>
    </Link>
  </li>
);

const BlogPage = async () => {
  const posts = getMdxDataFromDirectory<Post>("content/blog");
  const featured = posts.filter((post: Post) => post.featured).slice(0, 2);

  return (
    <>
      <Hero />
      <section className="container blog">
        {featured.length > 0 && (
          <ul>
            {featured.map((post: Post) => (
              <PostCard
                key={post.slug}
                post={post}
                imageWidth={1200}
                imageHeight={678}
                href={`/blog/${post.slug}`}
              />
            ))}
          </ul>
        )}
        <ul>
          {posts.map((post: Post) => (
            <PostCard
              key={post.slug}
              post={post}
              imageWidth={1200}
              imageHeight={678}
              href={`/blog/${post.slug}`}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default BlogPage;
