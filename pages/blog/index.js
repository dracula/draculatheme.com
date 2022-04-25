import { allBlogPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { getBasePath } from '../../lib/environment'
import Blogpost from '../../layouts/Blogpost'
import Head from 'next/head'
import Link from 'next/link'
import Updates from '../../components/Updates'

export async function getStaticProps() {
  const posts = allBlogPosts.sort((post1, post2) =>
    post1.createdAt > post2.createdAt ? '-1' : '1'
  )

  const totalSubscribersReq = await fetch(`${getBasePath()}/api/mailchimp`)
  const totalSubscribersRes = await totalSubscribersReq.json()
  const totalSubscribers = totalSubscribersRes.total

  return {
    props: { posts, totalSubscribers, post: { color: 'yellow' } },
    revalidate: 7200,
  }
}

export default function Blog({ posts, totalSubscribers }) {
  const title = 'Blog — Dracula Theme'
  const description =
    'The journey of building the most universal dark theme ever made.'
  const image = '/static/img/facebook.png'

  return (
    <div className="single">
      <Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="Zeno Rocha" name="author" />
        <meta content="https://draculatheme.com/blog" property="og:url" />
        <meta
          content={`https://draculatheme.com${image}`}
          property="og:image"
        />
      </Head>

      <div className="wrap">
        <div className="blog">
          {posts.map((post, idx) => (
            <div className={post.color} key={idx}>
              <div className="blog-item">
                <div className="blog-item-header">
                  <Link href={post.url}>
                    <a>
                      <h2 className="blog-item-title">{post.title}</h2>
                    </a>
                  </Link>
                  <span className="blog-item-date">
                    <time dateTime={post.createdAt}>
                      {format(parseISO(post.createdAt), 'LLLL d, yyyy')}
                    </time>
                  </span>
                </div>
                <div
                  className="blog-item-excerpt"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="blog-updates">
        <Updates type="blog" totalSubscribers={totalSubscribers} />
      </div>
    </div>
  )
}

Blog.Layout = Blogpost
