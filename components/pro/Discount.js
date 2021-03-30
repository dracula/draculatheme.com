import { Component } from 'react';
import { countries } from 'countries-list';
import styles from './Discount.module.css';

class Discount extends Component {
  renderSpecialMessage() {
    if (this.props.ppp.country === 'BR') {
      return <p>I'm brazilian too, so I know how hard it is to buy things online.</p>
    }

    return <p>I believe in <span className={styles.highlight}>Purchasing Parity Power</span>, and I want to make this affordable.</p>
  }

  render() {
    if (this.props.queryParams.a) {
      return <div />
    }

    if (this.props.ppp.country && this.props.ppp.discount) {
      return <div className={styles.ppp}>
        <div className={styles.container}>
          <div className={styles.bodyLeft}>
            <div className={styles.flagContainer}>
              <img className={styles.flag} src={`/static/img/flags/${this.props.ppp.country}.svg`} alt={countries[this.props.ppp.country].name} width="200" />
            </div>
          </div>
          <div className={styles.bodyRight}>
            <p>Hey! You're coming from <span className={styles.highlight}>{countries[this.props.ppp.country].name}</span> where this could be too expensive.</p>
            {this.renderSpecialMessage()}
            <p>If you need it, use the code <span className={styles.highlight}>{this.props.ppp.country}{this.props.suffix}</span> for an extra <span className={styles.highlight}>{this.props.ppp.discount}% off</span> the regular price.</p>
          </div>
        </div>
      </div>
    }

    return <div />
  }
}

export default Discount;