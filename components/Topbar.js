import { Component } from 'react';
import Link from 'next/link';
import styles from './Topbar.module.css';

class Topbar extends Component {
  render() {
    return <nav className={styles.topbar}>
      <a className="topbar-title" href="/">Dracula</a>
      <ul>
        <li><a href="/about">About</a></li>
        <li><Link href="/pro"><a className={styles.cta}>Dracula PRO</a></Link></li>
      </ul>
    </nav>
  }
}

export default Topbar;