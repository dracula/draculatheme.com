import { Component } from "react";
import styles from "./Header.module.css";

class Header extends Component {
	render() {
		return (
			<div className={styles.header}>
				<h1 className={styles.title}>A solo journey to 150k</h1>
				<h2 className={styles.slogan}>
					Dracula PRO has hit 150K in sales — here's everything I learned along the
					way
				</h2>
				<img
					className={styles.screenshot}
					src="/static/img/pro/journey/0.png"
					alt="Dracula PRO sales from Feb 2020 to Feb 2021"
				/>
			</div>
		);
	}
}

export default Header;
