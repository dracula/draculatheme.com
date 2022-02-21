import Blogpost from '../../layouts/Blogpost';
import Updates from '../../components/Updates';
import BlogDate from '../../components/BlogDate';
import { getAllPosts } from '../../lib/blog';
import { getBasePath } from '../../lib/environment';
import Head from 'next/head';
import Link from 'next/link';

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'createdAt',
    'slug',
    'author',
    'excerpt',
    'color',
  ])

  const totalSubscribersReq = await fetch(`${getBasePath()}/api/mailchimp`);
  const totalSubscribersRes = await totalSubscribersReq.json();
  const totalSubscribers = totalSubscribersRes.total;

  return {
    props: {
      allPosts,
      totalSubscribers,
      post: { color: 'yellow' }
    },
    revalidate: 7200
  }
}

function Blog({ allPosts, totalSubscribers }) {
  const title = 'Blog — Dracula Theme';
  const description = 'The journey of building the most universal dark theme ever made.';
  const image = '/static/img/facebook.png';

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
				<meta content={`https://draculatheme.com${image}`} property="og:image" />
			</Head>

			<div className="wrap">
				<div className="blog">
					{allPosts.map((post) => {
						return (
							<div className={post.color} key={post.slug}>
								<div className="blog-item">
									<div className="blog-item-header">
										<Link href={`/blog/${post.slug}`}>
											<a>
												<h2 className="blog-item-title">{post.title}</h2>
											</a>
										</Link>
										<span className="blog-item-date">
											<BlogDate dateString={post.createdAt} />
										</span>
									</div>
									<div
										className="blog-item-excerpt"
										dangerouslySetInnerHTML={{ __html: post.excerpt }}
									/>
								</div>
							</div>
						);
					})}
				</div>
			</div>

      <div className="blog-updates">
        <Updates
          type="blog"
          totalSubscribers={totalSubscribers}
        />
      </div>
    </div>
  )
}

Blog.Layout = Blogpost;

export default Blog;
