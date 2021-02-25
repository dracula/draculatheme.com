import { Component } from 'react';
import Tweet from './Tweet.js';
import Takeaway from './Takeaway.js';
import styles from './Period.module.css';

class Period extends Component {
  render() {
    const { title, startDate, endDate, sales, screenshot, links, takeaways, tweets, color } = this.props.journey;
    const date = endDate ? `${startDate} - ${endDate}` : startDate;

    return <div className={styles[color]}>
      <div className={styles.period}>
        <div className={styles.container}>
          <p className={styles.date}>{date}</p>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.sales}>${sales}</p>
          <img className={styles.screenshot} src={`/static/img/pro/journey/${screenshot}.png`} alt={`Dracula PRO sales / ${date}`} />
        </div>
      </div>
      <div className={styles.divider}>
        <p className={styles.lessons}>Lessons learned</p>
      </div>
      {takeaways.map((takeaway, index) => {
        return <Takeaway key={index} data={takeaway} index={index} />
      })}
      <div className={styles.divider}>
        <p className={styles.tweets}>Tweets from this period</p>
      </div>
      {tweets &&
        <div className={styles.tweetList}>
          {tweets.map((tweet, index) => {
            return <Tweet key={index} data={tweet} />
          })}
        </div>
      }
    </div>
  }
}

export default Period;