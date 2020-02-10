import { Component } from 'react';
import styles from './Pricing.module.css';
import apps from '../../lib/pro';

class Pricing extends Component {
  render() {
    return <div id="get" className={styles.pricing}>
      <div className={styles.container}>
        <h2 className={styles.title}>Get it now</h2>
        <p className={styles.body}>Join other developers using Dracula PRO every day to build elite apps.</p>
        <div className={styles.tables}>
          <div className={styles.table}>
            <p className={styles.option}>Launch Promo</p>
            <p className={styles.price}><span className={styles.previousPrice}>$79</span>$49</p>
            <p className={styles.term}>one-time payment</p>
            <ul className={styles.features}>
              <li>
                <ion-icon name="checkmark-circle" style={{ color: '#50fa7b', fontSize: 24, position: 'relative', top: 7, marginRight: 10 }}></ion-icon>
                <span>10 Themes</span>
              </li>
              <li>
                <ion-icon name="checkmark-circle" style={{ color: '#50fa7b', fontSize: 24, position: 'relative', top: 7, marginRight: 10 }}></ion-icon>
                <span>6 Variants</span>
              </li>
              <li>
                <ion-icon name="checkmark-circle" style={{ color: '#50fa7b', fontSize: 24, position: 'relative', top: 7, marginRight: 10 }}></ion-icon>
                <span>4 Hand-picked Fonts</span>
              </li>
              <li>
                <ion-icon name="checkmark-circle" style={{ color: '#50fa7b', fontSize: 24, position: 'relative', top: 7, marginRight: 10 }}></ion-icon>
                <span>1 Productivy E-book</span>
              </li>
              <li>
                <ion-icon name="checkmark-circle" style={{ color: '#50fa7b', fontSize: 24, position: 'relative', top: 7, marginRight: 10 }}></ion-icon>
                <span>1 Bonus Screencast</span>
              </li>
              <li>
                <ion-icon name="checkmark-circle" style={{ color: '#50fa7b', fontSize: 24, position: 'relative', top: 7, marginRight: 10 }}></ion-icon>
                <span>Constant updates</span>
              </li>
              <li>
                <ion-icon name="checkmark-circle" style={{ color: '#50fa7b', fontSize: 24, position: 'relative', top: 7, marginRight: 10 }}></ion-icon>
                <span>Support included</span>
              </li>
              <li>
                <ion-icon name="checkmark-circle" style={{ color: '#50fa7b', fontSize: 24, position: 'relative', top: 7, marginRight: 10 }}></ion-icon>
                <span>License for 3 computers</span>
              </li>
            </ul>
            <div className={styles.buy}>
              <a href="https://gum.co/dracula-pro?wanted=true" className="gumroad-button" className={styles.cta}>Buy Dracula PRO</a>
            </div>
            <p className={styles.refund}>14 days refund (no Q/A)</p>
          </div>
        </div>
        <p className={styles.questions}><a className={styles.contact} href="mailto:zeno@draculatheme.com">Contact me</a> to get a <span className={styles.highlight}>Team License</span> to share with your team.</p>
      </div>
    </div>
  }
}

export default Pricing;