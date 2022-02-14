import { Component } from 'react'
import styles from './Testimonial.module.css'
import { Box, Paragraph } from '@dracula/dracula-ui'

class Testimonial extends Component {
  render() {
    const testimonials = [
      {
        content: `As someone who is pretty decent at CSS but prefers to do something else, <span class="drac-text-yellow">Dracula UI lets me be productive</span>, have fun doing what I like while creating some gorgeous-looking UIs.`,
        author: {
          avatar: 'cassiozen.jpeg',
          name: 'Cassio Zen',
          title: 'Software Engineer at Microsoft',
        },
      },
    ]

    return (
      <Box className={styles.testimonial}>
        <Box className={styles.container}>
          <img
            className={styles.avatar}
            src={`/static/img/ui/${testimonials[0].author.avatar}`}
            alt={testimonials[0].author.name}
            loading="lazy"
          />
          <blockquote
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: testimonials[0].content }}
          />
          <Paragraph
            color="yellowPink"
            size="lg"
            mb="xs"
            className={styles.authorName}
          >
            {testimonials[0].author.name}
          </Paragraph>
          <Paragraph className={styles.authorTitle}>
            {testimonials[0].author.title}
          </Paragraph>
        </Box>
      </Box>
    )
  }
}

export default Testimonial
