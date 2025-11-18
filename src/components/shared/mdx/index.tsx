import { MDXRemote } from "next-mdx-remote/rsc";
import type { AnchorHTMLAttributes } from "react";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkGfm from "remark-gfm";

import { paths } from "@/lib/paths";

import { AnchorHeading } from "./anchor-heading";
import { Code } from "./code";
import { createImageComponent } from "./image";
import { Table } from "./table";

interface HeadingProps {
  children: React.ReactNode;
}

interface RepositoryContext {
  repo: string;
  branch: string;
}

const sanitizeHref = (href?: string) => {
  if (!href) {
    return href;
  }

  const trimmed = href.trim();
  const markdownLinkMatch = trimmed.match(/^\[[^\]]*]\(([^)]+)\)$/);

  if (markdownLinkMatch) {
    return markdownLinkMatch[1];
  }

  return trimmed;
};

const isExternalUrl = (value: string) =>
  /^([a-z][a-z0-9+.-]*:)?\/\//i.test(value);

const normalizePath = (value: string) =>
  value.replace(/^(\.\/)+/, "").replace(/^\/+/, "");

const buildGithubBlobUrl = (path: string, context: RepositoryContext) =>
  `https://github.com/dracula/${context.repo}/blob/${context.branch}/${normalizePath(path)}`;

const internalRoutePrefixes = new Set([
  "",
  "about",
  "blog",
  "contribute",
  "newsletter",
  "open",
  "pro",
  "shop",
  "spec",
  "sitemap.xml"
]);

const themeSlugs = new Set(paths.map((item) => item.repo));

const isInternalSiteRoute = (href: string) => {
  const normalized = normalizePath(href);
  if (normalized.length === 0) {
    return true;
  }

  const [firstSegment] = normalized.split("/");

  return (
    internalRoutePrefixes.has(firstSegment) || themeSlugs.has(firstSegment)
  );
};

const resolveHref = (href: string | undefined, context?: RepositoryContext) => {
  const sanitizedHref = sanitizeHref(href);

  if (!sanitizedHref) {
    return sanitizedHref;
  }

  if (sanitizedHref.startsWith("#")) {
    return sanitizedHref;
  }

  if (sanitizedHref.startsWith("mailto:") || sanitizedHref.startsWith("tel:")) {
    return sanitizedHref;
  }

  if (sanitizedHref.startsWith("//")) {
    return `https:${sanitizedHref}`;
  }

  if (isExternalUrl(sanitizedHref)) {
    return sanitizedHref;
  }

  if (!context) {
    return sanitizedHref;
  }

  if (sanitizedHref.startsWith("/")) {
    if (isInternalSiteRoute(sanitizedHref)) {
      return sanitizedHref;
    }
    return buildGithubBlobUrl(sanitizedHref, context);
  }

  return buildGithubBlobUrl(sanitizedHref, context);
};

const createLinkComponent = (context?: RepositoryContext) => {
  const Link = ({
    href,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const resolvedHref = resolveHref(href, context);

    if (!resolvedHref) {
      return <span {...props}>{children}</span>;
    }

    const isExternal = isExternalUrl(resolvedHref);

    return (
      <a
        {...props}
        href={resolvedHref}
        target={isExternal ? "_blank" : props.target}
        rel={isExternal ? "noopener noreferrer" : props.rel}
      >
        {children}
      </a>
    );
  };

  Link.displayName = "MdxLink";

  return Link;
};

const mdxOptions = (format: "md" | "mdx") => {
  return {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeUnwrapImages],
      format: format
    }
  };
};

const createMdxComponents = (
  context?: RepositoryContext,
  idPrefix?: string
) => {
  const Image = createImageComponent({ repositoryContext: context });
  const Link = createLinkComponent(context);

  return {
    h1: (props: HeadingProps) => (
      <AnchorHeading level={1} idPrefix={idPrefix} {...props} />
    ),
    h2: (props: HeadingProps) => (
      <AnchorHeading level={2} idPrefix={idPrefix} {...props} />
    ),
    h3: (props: HeadingProps) => (
      <AnchorHeading level={3} idPrefix={idPrefix} {...props} />
    ),
    h4: (props: HeadingProps) => (
      <AnchorHeading level={4} idPrefix={idPrefix} {...props} />
    ),
    h5: (props: HeadingProps) => (
      <AnchorHeading level={5} idPrefix={idPrefix} {...props} />
    ),
    h6: (props: HeadingProps) => (
      <AnchorHeading level={6} idPrefix={idPrefix} {...props} />
    ),
    code: Code,
    pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    img: Image,
    table: Table,
    a: Link
  };
};

export const CustomMDX = ({
  source,
  format = "mdx",
  repositoryContext,
  idPrefix
}: {
  source: string;
  format?: "md" | "mdx";
  repositoryContext?: RepositoryContext;
  idPrefix?: string;
}) => (
  <MDXRemote
    source={source}
    components={createMdxComponents(repositoryContext, idPrefix)}
    options={mdxOptions(format)}
  />
);
