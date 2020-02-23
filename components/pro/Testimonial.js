import { Component } from 'react';
import styles from './Testimonial.module.css';

class Testimonial extends Component {
  render() {
    return <div className={styles.testimonial}>
      <div className={styles.container}>
        <p className={styles.body}>If I’m going to be staring at a screen for <span className={styles.highlight}>8-10 hours a day</span>, I want it to be as <span className={styles.highlight}>painless as possible</span>. Dracula PRO allows me to be more productive by having a consistent interface with <span className={styles.highlight}>all of my applications</span> open. Also, the theme <span className={styles.highlight}>just looks badass</span>.</p>
        <div className={styles.author}>
          <img className={styles.avatar} src="/static/img/pro/hannah.jpeg" alt="Hannah Burzynski" loading="lazy" />
          <div>
            <p className={styles.name}>Hannah Burzynski</p>
            <p className={styles.bio}>Data Scientist</p>
            <p className={styles.bio}>Austin, Texas</p>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Testimonial;