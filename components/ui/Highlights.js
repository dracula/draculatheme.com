import { Component } from 'react';
import styles from './Highlights.module.css';
import { Box, Paragraph, Heading, Text } from 'dracula-ui';

const gradients = [
  {
    name: 'purpleCyan',
    primaryColor: '#9580FF',
    secondaryColor: '#80FFEA',
  }
]

const contrast = [
  {
    name: 'yellow',
    color: '#FFFF80',
    ratio: '15.69',
    score: 'AAA',
    matchingGradient: 'yellowPink'
  }
]

class Highlights extends Component {
  state = {
    gradient: gradients[0],
    contrast: contrast[0]
  };

  render() {
    return <Box className={styles.features}>
      <Box className={styles.svgContainerTop}>
        <svg viewBox="0 0 1792 335" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="rgba(34, 33, 44, 1)" d="M 0 50 C 259 50 259 209 518 209 L 518 209 L 518 0 L 0 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 517 209 C 800 209 800 96 1083 96 L 1083 96 L 1083 0 L 517 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 1082 96 C 1437 96 1437 189 1792 189 L 1792 189 L 1792 0 L 1082 0 Z" strokeWidth="0"></path></svg>
      </Box>
      <Box className={styles.container}>
        <Box>
          <Box className={styles.card}>
            <Box color={this.state.contrast.matchingGradient} className={styles.cardBackground}>
              <Box rounded="xl" className={styles.cardDetailsContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconCheck} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" className={styles.primary} /><path className={styles.secondary} d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z" /></svg>
                <Box>
                  <Paragraph m="none">{this.state.contrast.ratio}</Paragraph>
                  <Paragraph m="none" className={styles.gray}>{this.state.contrast.score}</Paragraph>
                </Box>
              </Box>
            </Box>
            <Box p="md">
              <Heading size="heading-2">Enhanced Accessibility</Heading>
              <Paragraph mt="sm" lineHeight="large">All <Text color="yellowPink">accent colors</Text> are tested not only against the WCAG 2.1 Level AA spec, but also <Text color="yellowPink">WCAG Level AAA</Text>, which requires a contrast ratio of at least 7:1. This gives you the <Text color="yellowPink">best readability</Text> possible.</Paragraph>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className={styles.card}>
            <Box color={this.state.gradient.name} className={styles.cardBackground}>
              <Box rounded="xl" className={styles.cardDetailsContainer}>
                <Box color={this.state.gradient.name} rounded="full" className={styles.cardDetails}></Box>
                <Box>
                  <Paragraph m="none">{this.state.gradient.primaryColor}</Paragraph>
                  <Paragraph m="none" className={styles.gray}>{this.state.gradient.secondaryColor}</Paragraph>
                </Box>
              </Box>
            </Box>
            <Box p="md">
              <Heading size="heading-2">Aesthetically Pleasing</Heading>
              <Paragraph mt="sm" lineHeight="large">Gradients are a surprisingly versatile tool. They can introduce <Text color="purpleCyan">depth and dimension</Text> to your app. By using one of our well-designed gradients, you can subconsciously lead users toward the <Text color="purpleCyan">focal point</Text>.</Paragraph>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className={styles.card}>
            <Box color="pinkPurple" className={styles.cardBackground}>
              <Box rounded="xl" className={styles.cardDetailsContainer}>
                <Box color="pink" rounded="full" className={styles.cardDetails}>
                  <Text className={styles.typographyDetail}>a</Text>
                </Box>
                <Box>
                  <Paragraph m="none">ABCDEF</Paragraph>
                  <Paragraph m="none" className={styles.gray}>012345</Paragraph>
                </Box>
              </Box>
            </Box>
            <Box p="md">
              <Heading size="heading-2">Appealing Typography</Heading>
              <Paragraph mt="sm" lineHeight="large"><Text color="pinkPurple">Good legibility</Text> is crucial to make sure the users can do their job well and with as <Text color="pinkPurple">little fatigue</Text> as possible. You can choose between <Text color="pinkPurple">different monospaced</Text>, serif, and sans-serif fonts.</Paragraph>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.svgContainerBottom}>
        <svg viewBox="0 0 1792 335" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="rgba(34, 33, 44, 1)" d="M 0 50 C 259 50 259 209 518 209 L 518 209 L 518 0 L 0 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 517 209 C 800 209 800 96 1083 96 L 1083 96 L 1083 0 L 517 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 1082 96 C 1437 96 1437 189 1792 189 L 1792 189 L 1792 0 L 1082 0 Z" strokeWidth="0"></path></svg>
      </Box>
    </Box>
  }
}

export default Highlights;