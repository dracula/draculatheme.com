import "./page.scss";

import { Metadata } from "next";
import Post from "src/components/blog/post";
import { allPosts } from "contentlayer/generated";

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const slug = "posts/" + params.slug;
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) {
    return;
  }

  const title = post.title;
  const description = post.excerpt;
  const ogImage = post.coverImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://draculatheme.com/blog/${params.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `/blog/${params.slug}/`,
    },
  };
}

const Blogpost = ({ params }) => {
  return (
    <section className="blogpost">
      <div className="container">
        <Post params={params} />
      </div>
    </section>
  );
};

export default Blogpost;
