import { Component } from 'react';
import styles from './Preview.module.css';
import apps from '../../lib/pro';

class Preview extends Component {
  render() {
    return <div className={styles.preview}>
      <div className={styles.container}>
        <h2 className={styles.title}>Available Everywhere</h2>
        <p className={styles.body}>Dracula PRO is built for your favorite apps.</p>
        <div className={styles.controls}>
          <select className={styles.select} value={this.props.app} onChange={this.props.changeApp.bind(this)}>
            {Object.keys(apps).map(app => {
              return <option key={app} value={app}>{apps[app].name}</option>
            })}
          </select>
          <select className={styles.select} value={this.props.variant} onChange={this.props.changeVariant.bind(this)}>
            <option value="1">Pro</option>
            <option value="2">Blade</option>
            <option value="3">Buffy</option>
            <option value="4">Lincoln</option>
            <option value="5">Morbius</option>
            <option value="6">Van Helsing</option>
          </select>
        </div>
        <img className={this.props.app === 'alfred' ? styles.imageAlfred : styles.image} src={`/static/img/pro/${this.props.app}/${this.props.variant}.png`} alt="Theme Preview" />
      </div>
    </div>
  }
}

export default Preview;