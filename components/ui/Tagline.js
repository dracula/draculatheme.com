import { Component } from 'react';
import styles from './Tagline.module.css';
import { Box, Paragraph, Heading } from 'dracula-ui';

class Tagline extends Component {
  render() {
    return <Box className={styles.tagline}>
      <Box className={styles.svgContainerTop}>
        <svg viewBox="0 0 1792 335" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="rgba(34, 33, 44, 1)" d="M 0 50 C 259 50 259 209 518 209 L 518 209 L 518 0 L 0 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 517 209 C 800 209 800 96 1083 96 L 1083 96 L 1083 0 L 517 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 1082 96 C 1437 96 1437 189 1792 189 L 1792 189 L 1792 0 L 1082 0 Z" strokeWidth="0"></path></svg>
      </Box>
      <Box className={styles.container}>
        <Heading color="cyanGreen" className={styles.title}>Build modern sites faster.</Heading>
        <Paragraph mt="sm" className={styles.description}>Dracula UI makes it easy to create beautiful dark apps using plain HTML or React components.</Paragraph>
      </Box>
      <Box className={styles.svgContainerBottom}>
        <svg viewBox="0 0 1792 335" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="rgba(34, 33, 44, 1)" d="M 0 50 C 259 50 259 209 518 209 L 518 209 L 518 0 L 0 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 517 209 C 800 209 800 96 1083 96 L 1083 96 L 1083 0 L 517 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 1082 96 C 1437 96 1437 189 1792 189 L 1792 189 L 1792 0 L 1082 0 Z" strokeWidth="0"></path></svg>
      </Box>
    </Box >
  }
}

export default Tagline;