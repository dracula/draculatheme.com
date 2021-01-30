import Head from 'next/head';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router'
import { BlogJsonLd } from 'next-seo';
import Blogpost from '../../layouts/Blogpost';
import BlogDate from '../../components/BlogDate';
import Updates from '../../components/Updates';
import { getPostBySlug, getAllPosts, convertMarkdownToHtml } from '../../lib/blog';

function Post({ post }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const url = `https://draculatheme.com/blog/${post.slug}`;
  const image = post.ogImage ? `https://draculatheme.com${post.ogImage}` : 'https://draculatheme.com/static/img/facebook.png';

  return <div className="single">
    <Head>
      <meta charSet="utf-8" />
      <title>{post.title}</title>
      <meta content={post.title} property="og:title" />
      <meta content={post.excerpt} name="description" />
      <meta content={post.excerpt} property="og:description" />
      <meta content={post.author} name="author" />
      <meta content={url} property="og:url" />
      <meta content={image} property="og:image" />
    </Head>

    <div className="wrap">
      <div className="blog">
        <h1>{post.title}</h1>
        <div className="blog-metadata">
          <img className="blog-author-avatar" src={post.author.avatar} alt={post.author.name} />
          <span className="blog-author-name">{post.author.name}</span>
          <span className="blog-author-separator">/</span>
          <BlogDate dateString={post.createdAt} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>

    <div className="blog-updates">
      <Updates type="blog" />
    </div>

    <BlogJsonLd
      url={url}
      images={[image]}
      title={post.title}
      datePublished={post.createdAt}
      dateModified={post.updatedAt}
      authorName={post.author.name}
      description={post.excerpt}
    />
  </div>
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'createdAt',
    'updatedAt',
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