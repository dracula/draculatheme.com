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
                <svg className={styles.icon} fill="#50fa7b" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-checkmark-circle</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z"/></svg>
                <span>10 Themes</span>
              </li>
              <li>
                <svg className={styles.icon} fill="#50fa7b" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-checkmark-circle</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z"/></svg>
                <span>6 Variants</span>
              </li>
              <li>
                <svg className={styles.icon} fill="#50fa7b" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-checkmark-circle</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z"/></svg>
                <span>4 Hand-picked Fonts</span>
              </li>
              <li>
                <svg className={styles.icon} fill="#50fa7b" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-checkmark-circle</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z"/></svg>
                <span>1 Productivity E-book</span>
              </li>
              <li>
                <svg className={styles.icon} fill="#50fa7b" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-checkmark-circle</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z"/></svg>
                <span>1 Bonus Screencast</span>
              </li>
              <li>
                <svg className={styles.icon} fill="#50fa7b" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-checkmark-circle</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z"/></svg>
                <span>Design Files</span>
              </li>
              <li>
                <svg className={styles.icon} fill="#50fa7b" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-checkmark-circle</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z"/></svg>
                <span>Constant updates</span>
              </li>
              <li>
                <svg className={styles.icon} fill="#50fa7b" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-checkmark-circle</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z"/></svg>
                <span>Support included</span>
              </li>
              <li>
                <svg className={styles.icon} fill="#50fa7b" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-checkmark-circle</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z"/></svg>
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