import { Component } from 'react'
import Link from 'next/link'
import styles from './Topbar.module.css'

class Topbar extends Component {
  render() {
    return (
      <div className={styles.fixed}>
        <nav className={styles.topbar}>
          <div className={styles.title}>
            <Link href="/">
              <a className="topbar-title">Dracula</a>
            </Link>
            <Link href="/shop">
              <a className="topbar-subtitle">Shop</a>
            </Link>
          </div>
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
          </ul>
        </nav>
      </div>
    )
  }
}

export default Topbar
