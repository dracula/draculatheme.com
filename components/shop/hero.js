import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-web'
import animationData from '../../public/static/animated-icons/volume.json'
import styles from './hero.module.css'

function Hero() {
  const [videoMuted, setVideoMuted] = useState(true)
  const [animationDirection, setAnimationDirection] = useState(true)
  const soundIconContainer = useRef()
  const soundIconAnimation = useRef()

  useEffect(() => {
    if (soundIconContainer.current) {
      soundIconAnimation.current = Lottie.loadAnimation({
        container: soundIconContainer.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData,
      })

      return () => soundIconAnimation.current?.destroy()
    }
  }, [soundIconContainer])

  const toggleSound = () => {
    setVideoMuted(!videoMuted)
    setAnimationDirection(!animationDirection)
    soundIconAnimation.current?.setDirection(animationDirection ? -1 : 1)
    soundIconAnimation.current?.play()
  }

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
        <button className={styles.cta}>
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
        </button>
      </div>
      <div className={styles.videoContainer}>
        <div className={styles.video}>
          <video autoPlay muted={videoMuted} loop>
            <source src="/static/video/shop.mp4" type="video/mp4" />
          </video>
          <div className={styles.iconOverlay} onClick={toggleSound}>
            <button onClick={toggleSound}>
              <div
                ref={soundIconContainer}
                className={styles.soundIconContainer}
              ></div>
              <span>Click to {animationDirection ? 'unmute' : 'mute'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
