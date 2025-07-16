import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeUnwrapImages from "rehype-unwrap-images";

import { Code } from "./code";
import { Image } from "./image";

const mdxComponents = {
  img: Image,
  code: Code,
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>
};

const mdxOptions = (format: "md" | "mdx") => {
  return {
    mdxOptions: {
      rehypePlugins: [rehypeUnwrapImages],
      format: format
    }
  };
};

export const CustomMDX = ({
  source,
  format = "mdx"
}: {
  source: string;
  format?: "md" | "mdx";
}) => (
  <MDXRemote
    source={source}
    components={mdxComponents}
    options={mdxOptions(format)}
  />
);
