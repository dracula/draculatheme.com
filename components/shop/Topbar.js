import { Component } from 'react';
import Link from 'next/link';
import styles from './Topbar.module.css';

class Topbar extends Component {
  render() {
    return <div className={styles.fixed}>
      <nav className={styles.topbar}>
        <Link href="/">
          <a className="topbar-title" style={{ display: 'flex' }}>
            Dracula
            <span className="topbar-subtitle">Shop</span></a>
        </Link>
        <ul>
          <li className={styles.items}>
            <Link href="/shop/collections/shirts">
              <a>Shirts</a>
            </Link>
          </li>
          <li className={styles.items}>
            <Link href="/shop/collections/stickers">
              <a>Stickers</a>
            </Link>
          </li>
          <li className={styles.items}>
            <Link href="/shop/collections/other">
              <a>Other</a>
            </Link>
          </li>
          <li className={styles.cart}>
            <i className={styles.cartIcon} />
          </li>
        </ul>
      </nav>
    </div>
  }
}

export default Topbar;