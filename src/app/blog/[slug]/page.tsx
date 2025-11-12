import "./page.css";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CustomMDX } from "@/components/shared/mdx";
import { OnThisPage } from "@/components/shared/mdx/on-this-page";
import { ProBanner } from "@/components/shared/pro-banner";
import { ReturnArrow } from "@/icons/return-arrow";
import { type Author, authors } from "@/lib/authors";
import type { Post } from "@/lib/markdown";
import type { Props } from "@/lib/types";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";
import { getMdxDataFromDirectory, getMdxFromFile } from "@/utils/mdx";
import { extractHeadings } from "@/utils/mdx/extract-headings";

export const generateStaticParams = async () => {
  const posts = getMdxDataFromDirectory<Post>("content/blog");
  return posts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = async (
  props: Props
): Promise<Metadata | undefined> => {
  const params = await props.params;
  const { slug } = params;
  const post = getMdxFromFile("content/blog", slug) as Post;

  if (!post) {
    notFound();
  }

  const title = post.title;
  const description = post.excerpt;
  const ogImage = post.cover;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://draculatheme.com/blog/${params.slug}`,
      images: [
        {
          url: ogImage
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    },
    alternates: {
      canonical: `/blog/${params.slug}`
    }
  };
};

const BlogPostPage = async (props: Props) => {
  const params = await props.params;
  const { slug } = params;
  const post = getMdxFromFile("content/blog", slug) as Post;

  if (!post) {
    notFound();
  }

  const postAuthors = post.authors
    .map((humanId) => authors.find((author: Author) => author.id === humanId))
    .filter((author): author is Author => author !== undefined);
  const structuredDataScriptId = createStructuredDataScriptId(
    "blog",
    slug,
    "structured",
    "data"
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    url: `https://draculatheme.com/blog/${slug}`,
    datePublished: post.date.createdAt,
    dateModified: post.date.updatedAt || post.date.createdAt,
    author: postAuthors.map((author) => ({
      "@type": "Person",
      name: author.name,
      url: author.github,
      image: author.avatar
    })),
    publisher: {
      "@type": "Organization",
      name: "Dracula Theme",
      url: "https://draculatheme.com",
      logo: {
        "@type": "ImageObject",
        url: "https://draculatheme.com/images/hero/default.svg"
      },
      sameAs: [
        "https://github.com/dracula",
        "https://twitter.com/draculatheme",
        "https://discord.gg/yDcFsrB"
      ]
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://draculatheme.com/blog/${slug}`
    },
    about: {
      "@type": "SoftwareApplication",
      name: "Dracula Theme",
      url: "https://draculatheme.com"
    },
    isPartOf: {
      "@type": "Blog",
      name: "Dracula Theme Blog",
      url: "https://draculatheme.com/blog"
    },
    inLanguage: "en",
    keywords: [
      "dracula theme",
      "development",
      "design",
      "programming",
      "color scheme"
    ],
    wordCount: post.content.split(/\s+/).length,
    timeRequired: post.readingTime,
    potentialAction: {
      "@type": "ReadAction",
      target: `https://draculatheme.com/blog/${slug}`
    }
  };

  return (
    <>
      <section className="container post">
        <div className="content">
          <Link href="/blog" className="back-link">
            <ReturnArrow />
            <span>Blog</span>
          </Link>
          <p className="time">
            <span>Published in </span>
            <time dateTime={post.date.createdAt}>
              {new Date(post.date.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </time>
          </p>
          <div className="authors">
            <span>By</span>
            {post.authors.map((humanId) => {
              const author = authors.find(
                (author: Author) => author.id === humanId
              );

              if (!author) {
                return null;
              }

              return (
                <Link
                  key={humanId}
                  href={author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author"
                >
                  <div className="avatar">
                    <Image
                      src={author?.avatar}
                      width={40}
                      height={40}
                      alt={`${author?.name}'s Avatar`}
                    />
                  </div>
                  <span>{author?.name}</span>
                </Link>
              );
            })}
          </div>
          <article className="prose">
            <h1>{post.title}</h1>
            <CustomMDX source={post.content} />
          </article>
          <div className="pro-call-to-action">
            <ProBanner />
          </div>
        </div>
        <OnThisPage headings={extractHeadings(post.content)} />
      </section>
      <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
    </>
  );
};

export default BlogPostPage;
