import Link from 'next/link'
import LinesEllipsisLoose from 'react-lines-ellipsis/lib/loose'
import styles from './FeaturedBlogPosts.module.css'

function FeaturedBlogPosts({ posts }) {
  const renderTitle = (color, title) => {
    if (color === 'cyan') {
      return (
        <LinesEllipsisLoose
          text={title}
          maxLine="2"
          lineHeight="26"
          className={`${styles.title} ${styles.titleCyan}`}
        />
      )
    } else if (color === 'green') {
      return (
        <LinesEllipsisLoose
          text={title}
          maxLine="2"
          lineHeight="26"
          className={`${styles.title} ${styles.titleGreen}`}
        />
      )
    } else if (color === 'orange') {
      return (
        <LinesEllipsisLoose
          text={title}
          maxLine="2"
          lineHeight="26"
          className={`${styles.title} ${styles.titleOrange}`}
        />
      )
    } else if (color === 'pink') {
      return (
        <LinesEllipsisLoose
          text={title}
          maxLine="2"
          lineHeight="26"
          className={`${styles.title} ${styles.titlePink}`}
        />
      )
    } else if (color === 'purple') {
      return (
        <LinesEllipsisLoose
          text={title}
          maxLine="2"
          lineHeight="26"
          className={`${styles.title} ${styles.titlePurple}`}
        />
      )
    } else if (color === 'yellow') {
      return (
        <LinesEllipsisLoose
          text={title}
          maxLine="2"
          lineHeight="26"
          className={`${styles.title} ${styles.titleYellow}`}
        />
      )
    }
  }

  return (
    <>
      {posts && (
        <div className={styles.container}>
          {posts.map((post, index) => {
            return (
              <Link key={index} href={`/blog/${post.slug}`}>
                <a
                  className={`${styles.blogPost}${
                    index > 0 ? ' hide-on-mb' : ''
                  }`}
                >
                  <div className={styles.image}>
                    {/* <img src={`https://draculatheme.com/${post.ogImage}`} alt={post.title}/> */}
                    <img
                      src={`/static/img/blog/${post.slug}-a.png`}
                      alt={post.title}
                    />
                  </div>
                  {renderTitle(post.color, post.title)}
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
