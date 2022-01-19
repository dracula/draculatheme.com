import { Component } from 'react';
import Link from 'next/link';
import styles from './Topbar.module.css';

class Topbar extends Component {
  render() {
    return <div className={styles.fixed}>
      <nav className={styles.topbar}>
        <Link href="/">
          <a className="topbar-title">Dracula</a>
        </Link>
        <ul>
          <li className={styles.items}>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li className={styles.items}>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>
          <li className={styles.items}>
            <Link href="/contribute">
              <a>Contribute</a>
            </Link>
          </li>
          <li className={styles.items}>
            <Link href="/shop">
              <a>Shop</a>
            </Link>
            <span className={styles.new}>new</span>
          </li>
          <li className={styles.items}>
            <Link href="/ui">
              <a>Dracula UI</a>
            </Link>
          </li>
          <li>
            <Link href="/pro">
              <a className={styles.cta}>Dracula PRO</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  }
}

export default Topbar;