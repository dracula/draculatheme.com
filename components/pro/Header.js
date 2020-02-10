import { Component } from 'react';
import styles from './Header.module.css';

class Header extends Component {
  render() {
    return <div className={styles.header}>
      <h1 className={styles.title}>{this.props.title}</h1>
      <h2 className={styles.slogan}>{this.props.description}</h2>
      <a href="#get" className={styles.cta}>Get it now</a>
    </div>
  }
}

export default Header;