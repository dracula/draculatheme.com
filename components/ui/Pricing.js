import { Component } from 'react';
import styles from './Pricing.module.css';
import { getDiscount } from '../../lib/discount';
import { Button, Box, List, Paragraph, Heading, Text } from 'dracula-ui';

class Pricing extends Component {
  renderPrimary() {
    let beforePrice = 249;
    let afterPrice = 149;
    let gumroadURL = 'https://gum.co/dracula-ui?wanted=true&variant=Complete%20Package';

    if (this.props.ppp.country && this.props.ppp.discount) {
      beforePrice = 149;
      afterPrice = getDiscount(beforePrice, this.props.ppp.discount);
      gumroadURL = `https://gumroad.com/l/dracula-ui/${this.props.ppp.country}UI?wanted=true&variant=Complete%20Package`;
    }

    return <Box rounded="2xl" className={styles.primaryTable}>
      <Paragraph color="cyanGreen" className={styles.packageName}>
        Complete Package
      </Paragraph>
      <Paragraph my="sm" className={styles.primaryPrice}>
        <Text className={styles.primaryBeforePrice}>
          ${beforePrice}
        </Text>
        ${afterPrice}
      </Paragraph>
      <List variant="none" m="none">
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconCheck} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" className={styles.primary} /><path className={styles.secondary} d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z" /></svg>
          <Text>High-quality Components</Text>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconCheck} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" className={styles.primary} /><path className={styles.secondary} d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z" /></svg>
          <Text>Full Page Templates</Text>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconCheck} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" className={styles.primary} /><path className={styles.secondary} d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z" /></svg>
          <Text>Unlimited Projects</Text>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconCheck} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" className={styles.primary} /><path className={styles.secondary} d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z" /></svg>
          <Text>Lifetime Updates</Text>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconCheck} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" className={styles.primary} /><path className={styles.secondary} d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z" /></svg>
          <Text>Figma Design System</Text>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconCheck} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" className={styles.primary} /><path className={styles.secondary} d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z" /></svg>
          <Text>Exclusive Community</Text>
        </li>
      </List>
      <Box className={styles.buy}>
        <Button as="a" href={gumroadURL} color="cyanGreen" mt="md" mb="sm" size="large" style={{ color: '#1d1e26', textAlign: 'center' }}>
          Get Early Access
        </Button>
      </Box>
      <Paragraph className={styles.refund}>
        30 days refund (no Q/A)
      </Paragraph>
    </Box>
  }

  renderSecondary() {
    let beforePrice = 129;
    let afterPrice = 99;
    let gumroadURL = 'https://gum.co/dracula-ui?wanted=true';

    if (this.props.ppp.country && this.props.ppp.discount) {
      beforePrice = 99;
      afterPrice = getDiscount(beforePrice, this.props.ppp.discount);
      gumroadURL = `https://gumroad.com/l/dracula-ui/${this.props.ppp.country}UI?wanted=true`;
    }

    return <Box className={styles.secondaryTable}>
      <Paragraph className={styles.packageName}>
        Essential Package
      </Paragraph>
      <Paragraph my="sm" className={styles.secondaryPrice}>
        <Text className={styles.secondaryBeforePrice}>
          ${beforePrice}
        </Text>
        ${afterPrice}
      </Paragraph>
      <List variant="none" m="none">
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconCheck} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" className={styles.primary} /><path className={styles.secondary} d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z" /></svg>
          <Text>High-quality Components</Text>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconCheck} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" className={styles.primary} /><path className={styles.secondary} d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z" /></svg>
          <Text>Unlimited Projects</Text>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconCheck} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" className={styles.primary} /><path className={styles.secondary} d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z" /></svg>
          <Text>Lifetime Updates</Text>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconCheck} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" className={styles.primary} /><path className={styles.secondary} d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z" /></svg>
          <Text>Exclusive Community</Text>
        </li>
      </List>
      <Box className={styles.buy}>
        <Button as="a" href={gumroadURL} color="cyanGreen" mt="md" mb="sm" size="medium" style={{ color: '#1d1e26', textAlign: 'center' }}>
          Get Early Access
        </Button>
      </Box>
      <Paragraph className={styles.refund}>
        30 days refund (no Q/A)
      </Paragraph>
    </Box>
  }

  render() {
    return <Box id="get" className={styles.pricing}>
      <Box className={styles.svgContainerTop}>
        <svg viewBox="0 0 1792 335" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="rgba(34, 33, 44, 1)" d="M 0 50 C 259 50 259 209 518 209 L 518 209 L 518 0 L 0 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 517 209 C 800 209 800 96 1083 96 L 1083 96 L 1083 0 L 517 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 1082 96 C 1437 96 1437 189 1792 189 L 1792 189 L 1792 0 L 1082 0 Z" strokeWidth="0"></path></svg>
      </Box>
      <Box className={styles.container}>
        <Heading size="heading-1" className={styles.title}>
          Join the Dark Side
        </Heading>
        <Paragraph lineHeight="medium" mt="sm" mb="lg" className={styles.description}>
          Get early access to dozens of components and start building gorgeous dark sites today.
        </Paragraph>
        <Box className={styles.tables}>
          {this.renderSecondary()}
          {this.renderPrimary()}
        </Box>
      </Box>
      <Box className={styles.svgContainerBottom}>
        <svg viewBox="0 0 1792 335" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="rgba(34, 33, 44, 1)" d="M 0 50 C 259 50 259 209 518 209 L 518 209 L 518 0 L 0 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 517 209 C 800 209 800 96 1083 96 L 1083 96 L 1083 0 L 517 0 Z" strokeWidth="0"></path> <path fill="rgba(34, 33, 44, 1)" d="M 1082 96 C 1437 96 1437 189 1792 189 L 1792 189 L 1792 0 L 1082 0 Z" strokeWidth="0"></path></svg>
      </Box>
    </Box>
  }
}

export default Pricing;