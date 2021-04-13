import { Component } from 'react';
import styles from './Faq.module.css';
import { Box, Paragraph, Heading } from '@dracula/dracula-ui';

const items = [
  {
    question: `Why is this "early access"?`,
    answer: `Our goal is to build something special, so instead of waiting months to release this, we decided to offer an early access version that will allow you to give feedback and shape the future of this project.`
  },
  {
    question: `Is this a yearly subscription?`,
    answer: `No, Dracula UI includes lifetime access to all our components and patterns. This means that you'll receive free updates every time we build something new.`
  },
  {
    question: `What can I do with this license?`,
    answer: `You can use this to build almost anything, including your own commercial projects, client projects, or open source projects. The only restriction we have is creating derivative competing products.`
  },
  {
    question: `What kind of support do I get?`,
    answer: `You'll get access to a private GitHub repository where you can report bugs and get help with usage questions. You'll also get access to a private Discord with other Dracula UI users.`
  },
  {
    question: `Is there a light theme included?`,
    answer: `At this point Dracula UI is 100% focused on dark mode apps. Although vampires can't stand the light, we're open to the possibility of adding a light color palette in the future.`
  },
  {
    question: `What is your refund policy?`,
    answer: `If you're unhappy with Dracula UI for some reason, feel free to email me at zeno@draculatheme.com within 30 days and I'll fully refund you, no questions asked.`
  },
];

class Faq extends Component {
  renderQuestionsAndAnswers() {
    return items.map((item, index) => {
      return <Box key={index} mx="sm" mb="lg">
        <Paragraph weight="bold">{item.question}</Paragraph>
        <Paragraph lineHeight="md" pt="none" className={styles.answer}>{item.answer}</Paragraph>
      </Box>
    });
  }

  render() {
    return <Box className={styles.faq}>
      <Box className={styles.container}>
        <Heading size="2xl" color="yellowPink" pb="lg" className={styles.title}>Frequently Asked Questions</Heading>
        <Box className={styles.grid}>
          {this.renderQuestionsAndAnswers()}
        </Box>
      </Box>
    </Box>
  }
}

export default Faq;