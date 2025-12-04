import { compareDesc } from "date-fns";
import type React from "react";

import type { Post } from "@/lib/markdown";

interface BlogpostListProps {
  posts: Post[];
  renderFeatured?: (post: Post) => React.ReactNode;
  renderPost?: (post: Post) => React.ReactNode;
}

export const BlogpostList = ({
  posts,
  renderFeatured,
  renderPost
}: BlogpostListProps) => {
  const featuredPost = posts.find(
    (post) => post.featured === "true" || post.featured === true
  );
  const regularPosts = posts
    .filter((post) => post.featured !== "true" && post.featured !== true)
    .sort((a, b) =>
      compareDesc(new Date(a.date.createdAt), new Date(b.date.createdAt))
    );

  return (
    <>
      {featuredPost && renderFeatured && (
        <div>{renderFeatured(featuredPost)}</div>
      )}
      {regularPosts.length > 0 && (
        <div>
          {regularPosts.map((post) =>
            renderPost ? <div key={post.slug}>{renderPost(post)}</div> : null
          )}
        </div>
      )}
    </>
  );
};
