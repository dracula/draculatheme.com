import "./page.css";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Hero } from "@/components/shared/hero";
import type { Post } from "@/lib/markdown";
import {
  createStructuredDataScriptId,
  JsonLdScript
} from "@/utils/json-ld-script";
import { getMdxDataFromDirectory } from "@/utils/mdx";

interface PostCardProps {
  post: Post;
  imageWidth: number;
  imageHeight: number;
  href: string;
}

const PostCard = ({ post, imageWidth, imageHeight, href }: PostCardProps) => (
  <li key={post.slug}>
    <Link href={href}>
      <div className="cover">
        <Image
          src={post.cover}
          alt={post.title}
          width={imageWidth}
          height={imageHeight}
        />
      </div>
      <div className="content">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <p className="meta">
          <span>{post.readingTime} read / Published in </span>
          <time dateTime={post.date.createdAt}>
            {new Date(post.date.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </time>
        </p>
      </div>
    </Link>
  </li>
);

export const metadata: Metadata = {
  title: "Blog",
  description:
    "“Truly there is no such thing as finality.” - Bram Stoker, Dracula",
  alternates: {
    canonical: "/blog"
  }
};

const structuredDataScriptId = createStructuredDataScriptId(
  "blog",
  "structured",
  "data"
);

const BlogPage = async () => {
  const allPosts = getMdxDataFromDirectory<Post>("content/blog");
  const featured = allPosts.filter((post: Post) => post.featured).slice(0, 2);
  const posts = allPosts.filter((post: Post) => !featured.includes(post));

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
      <section className="container blog">
        {featured.length > 0 && (
          <ul>
            {featured.map((post: Post) => (
              <PostCard
                key={post.slug}
                post={post}
                imageWidth={1200}
                imageHeight={678}
                href={`/blog/${post.slug}`}
              />
            ))}
          </ul>
        )}
        <ul>
          {posts.map((post: Post) => (
            <PostCard
              key={post.slug}
              post={post}
              imageWidth={1200}
              imageHeight={678}
              href={`/blog/${post.slug}`}
            />
          ))}
        </ul>
      </section>
      <JsonLdScript id={structuredDataScriptId} jsonLd={jsonLd} />
    </>
  );
};

export default BlogPage;
