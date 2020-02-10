import { Component } from 'react';
import styles from './Fonts.module.css';

class Fonts extends Component {
  render() {
    return <div className={styles.fonts}>
      <div className={styles.container}>
        <div className={styles.contentLeft}>
          <ion-icon name="code-slash" style={{ color: '#7970A9', fontSize: 48 }}></ion-icon>
          <h1 className={styles.title}>Hand-picked Typography</h1>
          <p className={styles.body}>I carefully selected 4 monospaced programming fonts that fit perfectly with Dracula PRO. These fonts have <span className={styles.highlight}>built-in ligature support</span> that improves readability.</p>
          <p className={styles.body}>By displaying one shorter glyph instead of 2 or sometimes 3, the <span className={styles.highlight}>human brain spends less energy</span> to scan, parse, and join multiple characters into a single one.</p>
          <p className={styles.body}><span className={styles.highlight}>Don't like ligatures?</span> No problem, you can still use those fonts.</p>
          <a href="#get" className={styles.cta}>Get all fonts</a>
        </div>
        <div className={styles.contentRight}>
          <video className={styles.video} autoPlay muted loop>
            <source src="/static/video/ligatures.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  }
}

export default Fonts;