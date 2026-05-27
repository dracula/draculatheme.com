import "./page.css";

import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

import { ContentWrapper } from "@/components/blog/content-wrapper";
import { Hero } from "@/components/shared/hero";
import type { Post } from "@/lib/markdown";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";
import { getMdxDataFromDirectory } from "@/utils/mdx";
import { createMetadata } from "@/utils/metadata";

const title = "Blog";
const description =
  "“Truly there is no such thing as finality.” - Bram Stoker, Dracula";

export const metadata: Metadata = createMetadata({
  title,
  description,
  canonicalPath: "/blog"
});

const structuredDataScriptId = createStructuredDataScriptId(
  "blog",
  "structured",
  "data"
);

const BlogPage = async () => {
  const allPosts = getMdxDataFromDirectory<Post>("content/blog");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Dracula Theme Blog",
    description:
      "“Truly there is no such thing as finality.” - Bram Stoker, Dracula",
    url: "https://draculatheme.com/blog",
    inLanguage: "en",
    author: {
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
    publisher: {
      "@type": "Organization",
      name: "Dracula Theme",
      url: "https://draculatheme.com",
      logo: {
        "@type": "ImageObject",
        url: "https://draculatheme.com/images/hero/default.svg"
      }
    },
    about: {
      "@type": "SoftwareApplication",
      name: "Dracula Theme",
      url: "https://draculatheme.com"
    },
    blogPost: allPosts.map((post: Post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `https://draculatheme.com/blog/${post.slug}`,
      image: post.cover,
      datePublished: post.date.createdAt,
      dateModified: post.date.updatedAt || post.date.createdAt,
      author: {
        "@type": "Organization",
        name: "Dracula Theme"
      },
      publisher: {
        "@type": "Organization",
        name: "Dracula Theme",
        logo: {
          "@type": "ImageObject",
          url: "https://draculatheme.com/images/hero/default.svg"
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://draculatheme.com/blog/${post.slug}`
      },
      keywords: ["dracula theme", "development", "design", "programming"]
    })),
    isPartOf: {
      "@type": "WebSite",
      name: "Dracula Theme",
      url: "https://draculatheme.com"
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: allPosts.length,
      itemListElement: allPosts.map((post: Post, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "BlogPosting",
          headline: post.title,
          url: `https://draculatheme.com/blog/${post.slug}`,
          image: post.cover,
          datePublished: post.date.createdAt
        }
      }))
    },
    potentialAction: {
      "@type": "ReadAction",
      target: "https://draculatheme.com/blog"
    }
  };

  return (
    <>
      <Hero />
      <Suspense>
        <NuqsAdapter>
          <ContentWrapper posts={allPosts} />
        </NuqsAdapter>
      </Suspense>
      <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
    </>
  );
};

export default BlogPage;
