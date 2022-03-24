import styles from './MetricCard.module.css'

function MetricCard({ metric }) {
  if (metric.link) {
    return (
      <a href={metric.link} target="_blank" className={styles.metric}>
        <h4 className={styles.label}>
          {metric.label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={styles.link}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
        </h4>
        <p className={styles.value}>{metric.value}</p>
      </a>
    )
  } else {
    return (
      <div className={styles.metric}>
        <h4 className={styles.label}>{metric.label}</h4>
        <p className={styles.value}>{metric.value}</p>
      </div>
    )
  }
}

export default MetricCard
