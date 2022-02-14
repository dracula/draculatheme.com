import { Component } from 'react'
import styles from './About.module.css'

class About extends Component {
  render() {
    return (
      <div className={styles.about}>
        <div className={styles.container}>
          <img
            className={styles.avatar}
            src="/static/img/pro/journey/about.jpg"
            alt="Zeno Rocha"
          />
          <p className={styles.title}>
            I'm Zeno (
            <a
              className={styles.link}
              href="https://twitter.com/zenorocha"
              target="_blank"
            >
              @zenorocha
            </a>
            ) creator of Dracula.
          </p>
          <p className={styles.subtitle}>
            Monetizing an open source project is very difficult, so I decided to
            share my personal journey and lessons learned. I hope this can be
            helpful and inspire your own journey.
          </p>
        </div>
      </div>
    )
  }
}

export default About
