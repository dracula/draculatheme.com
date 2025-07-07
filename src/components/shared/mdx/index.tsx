"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

import { Code } from "./code";
import { Image } from "./image";

const mdxComponents = {
  img: Image,
  code: Code,
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>
};

export const CustomMDX = (mdxSource: MDXRemoteSerializeResult) => (
  <MDXRemote {...mdxSource} components={mdxComponents} lazy />
);
