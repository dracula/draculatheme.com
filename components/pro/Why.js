import { Component } from 'react';
import styles from './Why.module.css';

class Why extends Component {
  render() {
    return <div className={styles.why}>
      <div className={styles.container}>
        <div className={styles.content}>
          <ion-icon name="flash" style={{ color: '#70a99f', fontSize: 48 }}></ion-icon>
          <h1 className={styles.title}>Why Dracula PRO</h1>
          <p className={styles.body}>In 2013, <span className={styles.highlight}>my laptop was stolen</span>, so I had to re-configure everything. At that time, there were thousands of themes out there, but none of them were appealing to me. So I decided to <span className={styles.highlight}>create my own</span>.</p>
          <p className={styles.body}>Fast forward to 2020, Dracula is one of the most popular themes in the world. Still, I felt that something was missing. I wanted to help with <span className={styles.highlight}>more than just a theme</span>, that's why I created Dracula PRO.</p>
          <p className={styles.body}>This is a package built for developers who are willing to invest in their productivity.</p>
          <p className={styles.body}><span className={styles.highlight}>- Zeno Rocha</span></p>
        </div>
      </div>
    </div>
  }
}

export default Why;