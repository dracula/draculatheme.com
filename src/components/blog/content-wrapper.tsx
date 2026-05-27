"use client";

import Image from "next/image";
import Link from "next/link";
import { parseAsString, useQueryStates } from "nuqs";
import { useMemo } from "react";

import { TickIcon } from "@/icons/tick";
import type { Post } from "@/lib/markdown";
import {
  getBlogCategoryOptions,
  isBlogCategory,
  matchesBlogCategory
} from "@/utils/blog/filter";

interface PostCardProps {
  post: Post;
  imageWidth: number;
  imageHeight: number;
  href: string;
}

const PostCard = ({ post, imageWidth, imageHeight, href }: PostCardProps) => (
  <li>
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
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <p className="meta">
          <span>{post.readingTime} read / Published in </span>
          <time dateTime={post.date.createdAt}>
            {new Date(post.date.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </time>
        </p>
      </div>
    </Link>
  </li>
);

export const ContentWrapper = ({ posts }: { posts: Post[] }) => {
  const [{ category }, setQueryStates] = useQueryStates(
    {
      category: parseAsString.withDefault("all")
    },
    { history: "replace" }
  );

  const blogCategoryOptions = useMemo(
    () => getBlogCategoryOptions(posts),
    [posts]
  );
  const selectedCategory = isBlogCategory(category, blogCategoryOptions)
    ? category
    : "all";
  const filteredPosts = posts.filter((post) =>
    matchesBlogCategory(post, selectedCategory)
  );
  const highlightedPosts = filteredPosts
    .filter((post) => post.featured === "true" || post.featured === true)
    .slice(0, 2);
  const promotedPosts = filteredPosts
    .filter((post) => !highlightedPosts.includes(post))
    .slice(0, Math.max(0, 2 - highlightedPosts.length));
  const postsToHighlight = [...highlightedPosts, ...promotedPosts];
  const regularPosts = filteredPosts.filter(
    (post) => !postsToHighlight.includes(post)
  );

  return (
    <>
      <section className="container blog">
        {postsToHighlight.length > 0 && (
          <ul className="highlighted-posts">
            {postsToHighlight.map((post) => (
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
        <nav aria-label="Blog filters">
          <fieldset>
            <legend className="sr-only">Category</legend>
            {blogCategoryOptions.map((blogCategory) => (
              <label key={blogCategory.name} tabIndex={0}>
                <input
                  type="radio"
                  name="category"
                  value={blogCategory.name}
                  checked={selectedCategory === blogCategory.name}
                  onChange={() =>
                    setQueryStates({ category: blogCategory.name })
                  }
                />
                <TickIcon />
                <span>{blogCategory.label}</span>
              </label>
            ))}
          </fieldset>
        </nav>
        <ul className="regular-posts">
          {regularPosts.map((post) => (
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
