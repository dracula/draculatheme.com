import { Component } from 'react'
import styles from './Testimonial.module.css'

class Testimonial extends Component {
  render() {
    const testimonials = [
      {
        content: `If I’m going to be staring at a screen for <span class="pro-highlight">8-10 hours a day</span>, I want it to be as <span class="pro-highlight">painless as possible</span>. Dracula PRO allows me to be more productive by having a consistent interface with <span class="pro-highlight">all of my applications</span> open. Also, the theme <span class="pro-highlight">just looks badass</span>.`,
        author: {
          avatar: 'hannah.jpeg',
          name: 'Hannah Burzynski',
          title: 'Data Scientist',
          location: 'Austin, Texas',
        },
      },
      {
        content: `<span class="pro-highlight">Before Dracula PRO</span> my life was meaningless, colorless and sad. Now it is vibrant, electric and full of the <span class="pro-highlight">best code I've ever written</span>.`,
        author: {
          avatar: 'kenny.png',
          name: 'Kenny Meyers',
          title: 'iOS Developer',
          location: 'Seattle, Washington',
        },
      },
    ]

    const random = Math.floor(Math.random() * Math.floor(testimonials.length))

    return (
      <div className={styles.testimonial}>
        <div className={styles.container}>
          <p
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: testimonials[random].content }}
          />
          <div className={styles.author}>
            <img
              className={styles.avatar}
              src={`/static/img/pro/${testimonials[random].author.avatar}`}
              alt={testimonials[random].author.name}
              loading="lazy"
            />
            <div>
              <p className={styles.name}>{testimonials[random].author.name}</p>
              <p className={styles.bio}>{testimonials[random].author.title}</p>
              <p className={styles.bio}>
                {testimonials[random].author.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Testimonial
