import { readFileSync, writeFileSync } from 'fs'

import RSS from 'rss'
import { globby } from 'globby'
import matter from 'gray-matter'

async function generate() {
  let allBlogs = await globby(['./blog/*.md'])

  const feed = new RSS({
    title: 'Dracula Theme - Blog',
    description:
      'The journey of building the most universal dark theme ever made.',
    site_url: 'https://draculatheme.com',
    feed_url: 'https://draculatheme.com/rss.xml',
  })

  allBlogs.map(post => {
    const fileContents = readFileSync(post, 'utf8')
    const { data } = matter(fileContents)
    const slug = post.replace('./blog', '/blog').replace('.md', '')

    const image = data.ogImage ? `https://draculatheme.com${data.ogImage}` : ''

    feed.item({
      title: data.title,
      url: `https://draculatheme.com${slug}`,
      date: data.createdAt,
      description: data.excerpt,
      image_url: image,
    })
  })

  writeFileSync('public/rss.xml', feed.xml({ indent: true }))
}

generate()
