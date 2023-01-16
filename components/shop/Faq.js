import { Component } from 'react'
import { countries } from 'countries-list'
import styles from './Faq.module.css'

class Faq extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [
        {
          question: `Do you ship worldwide?`,
          answer: `Yes, we ship internationally.`,
          visible: false,
        },
        {
          question: `Why there are only black t-shirts?`,
          answer: `Because vampires can't stand the light.`,
          visible: false,
        },
        {
          question: `When will I get my order?`,
          answer: `Your order will ship within 2-7 business days. You'll get an e-mail with the tracking info to follow it along the way. Shipping timelines will vary based on location.`,
          visible: false,
        },
        {
          question: `Do you offer PPP or any discounts?`,
          answer: `Purchasing Parity Power (PPP) is only available to digital products like Dracula PRO and Dracula UI. Unfortunately, I can't offer discounts for physical products since they have fixed production costs and extremely low margins.`,
          visible: false,
        },
        {
          question: `Can I edit or cancel my order?`,
          answer: `You cannot edit your order once placed, but if you would like to cancel your order before it has been fulfilled and shipped, please send me an email: support@draculatheme.com.`,
          visible: false,
        },
        {
          question: `What about customs fees?`,
          answer: `Our shipping cost does not include import or customs taxes. This is a common thing for international orders, and unfortunately, we have no control over them.`,
          visible: false,
        },
        {
          question: `What is your return policy?`,
          answer: `We currently do not accept returns. If you get the wrong item or defective product, please email me: support@draculatheme.com.`,
          visible: false,
        },
        {
          question: `How do I contact support?`,
          answer: `You can contact me by e-mailing support@draculatheme.com.`,
          visible: false,
        },
      ],
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.ppp !== prevProps.ppp) {
      let items = this.state.items
      items[0].question = `Do you ship ${
        this.props.ppp.country
          ? `to ${countries[this.props.ppp.country].name}`
          : 'worldwide'
      }?`
      this.setState({ items })
    }
  }

  toggleVisibility(index, e) {
    e.preventDefault()

    let items = this.state.items
    items[index].visible = !items[index].visible
    this.setState(items)
  }

  renderQuestionsAndAnswers() {
    return this.state.items.map((item, index) => {
      return (
        <a
          className={styles.item}
          key={index}
          onClick={this.toggleVisibility.bind(this, index)}
        >
          <p className={styles.question}>{item.question}</p>
          <p
            style={
              this.state.items[index].visible
                ? { display: 'block' }
                : { display: 'none' }
            }
            className={styles.answer}
          >
            {item.answer}
          </p>
          <span className={styles.itemIcon}>
            {this.state.items[index].visible ? '-' : '+'}
          </span>
        </a>
      )
    })
  }

  render() {
    return (
      <div className={styles.container}>{this.renderQuestionsAndAnswers()}</div>
    )
  }
}

export default Faq
