import styles from './hero.module.css'

function Hero() {
  return (
    <div className={styles.shopHero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Buy the Dracula Collection</h1>
        <div className={styles.text}>
          <p>
            A vampire of refined manners needs an elegant outfit for his
            perpetual night.
          </p>
        </div>
        <a href="#shopCollection" className={styles.cta}>
          <span>Shop the collection</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
            />
          </svg>
        </a>
      </div>
      <div className={styles.videoContainer}>
        <div className={styles.video}>
          <iframe
            src="https://www.youtube-nocookie.com/embed/jU0A9T1IIaQ?controls=0"
            title="Video showing the manufacture of products from the Dracula collection"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Hero
