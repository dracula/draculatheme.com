import { Component } from 'react';
import dynamic from 'next/dynamic';
import styles from './Preview.module.css';
import apps from '../../lib/pro';

const SelectInput = dynamic(() => import('react-select'), { ssr: false });

class Preview extends Component {
  renderSelect() {
    return <div className={styles.select}>
      <SelectInput id="theme" defaultValue={apps[apps.length - 1]} options={apps} onChange={this.props.changeApp.bind(this)} isSearchable={true}
        styles={{
          option: (styles, state) => ({
            ...styles,
            cursor: 'pointer',
          }),
          control: (styles) => ({
            ...styles,
            cursor: 'pointer',
          })
        }}
        theme={theme => ({
          ...theme,
          borderRadius: 0,
          cursor: 'pointer',
          colors: {
            ...theme.colors,
            primary:   '#50fa7b', // Opened - Border
            primary25: '#2a2c37', // Opened - Active
            primary50: '#2a2c37', // Opened - Focus
            neutral0:  '#1d1e26', // Closed - Background
            neutral10: '#50fa7b', // Closed - Arrow
            neutral20: '#50fa7b', // Closed - Border
            neutral30: '#50fa7b', // Closed - Border Hover
            neutral40: '#50fa7b', // Closed - Arrow Hover
            neutral60: '#50fa7b', // Opened - Arrow
            neutral80: '#50fa7b', // Closed - Text
          },
        })} />
    </div>
  }

  renderColorPicker() {
    return <div className={styles.colors}>
      <ul className={styles.colorsList}>
        <li className={this.props.variant === 1 ? styles.active : ''} onClick={this.props.changeVariant.bind(this, 1)}>
          <span className={styles.colorPreview} />
          <p className={styles.colorName}>Pro</p>
        </li>
        <li className={this.props.variant === 2 ? styles.active : ''}  onClick={this.props.changeVariant.bind(this, 2)}>
          <span className={styles.colorPreview} />
          <p className={styles.colorName}>Blade</p>
        </li>
        <li className={this.props.variant === 3 ? styles.active : ''}  onClick={this.props.changeVariant.bind(this, 3)}>
          <span className={styles.colorPreview} />
          <p className={styles.colorName}>Buffy</p>
        </li>
        <li className={this.props.variant === 4 ? styles.active : ''}  onClick={this.props.changeVariant.bind(this, 4)}>
          <span className={styles.colorPreview} />
          <p className={styles.colorName}>Lincoln</p>
        </li>
        <li className={this.props.variant === 5 ? styles.active : ''}  onClick={this.props.changeVariant.bind(this, 5)}>
          <span className={styles.colorPreview} />
          <p className={styles.colorName}>Morbius</p>
        </li>
        <li className={this.props.variant === 6 ? styles.active : ''}  onClick={this.props.changeVariant.bind(this, 6)}>
          <span className={styles.colorPreview} />
          <p className={styles.colorName}>Van Helsing</p>
        </li>
      </ul>
    </div>
  }

  render() {
    return <div className={styles.preview}>
      <div className={styles.container}>
        <h2 className={styles.title}>Available Everywhere</h2>
        <p className={styles.body}>Dracula PRO is built for your favorite apps.</p>
        {this.renderSelect()}
        {this.renderColorPicker()}
        <img className={this.props.app === 'alfred' ? styles.imageAlfred : styles.image} src={`/static/img/pro/${this.props.app}/${this.props.variant}.png`} alt="Theme Preview" />
      </div>
    </div>
  }
}

export default Preview;