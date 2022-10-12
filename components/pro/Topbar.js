import { Component } from 'react'
import Countdown from '../Countdown'
import Link from 'next/link'
import styles from './Topbar.module.css'

class Topbar extends Component {
  render() {
    return (
      <div className={styles.fixed}>
        <Countdown ppp={this.props.ppp} color="#8aff80" />
        <nav className={styles.topbar}>
          <Link href="/">
            <a className="topbar-title">
              Dracula <span className={styles.titlePro}>PRO</span>
            </a>
          </Link>
          <ul className={styles.topbarMenu}>
            <li>
              <Link href="/pro/changelog">
                <a className={styles.items}>
                  <span>Changelog</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/pro#get">
                <a className={styles.cta}>Get it now</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Topbar
