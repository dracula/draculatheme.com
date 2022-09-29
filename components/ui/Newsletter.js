import { Component } from 'react'
import styles from './Newsletter.module.css'
import { Box, Heading, Text } from 'dracula-ui'

class Newsletter extends Component {
  render() {
    return (
      <Box pb="lg" className={styles.body}>
        <Heading size="2xl">Not ready to buy?</Heading>
        <Box className={styles.bodyText}>
          <Text>Stay up to date with our latest features and releases</Text>
        </Box>
        <Box className={styles.bodyForm}>
          <form
            className="form"
            action="https://draculatheme.us4.list-manage.com/subscribe/post?u=91b5113403e18d357704e4b08&amp;id=023365a1d4"
            method="post"
          >
            <input
              name="EMAIL"
              placeholder="your@email.com"
              id="mce-EMAIL"
              type="email"
              required
            />
            <input
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
            />
          </form>
        </Box>
      </Box>
    )
  }
}

export default Newsletter
