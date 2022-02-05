import { Component } from "react";
import styles from "./Fonts.module.css";

class Fonts extends Component {
	render() {
		return (
			<div className={styles.fonts}>
				<div className={styles.container}>
					<div className={styles.contentLeft}>
						<svg
							fill="#7970A9"
							width="48"
							height="48"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<title>ionicons-v5-code-slash</title>
							<path d="M160,389a20.91,20.91,0,0,1-13.82-5.2l-128-112a21,21,0,0,1,0-31.6l128-112a21,21,0,0,1,27.66,31.61L63.89,256l109.94,96.19A21,21,0,0,1,160,389Z" />
							<path d="M352,389a21,21,0,0,1-13.84-36.81L448.11,256,338.17,159.81a21,21,0,0,1,27.66-31.61l128,112a21,21,0,0,1,0,31.6l-128,112A20.89,20.89,0,0,1,352,389Z" />
							<path d="M208,437a21,21,0,0,1-20.12-27l96-320A21,21,0,1,1,324.11,102l-96,320A21,21,0,0,1,208,437Z" />
						</svg>
						<h3 className={styles.title}>Hand-picked Typography</h3>
						<p className={styles.body}>
							I carefully selected 4 monospaced programming fonts that fit perfectly
							with Dracula PRO. These fonts have{" "}
							<span className={styles.highlight}>built-in ligature support</span> that
							improves readability.
						</p>
						<p className={styles.body}>
							By displaying one shorter glyph instead of 2 or sometimes 3, the{" "}
							<span className={styles.highlight}>human brain spends less energy</span>{" "}
							to scan, parse, and join multiple characters into a single one.
						</p>
						<p className={styles.body}>
							<span className={styles.highlight}>Don't like ligatures?</span> No
							problem, you can still use those fonts.
						</p>
						<a href="#get" className={styles.cta}>
							Get all fonts
						</a>
					</div>
					<div className={styles.contentRight}>
						<video className={styles.video} autoPlay muted loop>
							<source src="/static/video/ligatures.mp4" type="video/mp4" />
						</video>
					</div>
				</div>
			</div>
		);
	}
}

export default Fonts;
