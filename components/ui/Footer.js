import { Component } from 'react';
import styles from './Footer.module.css';
import { Anchor, Box, Text, Paragraph } from '@dracula/dracula-ui';

class Footer extends Component {
  render() {
    return <Box className={styles.footer}>
      <Paragraph size="medium" className="credits">
        Made with <Text size="lg" className="love">♥</Text> by <Anchor className="drac-text-purple-cyan" href="https://twitter.com/zenorocha" target="blank">Zeno Rocha</Anchor> & <Anchor className="drac-text-cyan-green" href="https://twitter.com/nettofarah" target="blank">Netto Farah</Anchor>
      </Paragraph>
    </Box>
  }
}

export default Footer;