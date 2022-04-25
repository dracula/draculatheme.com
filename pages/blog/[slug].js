import { allBlogPosts } from 'contentlayer/generated'
import { BlogJsonLd } from 'next-seo'
import { format, parseISO } from 'date-fns'
import { getBasePath } from '../../lib/environment'
import Blogpost from '../../layouts/Blogpost'
import Head from 'next/head'
import Updates from '../../components/Updates'

export async function getStaticPaths() {
  const paths = allBlogPosts.map(post => post.url)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = allBlogPosts.find(
    post => post._raw.flattenedPath === params.slug
  )

  const totalSubscribersReq = await fetch(`${getBasePath()}/api/mailchimp`)
  const totalSubscribersRes = await totalSubscribersReq.json()
  const totalSubscribers = totalSubscribersRes.total

  return { props: { post, totalSubscribers }, revalidate: 7200 }
}

const createBlogPostMarkup = post => {
  return {
    __html: `
        <h1>${post.title}</h1>
        <div class="blog-metadata">
        <img
            class="blog-author-avatar"
            src=${post.author.avatar}
            alt=${post.author.name}
        />
        <span class="blog-author-name">${post.author.name}</span>
        <span class="blog-author-separator">/</span>
        <time dateTime=${post.createdAt}>
            ${format(parseISO(post.createdAt), 'LLLL d, yyyy')}
        </time>
        </div>
        ${post.body.html}
        `,
  }
}

export default function Post({ post, totalSubscribers }) {
  const url = `https://draculatheme.com/blog/${post.slug}`
  const image = post.ogImage
    ? `https://draculatheme.com${post.ogImage}`
    : 'https://draculatheme.com/static/img/facebook.png'

  return (
    <div className="single">
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
        <div
          className="blog"
          dangerouslySetInnerHTML={createBlogPostMarkup(post)}
        ></div>
      </div>

      <div className="blog-updates">
        <Updates type="blog" totalSubscribers={totalSubscribers} />
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
  )
}

Post.Layout = Blogpost
