import { Component } from "react";
import styles from "./Why.module.css";

class Why extends Component {
  render() {
    return (
      <div className={styles.why}>
        <div className={styles.container}>
          <div className={styles.content}>
            <svg
              fill="#70a99f"
              width="48"
              height="48"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <title>ionicons-v5-flash</title>
              <path d="M194.82,496a18.36,18.36,0,0,1-18.1-21.53l0-.11L204.83,320H96a16,16,0,0,1-12.44-26.06L302.73,23a18.45,18.45,0,0,1,32.8,13.71c0,.3-.08.59-.13.89L307.19,192H416a16,16,0,0,1,12.44,26.06L209.24,489A18.45,18.45,0,0,1,194.82,496Z" />
            </svg>
            <h3 className={styles.title}>Why Dracula PRO</h3>
            <p className={styles.body}>
              In 2013,{" "}
              <a href="/about" target="_blank" className={styles.link}>
                my laptop was stolen
              </a>{" "}
              and I had to re-configure everything. At that time, there were
              thousands of themes out there, but none of them were appealing to
              me. So I decided to{" "}
              <span className={styles.highlight}>create my own</span>.
            </p>
            <p className={styles.body}>
              Fast forward to 2020, Dracula is one of the most popular themes in
              the world. Still, I felt that something was missing. I wanted to
              help with{" "}
              <span className={styles.highlight}>more than just a theme</span>,
              that's why I created Dracula PRO.
            </p>
            <p className={styles.body}>
              This is a package built for developers who are willing to invest
              in their productivity.
            </p>
            <p className={styles.body}>
              <span className={styles.highlight}>- Zeno Rocha</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Why;
