import { Component } from 'react';
import styles from './Palette.module.css';

class Palette extends Component {
  render() {
    return <div className={styles.palette}>
      <div className={styles.container}>
        <div className={styles.contentLeft}>
          <p className={styles.paletteName}>Dracula Classic</p>
          <img className={styles.paletteImage} src="/static/img/pro/wheel-dracula.png" alt="Classic Palette" loading="lazy" style={{ marginBottom: 40 }} />
          <p className={styles.paletteName}>Dracula PRO</p>
          <img className={styles.paletteImage} src="/static/img/pro/wheel-dracula-pro.png" alt="PRO Palette" loading="lazy" />
        </div>
        <div className={styles.contentRight}>
          <svg fill="#62adad" width="48" height="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-color-wand</title><path d="M96,208H48a16,16,0,0,1,0-32H96a16,16,0,0,1,0,32Z" /><line x1="90.25" y1="90.25" x2="124.19" y2="124.19" /><path d="M124.19,140.19a15.91,15.91,0,0,1-11.31-4.69L78.93,101.56a16,16,0,0,1,22.63-22.63l33.94,33.95a16,16,0,0,1-11.31,27.31Z" /><path d="M192,112a16,16,0,0,1-16-16V48a16,16,0,0,1,32,0V96A16,16,0,0,1,192,112Z" /><line x1="293.89" y1="90.25" x2="259.95" y2="124.19" /><path d="M260,140.19a16,16,0,0,1-11.31-27.31l33.94-33.95a16,16,0,0,1,22.63,22.63L271.27,135.5A15.94,15.94,0,0,1,260,140.19Z" /><line x1="124.19" y1="259.95" x2="90.25" y2="293.89" /><path d="M90.25,309.89a16,16,0,0,1-11.32-27.31l33.95-33.94a16,16,0,0,1,22.62,22.63l-33.94,33.94A16,16,0,0,1,90.25,309.89Z" /><path d="M219,151.83a26,26,0,0,0-36.77,0l-30.43,30.43a26,26,0,0,0,0,36.77L208.76,276a4,4,0,0,0,5.66,0L276,214.42a4,4,0,0,0,0-5.66Z" /><path d="M472.31,405.11,304.24,237a4,4,0,0,0-5.66,0L237,298.58a4,4,0,0,0,0,5.66L405.12,472.31a26,26,0,0,0,36.76,0l30.43-30.43h0A26,26,0,0,0,472.31,405.11Z" /></svg>
          <h3 className={styles.title}>Geometric Color Palette</h3>
          <p className={styles.body}>Isaac Newton was one of the first to organize colors geometrically. In 1704, Newton observed the relationships between different wavelengths of light and organized them as a <span className={styles.highlight}>circle of hue</span>.</p>
          <p className={styles.body}> He was then able to identify different patterns that arose out of this representation. This would become the foundation of <span className={styles.highlight}>modern color theory</span>.</p>
          <p className={styles.body}>The original Dracula colors created in 2013 were based on personal taste. This new PRO version brings a more refined and <span className={styles.highlight}>mathematical approach</span> that normalizes lightness and saturation.</p>
          <a href="#get" className={styles.cta}>Get all themes</a>
        </div>
      </div>
    </div>
  }
}

export default Palette;