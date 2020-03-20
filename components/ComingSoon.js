import { Component } from 'react';
import Link from 'next/link';

import styles from './ComingSoon.module.css';

class ComingSoon extends Component {
  render() {
    return <div className="green">
      <h1 style={{  marginBottom: 20 }} className="title">Dracula PRO</h1>
      <div style={{ backgroundColor: '#282a36', borderRadius: '10px', margin: '0 auto' }} className="box">
        <h2 style={{ textAlign: 'center', color: '#fff' }}>the new theme is here!</h2>
        <p style={{ textAlign: 'center', fontSize: 20, color: 'rgba(255, 255, 255, .6)' }}>Meet the premium version with tons of goodies.</p>
        <div className={styles.ctaContainer}>
          <Link href="/pro">
            <a className={styles.cta}>Take me there</a>
          </Link>
        </div>
      </div>

      <style jsx>{`
      h2 {
        font-size: 38px;
      }

      p {
        font-size: 19px;
      }

      .box {
        padding: 45px;
        max-width: 400px;
      }

      @media (max-width: 840px) {
        h2 {
          font-size: 32px;
        }

        p {
          font-size: 16px;
        }

        .box {
          padding: 20px;
          max-width: 375px;
        }
      }
    `}</style>
    </div>
  }
}

export default ComingSoon;