"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

import { Image } from "./image";

const mdxComponents = {
  img: Image
};

export const CustomMDX = (mdxSource: MDXRemoteSerializeResult) => (
  <MDXRemote {...mdxSource} components={mdxComponents} lazy />
);
