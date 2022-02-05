import { Component } from "react";
import styles from "./Takeaway.module.css";

class Takeaway extends Component {
	render() {
		const { data, index } = this.props;

		return (
			<div className={index % 2 ? styles.takeawayOdd : styles.takeawayEven}>
				<div className={styles[data.color]}>
					<div className={styles.container}>
						<div className={styles.emojiContainer}>
							<img
								className={styles.emoji}
								src={`/static/img/pro/journey/icon-${data.emoji}.svg`}
								alt={data.emoji}
							/>
						</div>
						<p
							className={styles.text}
							dangerouslySetInnerHTML={{ __html: data.text }}
						/>
						<div className={styles.emojiContainer}>
							<img
								className={styles.emoji}
								src={`/static/img/pro/journey/icon-${data.emoji}.svg`}
								alt={data.emoji}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Takeaway;
