"use client";

import { format, parseISO } from "date-fns";

import Image from "next/image";
import { allPosts } from "contentlayer/generated";
import { fadeInUp } from "src/lib/framerMotion";
import { getMDXComponent } from "next-contentlayer/hooks";
import { motion } from "framer-motion";

// export const generateStaticParams = async () =>
//   allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

// export const generateMetadata = ({ params }) => {
//   const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
//   return { title: post.title };
// };

const Post = ({ params }: { params: { slug: string } }) => {
  const slug = "posts/" + params.slug;
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  const Content = getMDXComponent(post.body.code);

  return (
    <motion.article
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="post"
    >
      <div className="cover-image">
        <Image
          src={post.coverImage}
          alt={post.title}
          width={400}
          height={200}
          quality={100}
          unoptimized={true}
          priority
        />
      </div>
      <div className="author-and-date">
        <Image
          src={post.author.avatar}
          alt={post.author.name}
          width={40}
          height={40}
          className="avatar"
        />
        <span>{post.author.name}</span>
        <span>|</span>
        <span>
          <time dateTime={post.date.createdAt}>
            {format(parseISO(post.date.createdAt), "LLLL d, yyyy")}
          </time>
        </span>
      </div>
      <h1>{post.title}</h1>
      <div className="content-wrapper">
        <Content />
      </div>
    </motion.article>
  );
};

export default Post;
