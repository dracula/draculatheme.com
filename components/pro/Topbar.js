import { Component } from 'react'
import Link from 'next/link'
import Countdown from '../Countdown'
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
          <a href="/pro#get" className={styles.cta}>
            Get it now
          </a>
        </nav>
      </div>
    )
  }
}

export default Topbar
