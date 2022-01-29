import { Component } from "react";
import styles from "./Footer.module.css";

class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        <p
          style={{ fontFamily: "Fira Code, monospace", margin: 0 }}
          className="credits"
        >
          Made with{" "}
          <span style={{ fontSize: 36 }} className="love">
            ♥
          </span>{" "}
          by{" "}
          <a className="green" href="https://zenorocha.com" target="blank">
            Zeno Rocha
          </a>
        </p>
      </div>
    );
  }
}

export default Footer;
