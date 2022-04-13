import Link from 'next/link'
import LinesEllipsisLoose from 'react-lines-ellipsis/lib/loose'
import styles from './FeaturedBlogPosts.module.css'

function FeaturedBlogPosts({ posts }) {
  return (
    <>
      {posts && (
        <div className={styles.container}>
          {posts.map((post, index) => {
            return (
              <Link key={index} href={`/blog/${post.slug}`}>
                <a className={`featured-blog-post ${styles.blogPost}`}>
                  <div className={styles.image}>
                    {/* <img src={`https://draculatheme.com/${post.ogImage}`} alt={post.title}/> */}
                    <img
                      src={`/static/img/blog/${post.slug}-a.png`}
                      alt={post.title}
                    />
                  </div>
                  <LinesEllipsisLoose
                    text={post.title}
                    maxLine="2"
                    lineHeight="26"
                    className={`blog-title ${post.color} ${styles.title}`}
                  />
                  <LinesEllipsisLoose
                    text={post.excerpt}
                    maxLine="3"
                    lineHeight="24"
                    className={styles.excerpt}
                  />
                </a>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}

export default FeaturedBlogPosts
