import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Blogpost from '../../layouts/Blogpost';
import BlogDate from '../../components/BlogDate';
import Updates from '../../components/Updates';
import { getPostBySlug, getAllPosts, convertMarkdownToHtml } from '../../lib/blog'
import Head from 'next/head'

function Post({ post }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const description = post.excerpt;
  const image = post.ogImage || '/static/img/facebook.png';

  return <div className="single">
    <Head>
      <meta charSet="utf-8" />
      <title>{post.title}</title>
      <meta content={post.title} property="og:title" />
      <meta content={description} name="description" />
      <meta content={description} property="og:description" />
      <meta content="Zeno Rocha" name="author" />
      <meta content={`https://draculatheme.com/blog/${post.slug}`} property="og:url" />
      <meta content={`https://draculatheme.com${image}`} property="og:image" />
    </Head>

    <div className="wrap">
      <div className="blog">
        <h1>{post.title}</h1>
        <div className="blog-metadata">
          <img className="blog-author-avatar" src={post.author.avatar} alt={post.author.name} />
          <span className="blog-author-name">{post.author.name}</span>
          <span className="blog-author-separator">/</span>
          <BlogDate dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>

    <div className="blog-updates">
      <Updates type="blog" />
    </div>
  </div>
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
    'content',
    'ogImage',
    'color',
  ])
  const content = await convertMarkdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

Post.Layout = Blogpost;

export default Post;