import { Component } from "react";
import moment from "moment";
import styles from "./Tweet.module.css";

class Tweet extends Component {
  render() {
    let { data } = this.props;

    if (data.entities && data.entities.urls && data.entities.urls.length) {
      data.entities.urls.map((url) => {
        if (url.display_url.indexOf("twitter.com") !== -1) {
          data.text = data.text.replace(url.url, "");
        }

        data.text = data.text.replace(
          url.url,
          `<strong>${url.display_url}</strong>`
        );
      });
    }

    return (
      <a
        className={styles.tweet}
        href={`https://twitter.com/zenorocha/status/${data.id}`}
        target="_blank"
      >
        <div className={styles.logoContainer}>
          <svg
            className={styles.logoLink}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        </div>
        <div className={styles.author}>
          <div>
            <img
              className={styles.avatar}
              src="/static/img/pro/journey/about.jpg"
              alt="Zeno Rocha"
            />
          </div>
          <div>
            <span className={styles.name}>Zeno Rocha</span>
            <span className={styles.handle}>@zenorocha</span>
          </div>
        </div>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
        {data.image && <img className={styles.image} src={data.image} alt="" />}
        <div className={styles.timestamp}>
          {moment(data.created_at).format("LT")} ·{" "}
          {moment(data.created_at).format("MMM D, YYYY")}
        </div>
        <div className={styles.metadata}>
          <svg
            className={styles.icons}
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
          >
            <g>
              <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
            </g>
          </svg>
          <span className={styles.data} style={{ marginRight: 20 }}>
            {data.public_metrics ? data.public_metrics.like_count : "0"}
          </span>
          <svg
            className={styles.icons}
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
          >
            <g>
              <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
            </g>
          </svg>
          <span className={styles.data}>
            {data.public_metrics ? data.public_metrics.reply_count : "0"}
          </span>
        </div>
      </a>
    );
  }
}

export default Tweet;
