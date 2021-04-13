import { Component } from 'react';
import Link from 'next/link';
import styles from './Topbar.module.css';
import { Anchor, Box, Button, Text } from '@dracula/dracula-ui';

class Topbar extends Component {
  render() {
    return <Box className={styles.fixed}>
      <Box className={styles.topbar}>
        <Link href="/" passHref>
          <Anchor hoverColor="purpleCyan" className="topbar-title">
            Dracula <Text color="purpleCyan" className={styles.secondPart}>UI</Text>
          </Anchor>
        </Link>
        <Button as="a" href="#get" color="purpleCyan" size="sm" mx="xs">
          Get Early Access
        </Button>
      </Box>
    </Box>
  }
}

export default Topbar;