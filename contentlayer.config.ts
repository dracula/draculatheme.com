import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";

const Author = defineNestedType(() => ({
  name: "Author",
  fields: {
    name: {
      type: "string",
      description: "The name of the author",
    },
    avatar: {
      type: "string",
      description: "The picture of the author",
    },
  },
}));

const Date = defineNestedType(() => ({
  name: "Date",
  fields: {
    createdAt: {
      type: "string",
      description: "The date of creation",
    },
    updatedAt: {
      type: "string",
      description: "The date of last update",
    },
  },
}));

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    excerpt: {
      type: "string",
      description: "The excerpt of the post",
      required: true,
    },
    author: {
      type: "nested",
      of: Author,
      description: "The author of the post",
      required: true,
    },
    date: {
      type: "nested",
      of: Date,
      description: "The date of the post",
      required: true,
    },
    coverImage: {
      type: "string",
      description: "The cover image of the post",
      required: true,
    },
    highlighted: {
      type: "boolean",
      default: false,
      description: "If the post is highlighted",
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/blog/${doc._raw.flattenedPath}`,
    },
  },
}));

const Logs = defineDocumentType(() => ({
  name: "Log",
  filePathPattern: `logs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the log",
      required: true,
    },
    excerpt: {
      type: "string",
      description: "The excerpt of the log",
      required: true,
    },
    author: {
      type: "nested",
      of: Author,
      description: "The author of the log",
      required: true,
    },
    date: {
      type: "nested",
      of: Date,
      description: "The date of the log",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/pro/changelog/${doc._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Logs],
});
