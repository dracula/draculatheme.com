import { Component } from 'react';
import styles from './Authors.module.css';
import { Box, Paragraph, Heading } from 'dracula-ui';

const authors = [
  {
    avatar: "zeno-rocha",
    intro: "Hey, I'm Zeno",
    bio: "I'm obsessed with dark mode and re-usable components. I started building <span class='drac-text-purple-cyan'>UI libraries</span> back in 2012 using jQuery and YUI.<br /><br />A year later, I designed my own dark theme, Dracula, which became a <span class='drac-text-purple-cyan'>widely adopted color scheme</span> among top developers.<br /><br />Now, I'm building the ultimate collection of dark UI components. I'm so excited to <span class='drac-text-purple-cyan'>help you build</span> your own apps faster!",
    location: "Los Angeles, CA",
    color: "purpleCyan"
  },
  {
    avatar: "netto-farah",
    intro: "And I'm Netto",
    bio: "I love building tools to empower engineers to <span class='drac-text-cyan-green'>build things faster</span> and more reliably.<br /><br />On my day to day job at Segment (Twilio), I write JavaScript code that <span class='drac-text-cyan-green'>runs on billions of devices</span> every single day.<br /><br />I'm always looking for creative ways to build great user experiences on the web and <span class='drac-text-cyan-green'>I can't wait</span> to see what you're going to create with this.",
    location: "Austin, TX",
    color: "cyanGreen"
  },
];

class Authors extends Component {
  renderAuthor(author) {
    return <Box className={styles.author}>
      <img className={styles.photo} src={`/static/img/ui/${author.avatar}.jpeg`} alt={author.avatar} />
      <Box className={styles.content}>
        <Heading my="none" color={author.color} size="heading-2">
          {author.intro}
        </Heading>
        <Paragraph my="sm" dangerouslySetInnerHTML={{ __html: author.bio }} />
        <Paragraph mb="none" color={author.color}>
          // {author.location}
        </Paragraph>
      </Box>
    </Box>
  }

  render() {
    return <Box className={styles.authors}>
      <Box className={styles.container}>
        {this.renderAuthor(authors[0])}
        {this.renderAuthor(authors[1])}
      </Box>
    </Box>
  }
}

export default Authors;