import { Component } from 'react'
import styles from './Authors.module.css'
import { Box, Paragraph, Heading } from '@dracula/dracula-ui'

const authors = [
  {
    avatar: 'zenorocha',
    intro: "Hey, I'm Zeno",
    bio: "I'm obsessed with dark mode and re-usable components. I started building <span class='drac-text-purple-cyan'>UI libraries</span> back in 2012 using jQuery and YUI.<br /><br />A year later, I designed my own dark theme, Dracula, which became a <span class='drac-text-purple-cyan'>widely adopted color scheme</span> among top developers.<br /><br />Now, I'm building the ultimate collection of dark UI components. I'm so excited to <span class='drac-text-purple-cyan'>help you build</span> your own apps faster!",
    location: 'Los Angeles, CA',
    color: 'purpleCyan',
  },
  {
    avatar: 'nettofarah',
    intro: "And I'm Netto",
    bio: "I love building tools to empower engineers to <span class='drac-text-cyan-green'>build things faster</span> and more reliably.<br /><br />On my day to day job at Segment (Twilio), I write JavaScript code that <span class='drac-text-cyan-green'>runs on billions of devices</span> every single day.<br /><br />I'm always looking for creative ways to build great experiences on the web and <span class='drac-text-cyan-green'>I can't wait</span> to see what you're going to create with this package.",
    location: 'Austin, TX',
    color: 'cyanGreen',
  },
]

class Authors extends Component {
  renderAuthor(author) {
    return (
      <Box className={styles.author}>
        <img
          className={styles.photo}
          src={`/static/img/ui/${author.avatar}.jpeg`}
          alt={author.avatar}
        />
        <Box className={styles.content}>
          <Heading my="none" color={author.color} size="lg">
            {author.intro}
          </Heading>
          <Paragraph my="sm" dangerouslySetInnerHTML={{ __html: author.bio }} />
          <Paragraph mb="none" color={author.color}>
            {'// '}
            {author.location}
          </Paragraph>
        </Box>
      </Box>
    )
  }

  render() {
    return (
      <Box className={styles.authors}>
        <Box className={styles.svgContainerTop}>
          <svg
            viewBox="0 0 1792 335"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              fill="rgba(34, 33, 44, 1)"
              d="M 0 50 C 259 50 259 209 518 209 L 518 209 L 518 0 L 0 0 Z"
              strokeWidth="0"
            ></path>{' '}
            <path
              fill="rgba(34, 33, 44, 1)"
              d="M 517 209 C 800 209 800 96 1083 96 L 1083 96 L 1083 0 L 517 0 Z"
              strokeWidth="0"
            ></path>{' '}
            <path
              fill="rgba(34, 33, 44, 1)"
              d="M 1082 96 C 1437 96 1437 189 1792 189 L 1792 189 L 1792 0 L 1082 0 Z"
              strokeWidth="0"
            ></path>
          </svg>
        </Box>
        <Box className={styles.container}>
          {this.renderAuthor(authors[0])}
          {this.renderAuthor(authors[1])}
        </Box>
      </Box>
    )
  }
}

export default Authors
