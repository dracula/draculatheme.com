import { Component } from 'react';
import moment from 'moment';
import styles from './Reviews.module.css';

class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAllButton: true,
      reviews: props.reviews.slice(0, 3)
    };
  }

  showAll(e) {
    this.setState({
      showAllButton: false,
      reviews: this.props.reviews
    });

    e.preventDefault();
  }

  renderSummary() {
    return <div className={styles.summaryContainer}>
      <div className={styles.summary}>
        <div className={styles.data}>
          <p className={styles.avgRating}>4.9</p>
          <div>
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
          </div>
          <p>225 ratings</p>
        </div>
        <div className={styles.progressBars}>
          <div className={styles.progressBarContainer}>
            <div style={{ width: '95%' }} className={styles.progressBarContent}></div>
          </div>
          <div className={styles.progressBarContainer}>
            <div style={{ width: '5%' }} className={styles.progressBarContent}></div>
          </div>
          <div className={styles.progressBarContainer}>
            <div style={{ width: 0 }} className={styles.progressBarContent}></div>
          </div>
          <div className={styles.progressBarContainer}>
            <div style={{ width: 0 }} className={styles.progressBarContent}></div>
          </div>
          <div className={styles.progressBarContainer}>
            <div style={{ width: 0 }} className={styles.progressBarContent}></div>
          </div>
        </div>
        <div className={styles.percentageRatings}>
          <div className={styles.percentRating}>
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <span className={styles.percent}>95%</span>
          </div>
          <div className={styles.percentRating}>
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-empty.svg" alt="Star" />
            <span className={styles.percent}>5%</span>
          </div>
          <div className={styles.percentRating}>
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-empty.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-empty.svg" alt="Star" />
            <span className={styles.percent}>0%</span>
          </div>
          <div className={styles.percentRating}>
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-empty.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-empty.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-empty.svg" alt="Star" />
            <span className={styles.percent}>0%</span>
          </div>
          <div className={styles.percentRating}>
            <img className={styles.avgRatingStar} src="/static/img/pro/star-filled.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-empty.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-empty.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-empty.svg" alt="Star" />
            <img className={styles.avgRatingStar} src="/static/img/pro/star-empty.svg" alt="Star" />
            <span className={styles.percent}>0%</span>
          </div>
        </div>
      </div>
      <a className={styles.leaveReview} href="https://form.typeform.com/to/WWQLq9" target="_blank">Write a review</a>
    </div>
  }

  renderReviews() {
    return <div>
      {this.state.reviews.map(review => {
        return <div key={review.id} className={styles.review}>
          <div>
            <img className={styles.avatar} src={`https://github.com/${review.github}.png?size=140`} alt={review.name} width="70" height="70" />
          </div>
          <div>
            <div className={styles.name}>{review.name}
              {review.country &&
                <img className={styles.country} src={`/static/img/flags/${review.country}.svg`} alt={review.country} width="100" />
              }
            </div>
            <div className={styles.date}>{moment(review.date).fromNow()}</div>
            <div className={styles.body}>{review.body}</div>
          </div>
        </div>
      })}
    </div>
  }

  render() {
    return <div id="reviews" className={styles.reviews}>
      <div className={styles.container}>
        {this.renderSummary()}
        {this.renderReviews()}
        <div className={styles.ctaContainer}>
          <a style={{ display: this.state.showAllButton ? 'block' : 'none' }} className={styles.cta} onClick={this.showAll.bind(this)}>More Reviews</a>
        </div>
      </div>
    </div>
  }
}

export default Reviews;