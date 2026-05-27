import type { Post, PostCategory } from "@/lib/markdown";

export type BlogCategory = "all" | PostCategory;

export interface BlogCategoryOption {
  name: BlogCategory;
  label: string;
}

type BlogCategoryWithoutAll = Exclude<BlogCategory, "all">;
const minimumPostsPerCategory = 4;

const defaultOrder: BlogCategoryWithoutAll[] = [
  "community",
  "guides",
  "launches",
  "milestones",
  "polls",
  "promos",
  "stories",
  "ui",
  "updates"
];

const getCategoryLabel = (categoryName: string) => {
  if (categoryName === "ui") {
    return "UI";
  }

  return `${categoryName.charAt(0).toUpperCase()}${categoryName.slice(1)}`;
};

export const getBlogCategoryOptions = (posts: Post[]): BlogCategoryOption[] => {
  const categoryCounts = new Map<BlogCategoryWithoutAll, number>();

  for (const post of posts) {
    const categoryName = getBlogPostCategory(post);
    categoryCounts.set(
      categoryName,
      (categoryCounts.get(categoryName) ?? 0) + 1
    );
  }

  const sortedPostCategories = [...categoryCounts.entries()]
    .filter(([, count]) => count >= minimumPostsPerCategory)
    .map(([categoryName]) => categoryName)
    .sort((first, second) => {
      const firstOrder = defaultOrder.indexOf(first);
      const secondOrder = defaultOrder.indexOf(second);

      if (firstOrder === -1 && secondOrder === -1) {
        return first.localeCompare(second);
      }

      if (firstOrder === -1) {
        return 1;
      }

      if (secondOrder === -1) {
        return -1;
      }

      return firstOrder - secondOrder;
    });

  return [
    { name: "all", label: "All" },
    ...sortedPostCategories.map((categoryName) => ({
      name: categoryName,
      label: getCategoryLabel(categoryName)
    }))
  ];
};

export const isBlogCategory = (
  value: string,
  options: BlogCategoryOption[]
): value is BlogCategory => {
  return options.some((category) => category.name === value);
};

const getBlogPostCategory = (post: Post): BlogCategoryWithoutAll => {
  return post.category;
};

export const matchesBlogCategory = (post: Post, category: BlogCategory) => {
  if (category === "all") {
    return true;
  }

  return getBlogPostCategory(post) === category;
};
