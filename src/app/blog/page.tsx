import Link from "next/link";

import type { Post } from "@/lib/markdown";
import { getMdxDataFromDirectory } from "@/utils/mdx/get-mdx-data-from-directory";

const BlogPage = async () => {
  const posts = getMdxDataFromDirectory<Post>("content/blog");
  const featured = posts.filter((post: Post) => post.featured).slice(0, 2);

  return (
    <section className="container">
      {featured.length > 0 && (
        <>
          <h3>Featured Posts</h3>
          <ul>
            {featured.map((post: Post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <h4>{post.title}</h4>
                  <p>{post.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      <ul>
        {posts.map((post: Post) => (
          <li key={post.slug}>
            <Link href={post.slug}>
              <h4>{post.title}</h4>
              <p>{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogPage;
