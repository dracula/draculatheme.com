import { Component } from 'react';
import Link from 'next/link';
import styles from './Topbar.module.css';
import { Anchor, Box, Button, Text } from 'dracula-ui';

class Topbar extends Component {
  render() {
    return <Box className={styles.fixed}>
      <Box className={styles.topbar}>
        <Link href="/">
          <Anchor hoverColor="purpleCyan" className="topbar-title">
            Dracula <Text color="purpleCyan" className={styles.secondPart}>UI</Text>
          </Anchor>
        </Link>
        <Button as="a" href="#get" color="purpleCyan" size="small" style={{ color: '#14141b', marginLeft: 10, marginRight: 10 }}>
          Get Early Access
        </Button>
      </Box>
    </Box>
  }
}

export default Topbar;