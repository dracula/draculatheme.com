import { Component } from 'react';
import Link from 'next/link';
import styles from './Topbar.module.css';

class Topbar extends Component {
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
  	let time = Date.parse('2020-09-01') - Date.parse(new Date());

  	if (time < 0) return;

    this.setState({
    	seconds: Math.floor((time / 1000) % 60),
    	minutes: Math.floor((time / 1000 / 60) % 60),
    	hours:   Math.floor((time / (1000 * 60 * 60)) % 24),
    	days:    Math.floor(time / (1000 * 60 * 60 * 24))
    });
  }

  renderCountdown() {
  	if (!this.state.days && !this.state.hours && !this.state.minutes && !this.state.seconds) return;

  	return <div className={styles.banner}>
  		<p className={styles.bannerContent}>Launch Promo ends in {this.state.days} days, {this.state.hours} hours, {this.state.minutes} minutes, {this.state.seconds} seconds</p>
  	</div>
  }
  render() {
    return <div className={styles.fixed}>
    	{this.renderCountdown()}
	    <nav className={styles.topbar}>
	      <Link href="/">
	        <a className="topbar-title">Dracula <span className={styles.titlePro}>PRO</span></a>
	      </Link>
	      <a href="#get" className={styles.cta}>Get it now</a>
	    </nav>
    </div>
  }
}

export default Topbar;