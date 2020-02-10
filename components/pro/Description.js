import { Component } from 'react';
import styles from './Description.module.css';

class Description extends Component {
  render() {
    return <div className={styles.description}>
      <div className={styles.container}>
        <p className={styles.body}>Dracula PRO is a color scheme and UI theme <span className={styles.highlight}>tailored for programming</span>.</p>
        <p className={styles.body}>Made for terminal emulators, <span className={styles.highlight}>code editors</span>, and syntax highlighters.</p>
        <p className={styles.body}>Designed to be aesthetically pleasing while <span className={styles.highlight}>keeping you focused</span>.</p>
      </div>
    </div>
  }
}

export default Description;