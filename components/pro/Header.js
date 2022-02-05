import { Component } from "react";
import styles from "./Header.module.css";

class Header extends Component {
	render() {
		return (
			<div className={styles.header}>
				<h1 className={styles.title}>Dracula PRO</h1>
				<h2 className={styles.slogan}>Be more productive</h2>
				<p className={styles.body}>
					<img
						className={styles.emoji}
						width="28"
						height="28"
						src="/static/img/pro/journey/icon-party.svg"
						alt="Party"
					/>
					{this.props.sales.count} copies or{" "}
					<a href="/pro/journey" target="_blank" className={styles.link}>
						{this.props.sales.total}
					</a>{" "}
					sold
				</p>
				<a href="#get" className={styles.cta}>
					Get it now
				</a>
			</div>
		);
	}
}

export default Header;
