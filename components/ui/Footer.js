import { Component } from 'react'
import styles from './Footer.module.css'
import { Anchor, Box, Text, Paragraph } from 'dracula-ui'

class Footer extends Component {
  render() {
    return (
      <Box className={styles.footer}>
        <Paragraph size="medium" size="lg" className="credits">
          Made with{' '}
          <Text size="lg" className="love">
            ♥
          </Text>{' '}
          by{' '}
          <Anchor
            color="purpleCyan"
            size="lg"
            href="https://twitter.com/zenorocha"
            target="blank"
          >
            Zeno Rocha
          </Anchor>{' '}
          &{' '}
          <Anchor
            color="cyanGreen"
            size="lg"
            href="https://twitter.com/nettofarah"
            target="blank"
          >
            Netto Farah
          </Anchor>
        </Paragraph>
      </Box>
    )
  }
}

export default Footer
