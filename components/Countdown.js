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
    let time = Date.parse('2020-11-28') - Date.parse(new Date());

    if (time < 0) return;

    this.setState({
      seconds: Math.floor((time / 1000) % 60),
      minutes: Math.floor((time / 1000 / 60) % 60),
      hours:   Math.floor((time / (1000 * 60 * 60)) % 24),
      days:    Math.floor(time / (1000 * 60 * 60 * 24))
    });
  }

  render() {
    if (!this.state.days && !this.state.hours && !this.state.minutes && !this.state.seconds) return <span />;

    return <a className={styles.banner} href="https://gumroad.com/l/dracula-pro/BLACKFRIDAY" target="_blank">
      <p className={styles.bannerContent}>Black Friday 50% discount ends in {this.state.days} days, {this.state.hours} hours, {this.state.minutes} min, {this.state.seconds} seconds</p>
    </a>
  }
}

export default Countdown;