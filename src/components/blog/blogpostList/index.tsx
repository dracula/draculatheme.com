"use client";

import { LayoutGroup, motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { appFadeInUp } from "src/lib/framerMotion";
import { compareDesc } from "date-fns";

const Post = ({ post }) => {
  const control = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  const modifiedUrl = post.url.replace("/posts", "");

  return (
    <motion.li
      ref={ref}
      variants={appFadeInUp}
      initial="hidden"
      animate={control}
      exit="exit"
    >
      <Link href={modifiedUrl} className="post" prefetch={false}>
        <div className="cover-image">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={400}
            height={200}
            quality={100}
            priority={false}
          />
        </div>
        <div className="content">
          <span className="title">{post.title}</span>
          <span className="excerpt">{post.excerpt}</span>
        </div>
      </Link>
    </motion.li>
  );
};

const BlogpostList = () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date.createdAt), new Date(b.date.createdAt)),
  );

  const highlightPost = allPosts
    .filter((post) => /true/.test(post.highlighted))
    .filter((post) => post.highlighted)
    .slice(0, 1)[0];

  return (
    <LayoutGroup>
      <motion.section className="blog">
        <motion.div className="container">
          <div className="highlighted-post">
            <Post post={highlightPost} />
          </div>
          <ul className="blogpost-list">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </ul>
        </motion.div>
      </motion.section>
    </LayoutGroup>
  );
};

export default BlogpostList;
