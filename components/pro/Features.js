import { Component } from 'react';
import styles from './Features.module.css';

class Features extends Component {
  render() {
    return <div className={styles.features}>
      <ul className={styles.container}>
        <li className={styles.item}>
          <ion-icon name="eye" style={{ color: '#a97079', fontSize: 48 }}></ion-icon>
          <p className={styles.title}>Easy on the Eyes</p>
          <p className={styles.body}>Dark mode is everywhere, and there's a reason for that. From improved battery consumption to <span className={styles.highlight}>better visibility</span> on low-light environments, there are many reasons to love.</p>
        </li>
        <li className={styles.item}>
          <ion-icon name="toggle" style={{ color: '#a97079', fontSize: 48 }}></ion-icon>
          <p className={styles.title}>Less Context Switch</p>
          <p className={styles.body}>By having the same color scheme across multiple apps, you <span className={styles.highlight}>reduce the time</span> it takes to switch context between tasks. That's why Dracula PRO is available in as many platforms as possible.</p>
        </li>
        <li className={styles.item}>
          <ion-icon name="contrast" style={{ color: '#a97079', fontSize: 48 }}></ion-icon>
          <p className={styles.title}>Precise Contrast</p>
          <p className={styles.body}>The entire palette was tested against the WCAG 2.0 level AA spec, which requires a contrast ratio of at least 4.5:1 for normal text, therefore affording the <span className={styles.highlight}>best readability</span>.</p>
        </li>
      </ul>
    </div>
  }
}

export default Features;