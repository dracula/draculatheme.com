import Disclosure from "./disclosure";

const defaultFAQs = [
  {
    question: `Do you ship worldwide?`,
    answer: `Yes, we ship internationally.`
  },
  {
    question: `Why there are only black t-shirts?`,
    answer: `Because vampires can't stand the light.`
  },
  {
    question: `When will I get my order?`,
    answer: `Your order will ship within 2-7 business days. You'll get an e-mail with the tracking info to follow it along the way. Shipping timelines will vary based on location.`
  },
  {
    question: `Do you offer PPP or any discounts?`,
    answer: `Purchasing Parity Power (PPP) is only available to digital products like Dracula PRO and Dracula UI. Unfortunately, I can't offer discounts for physical products since they have fixed production costs and extremely low margins.`
  },
  {
    question: `Can I edit or cancel my order?`,
    answer: `You cannot edit your order once placed, but if you would like to cancel your order before it has been fulfilled and shipped, please send me an email: support@draculatheme.com.`
  },
  {
    question: `What about customs fees?`,
    answer: `Our shipping cost does not include import or customs taxes. This is a common thing for international orders, and unfortunately, we have no control over them.`
  },
  {
    question: `What is your return policy?`,
    answer: `We currently do not accept returns. If you get the wrong item or defective product, please email me: support@draculatheme.com.`
  },
  {
    question: `How do I contact support?`,
    answer: `You can contact me by e-mailing support@draculatheme.com.`
  }
];

const FAQ = () => {
  return (
    <div className="faq">
      <h3>Frequently Asked Questions:</h3>
      <div className="grid">
        {defaultFAQs.map((faq, index) => (
          <Disclosure key={index} title={faq.question} body={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
