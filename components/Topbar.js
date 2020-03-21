import { Component } from 'react';
import Link from 'next/link';
import styles from './Topbar.module.css';

class Topbar extends Component {
  render() {
    return <nav className={styles.topbar}>
      <Link href="/">
        <a className="topbar-title">Dracula</a>
      </Link>
      <ul>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/pro">
            <a className={styles.cta}>Dracula PRO</a>
          </Link>
        </li>
      </ul>
    </nav>
  }
}

export default Topbar;