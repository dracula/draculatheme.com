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
          <ion-icon name="color-wand" style={{ color: '#a99f70', fontSize: 48 }}></ion-icon>
          <h1 className={styles.title}>Geometric Color Palette</h1>
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