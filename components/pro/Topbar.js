import { Component } from 'react';
import Link from 'next/link';
import styles from './Topbar.module.css';

class Topbar extends Component {
  render() {
    return <div className={styles.fixed}>
      <nav className={styles.topbar}>
        <Link href="/">
          <a className="topbar-title">Dracula <span className={styles.titlePro}>PRO</span></a>
        </Link>
        <a href="/pro#get" className={styles.cta}>Get it now</a>
      </nav>
    </div>
  }
}

export default Topbar;