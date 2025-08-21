import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkGfm from "remark-gfm";

import { AnchorHeading } from "./anchor-heading";
import { Code } from "./code";
import { Image } from "./image";
import { Table } from "./table";

interface HeadingProps {
  children: React.ReactNode;
}

const mdxOptions = (format: "md" | "mdx") => {
  return {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeUnwrapImages],
      format: format
    }
  };
};

const mdxComponents = {
  h1: (props: HeadingProps) => <AnchorHeading level={1} {...props} />,
  h2: (props: HeadingProps) => <AnchorHeading level={2} {...props} />,
  h3: (props: HeadingProps) => <AnchorHeading level={3} {...props} />,
  h4: (props: HeadingProps) => <AnchorHeading level={4} {...props} />,
  h5: (props: HeadingProps) => <AnchorHeading level={5} {...props} />,
  h6: (props: HeadingProps) => <AnchorHeading level={6} {...props} />,
  code: Code,
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  img: Image,
  table: Table
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
