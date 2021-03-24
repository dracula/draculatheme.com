import { Component } from 'react';
import styles from './Footer.module.css';
import { Box, Text, Paragraph } from 'dracula-ui';

class Footer extends Component {
  render() {
    return <Box className={styles.footer}>
      <Paragraph size="medium" className="credits">
        Made with <Text size="large" className="love">♥</Text> by <a className="drac-text-purple-cyan" href="https://twitter.com/zenorocha" target="blank">Zeno Rocha</a> & <a className="drac-text-cyan-green" href="https://twitter.com/nettofarah" target="blank">Netto Farah</a>
      </Paragraph>
    </Box>
  }
}

export default Footer;