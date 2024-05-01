"use client";

import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { LayoutGroup, motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { appFadeInUp } from "src/lib/framerMotion";

const Post = ({ post, containerElementType = "li" }) => {
  const MotionContainer = motion[containerElementType];
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
    <MotionContainer
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
          {containerElementType === "div" ? (
            <h1 className="title">{post.title}</h1>
          ) : (
            <span className="title">{post.title}</span>
          )}
          <span className="excerpt">{post.excerpt}</span>
        </div>
      </Link>
    </MotionContainer>
  );
};

const BlogpostList = () => {
  const highlightPost = allPosts
    .filter((post) => /true/.test(post.highlighted))
    .filter((post) => post.highlighted)
    .slice(0, 1)[0];

  const posts = allPosts
    .filter((post) => post._id !== highlightPost._id)
    .sort((a, b) =>
      compareDesc(new Date(a.date.createdAt), new Date(b.date.createdAt))
    );

  return (
    <LayoutGroup>
      <motion.section className="blog">
        <motion.div className="container">
          <div className="highlighted-post">
            <Post post={highlightPost} containerElementType="div" />
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
