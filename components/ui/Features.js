import { Component } from 'react';
import styles from './Features.module.css';
import { Box, Paragraph, Heading, Text } from '@dracula/dracula-ui';

class Features extends Component {
  renderFirstFeature() {
    return <div className={styles.content}>
      <div className={styles.contentLeft}>
        <div className={styles.iconContainerFirst}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.icon}><path className={styles.primaryFirst} d="M5 8a7 7 0 1 1 10.62 6l-.64 3.2a1 1 0 0 1-.98.8h-4a1 1 0 0 1-.98-.8L8.38 14A7 7 0 0 1 5 8zm12 0a5 5 0 0 0-5-5 1 1 0 0 0 0 2 3 3 0 0 1 3 3 1 1 0 0 0 2 0z" /><path className={styles.secondaryFirst} d="M15 21a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z" /></svg>
        </div>
        <Heading size="2xl" pb="sm">Built for Dark Mode</Heading>
        <Paragraph pb="sm" className={styles.paragraph}>
          Most templates are built using light colors and later on <Text className={styles.highlight}>adapted to dark colors</Text>.
        </Paragraph>
        <Paragraph pb="sm" className={styles.paragraph}>
          Dark themes shouldn't be an afterthought, they should be a <Text className={styles.highlight}>top priority</Text>.
        </Paragraph>
      </div>
      <div className={styles.contentRight}>
        <div className={styles.background}>
          <img className={styles.image} src="/static/img/ui/image-1.png" alt="" />
        </div>
      </div>
    </div>
  }

  renderSecondFeature() {
    return <div className={styles.content}>
      <div className={styles.contentLeftInverted}>
        <div className={styles.backgroundSecond}>
          <img className={styles.image} src="/static/img/ui/image-2.png" alt="" />
        </div>
      </div>
      <div className={styles.contentRightInverted}>
        <div className={styles.iconContainerSecond}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.icon}><path className={styles.primarySecond} d="M21.97 12.73c-.25-.22-.56-.4-.92-.54L20 11.8a8 8 0 1 0-8.2 8.2l.4 1.06c.12.36.3.67.53.92a10 10 0 1 1 9.25-9.25zm-10.95 5.19a6 6 0 1 1 6.9-6.9l-2.39-.9a4 4 0 1 0-5.41 5.41l.9 2.39z" /><path className={styles.secondarySecond} d="M17.96 16.54l3.75 3.75a1 1 0 0 1-1.42 1.42l-3.75-3.75-.57 2.28a1 1 0 0 1-1.9.11l-3-8a1 1 0 0 1 1.28-1.29l8 3a1 1 0 0 1-.1 1.91l-2.3.57z" /></svg>
        </div>
        <Heading size="2xl" pb="sm">Designer Friendly</Heading>
        <Paragraph pb="sm" className={styles.paragraph}>
          Speed up the prototyping phase by using a highly configurable <Text className={styles.highlight}>Design System</Text>.
        </Paragraph>
        <Paragraph pb="sm" className={styles.paragraph}>
          Collaborate easily by taking advantage of a carefully crafted <Text className={styles.highlight}>Figma</Text> file.
        </Paragraph>
      </div>
    </div>
  }

  renderThirdFeature() {
    return <div className={styles.content}>
      <div className={styles.contentLeft}>
        <div className={styles.iconContainerThird}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.icon}><rect width="18" height="18" x="3" y="3" className={styles.primaryThird} rx="2" /><path className={styles.secondaryThird} d="M8.7 13.3a1 1 0 0 1-1.4 1.4l-2-2a1 1 0 0 1 0-1.4l2-2a1 1 0 1 1 1.4 1.4L7.42 12l1.3 1.3zm6.6 0l1.29-1.3-1.3-1.3a1 1 0 1 1 1.42-1.4l2 2a1 1 0 0 1 0 1.4l-2 2a1 1 0 0 1-1.42-1.4zm-3.32 3.9a1 1 0 0 1-1.96-.4l2-10a1 1 0 0 1 1.96.4l-2 10z" /></svg>
        </div>
        <Heading size="2xl" pb="sm">Great Developer Experience</Heading>
        <Paragraph pb="sm" className={styles.paragraph}>
          Don't worry about class names, just use the <Text className={styles.highlight}>Visual Studio Code</Text> code snippets.
        </Paragraph>
        <Paragraph pb="sm" className={styles.paragraph}>
          You can take advantage of autocomplete and also access the <Text className={styles.highlight}>entire documentation</Text> right from your code editor.
        </Paragraph>
      </div>
      <div className={styles.contentRight}>
        <div className={styles.backgroundThird}>
          <img className={styles.image} src="/static/img/ui/image-3.png" alt="" />
        </div>
      </div>
    </div>
  }

  render() {
    return <div className={styles.features}>
      <Box className={styles.svgContainerTop}>
        <svg viewBox="0 0 1792 335" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="rgba(34, 33, 44, 1)" d="M 0 50 C 259 50 259 209 518 209 L 518 209 L 518 0 L 0 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 517 209 C 800 209 800 96 1083 96 L 1083 96 L 1083 0 L 517 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 1082 96 C 1437 96 1437 189 1792 189 L 1792 189 L 1792 0 L 1082 0 Z" strokeWidth="0"></path></svg>
      </Box>
      <div className={styles.container}>
        {this.renderFirstFeature()}
        {this.renderSecondFeature()}
        {this.renderThirdFeature()}
      </div>
      <Box className={styles.svgContainerBottom}>
        <svg viewBox="0 0 1792 335" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="rgba(34, 33, 44, 1)" d="M 0 50 C 259 50 259 209 518 209 L 518 209 L 518 0 L 0 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 517 209 C 800 209 800 96 1083 96 L 1083 96 L 1083 0 L 517 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 1082 96 C 1437 96 1437 189 1792 189 L 1792 189 L 1792 0 L 1082 0 Z" strokeWidth="0"></path></svg>
      </Box>
    </div >
  }
}

export default Features;