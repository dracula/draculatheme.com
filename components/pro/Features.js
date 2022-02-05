import { Component } from "react";
import styles from "./Features.module.css";

class Features extends Component {
	render() {
		return (
			<div className={styles.features}>
				<ul className={styles.container}>
					<li className={styles.item}>
						<svg
							fill="#a97079"
							width="48"
							height="48"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<title>ionicons-v5-eye</title>
							<circle cx="256" cy="256" r="64" />
							<path d="M490.84,238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349,110.55,302,96,255.66,96c-42.52,0-84.33,12.15-124.27,36.11C90.66,156.54,53.76,192.23,21.71,238.18a31.92,31.92,0,0,0-.64,35.54c26.41,41.33,60.4,76.14,98.28,100.65C162,402,207.9,416,255.66,416c46.71,0,93.81-14.43,136.2-41.72,38.46-24.77,72.72-59.66,99.08-100.92A32.2,32.2,0,0,0,490.84,238.6ZM256,352a96,96,0,1,1,96-96A96.11,96.11,0,0,1,256,352Z" />
						</svg>
						<p className={styles.title}>Easy on the Eyes</p>
						<p className={styles.body}>
							Dark mode is everywhere, and there's a reason for that. From improved
							battery consumption to{" "}
							<span className={styles.highlight}>better visibility</span> on low-light
							environments, there are many reasons to love.
						</p>
					</li>
					<li className={styles.item}>
						<svg
							fill="#a97079"
							width="48"
							height="48"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<title>ionicons-v5-toggle</title>
							<path d="M368,112H144C64.6,112,0,176.6,0,256S64.6,400,144,400H368c79.4,0,144-64.6,144-144S447.4,112,368,112Zm0,256A112,112,0,1,1,480,256,112.12,112.12,0,0,1,368,368Z" />
						</svg>
						<p className={styles.title}>Less Context Switch</p>
						<p className={styles.body}>
							By having the same color scheme across multiple apps, you{" "}
							<span className={styles.highlight}>reduce the time</span> it takes to
							switch context between tasks. That's why Dracula PRO is available in as
							many platforms as possible.
						</p>
					</li>
					<li className={styles.item}>
						<svg
							fill="#a97079"
							width="48"
							height="48"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<title>ionicons-v5-contrast</title>
							<path d="M256,32A224,224,0,0,0,97.61,414.39,224,224,0,1,0,414.39,97.61,222.53,222.53,0,0,0,256,32ZM64,256C64,150.13,150.13,64,256,64V448C150.13,448,64,361.87,64,256Z" />
						</svg>
						<p className={styles.title}>Precise Contrast</p>
						<p className={styles.body}>
							The entire palette was tested against the WCAG 2.0 level AA spec, which
							requires a contrast ratio of at least 4.5:1 for normal text, therefore
							affording the <span className={styles.highlight}>best readability</span>.
						</p>
					</li>
				</ul>
			</div>
		);
	}
}

export default Features;
