import { Component } from 'react';
import styles from './Ebook.module.css';

class Ebook extends Component {
  render() {
    return <div className={styles.ebook}>
      <div className={styles.container}>
        <div className={styles.contentLeft}>
          <img className={styles.image} src="/static/img/pro/ebook.png" alt="E-Book" loading="lazy" />
        </div>
        <div className={styles.contentRight}>
          <ion-icon name="glasses" style={{ color: '#9f70a9', fontSize: 48 }}></ion-icon>
          <h1 className={styles.title}>More than a Theme</h1>
          <p className={styles.body}>You can have the best theme, font, and tooling in the world, but if you cultivate bad habits, it will be hard for you to <span className={styles.highlight}>become a top developer</span>.</p>
          <p className={styles.body}>Because of that, I decided to reach out to the best developers I know and ask them tips on <span className={styles.highlight}>how to be more productive</span>.</p>
          <p className={styles.body}>This e-book will be a collection of valuable learnings from senior professionals.</p>
          <p className={styles.body}><span className={styles.highlight}>/* Available in Q2 2020 */</span></p>
        </div>
      </div>
    </div>
  }
}

export default Ebook;