import { Component } from 'react';
import styles from './Header.module.css';
import { Box, Button, Heading, Text } from 'dracula-ui';

class Header extends Component {
  render() {
    return <Box className={styles.header}>
      <Heading className={styles.title}>
        Dracula <Text color="purpleCyan" className={styles.title}>UI</Text>
      </Heading>
      <Box mt="sm" mb="md" className={styles.subtitle}>
        <Text className={styles.bodyText}>
          A dark-first collection of <Text color="purpleCyan" className={styles.bodyText}>UI patterns and components</Text>
        </Text>
      </Box>
      <Box style={{ marginTop: 20 }}>
        <Button as="a" href="#get" color="purpleCyan" size="large" style={{ color: '#14141b' }}>
          Get Early Access
        </Button>
      </Box>
    </Box>
  }
}

export default Header;