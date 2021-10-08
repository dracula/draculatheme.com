import { Component } from 'react';
import styles from './Countdown.module.css';

class Countdown extends Component {
  intervalId = 0;

  state = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  };

  componentDidMount() {
    this.updateCountdown();
    this.intervalId = setInterval(this.updateCountdown.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  updateCountdown() {
    let time = Date.parse('2021-11-01') - Date.parse(new Date());

    if (time < 0) return;

    this.setState({
      seconds: Math.floor((time / 1000) % 60),
      minutes: Math.floor((time / 1000 / 60) % 60),
      hours: Math.floor((time / (1000 * 60 * 60)) % 24),
      days: Math.floor(time / (1000 * 60 * 60 * 24))
    });
  }

  render() {
    if (!this.state.days && !this.state.hours && !this.state.minutes && !this.state.seconds) return <div />;

    if (this.props.ppp && this.props.ppp.discount === null) {
      return <div className={styles.banner} style={{ background: this.props.color }}>
        <p className={styles.bannerContent}>Halloween's 38% discount ends in {this.state.days} days, {this.state.hours} hours, {this.state.minutes} minutes, {this.state.seconds} seconds</p>
      </div>
    }

    return <div />
  }
}

export default Countdown;