import { Component } from 'react';
import styles from './Topbar.module.css';

class Topbar extends Component {
  render() {
    return <nav className={styles.topbar}>
      <span className={styles.title}>Dracula PRO</span>
      <a href="#get" className={styles.cta}>Get it now</a>
    </nav>
  }
}

export default Topbar;