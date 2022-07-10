import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files'

const Author = defineNestedType(() => ({
  name: 'Author',
  fields: {
    name: {
      type: 'string',
      description: 'The author&apos;s name',
      required: true,
    },
    avatar: {
      type: 'string',
      description: 'The author&apos;s avatar',
      required: true,
    },
  },
}))

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `**/*.mdx`,
  bodyType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    excerpt: {
      type: 'string',
      description: 'A small snippet of the post content',
      required: true,
    },
    createdAt: {
      type: 'string',
      description: 'The post creation date',
      required: true,
    },
    updatedAt: {
      type: 'string',
      description: 'The post update date',
      required: true,
    },
    author: {
      type: 'nested',
      of: Author,
      description: 'The author info',
      required: true,
    },
    ogImage: {
      type: 'string',
      description: 'The main post image',
      required: false,
    },
    color: {
      type: 'string',
      description: 'The post highlight color',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: blogPost =>
        `/blog/${blogPost._raw.flattenedPath.replace(/\.mdx/, '')}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [BlogPost],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
