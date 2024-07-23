import "./index.scss";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronRightIcon } from "lucide-react";
import { forwardRef } from "react";

interface AccordionTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <Accordion.Header className="header">
      <Accordion.Trigger className="trigger" {...props} ref={forwardedRef}>
        <ChevronRightIcon size={14} className="chevron" aria-hidden />
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, ...props }, forwardedRef) => (
    <Accordion.Content className="content" {...props} ref={forwardedRef}>
      <div className="text">{children}</div>
    </Accordion.Content>
  )
);

AccordionContent.displayName = "AccordionContent";

const faqs = [
  {
    q: "Do you offer discounts for students or other groups?",
    a: (
      <AccordionContent>
        <p>
          We currently do not offer specific discounts for students or other
          groups. 😔
        </p>
        <p>
          However, we offer Purchase Parity Power on our website, providing
          exclusive discounts for over 160 countries based on currency value and
          social climate. 🌱
        </p>
      </AccordionContent>
    )
  },
  {
    q: "How do I download the package again if I lost the email link?",
    a: (
      <AccordionContent>
        <p>
          You can always{" "}
          <a
            href="https://app.gumroad.com/library"
            target="_blank"
            className="inline"
          >
            download the latest version from the Gumroad platform.
          </a>
        </p>
        <p>
          ✅ Simply log in with the account you used to purchase Dracula PRO,
          browse your library, and download the latest version.
        </p>
      </AccordionContent>
    )
  },
  {
    q: "How do licenses work?",
    a: (
      <AccordionContent>
        <p>
          Your license allows you to install Dracula PRO themes on multiple
          computers and activate them on up to three devices. 💡
        </p>
        <p>
          For a team license to activate the theme on more devices, please get
          in{" "}
          <a
            href="mailto:support@draculatheme.com?subject=Team License&body=I need a team license! 🚀"
            target="_blank"
            className="inline"
          >
            touch with us.
          </a>
        </p>
      </AccordionContent>
    )
  },
  {
    q: "Can I use Dracula PRO in my company?",
    a: (
      <AccordionContent>
        <p>
          ✅ Yes, you can use Dracula PRO in your company. To activate the theme
          on multiple devices, you may purchase a team license.
        </p>
      </AccordionContent>
    )
  },
  {
    q: "Do I need to renew or buy again after a big update?",
    a: (
      <AccordionContent>
        <p>
          No, you do not need to repurchase it. You can download the latest
          version from the Gumroad platform.
        </p>
      </AccordionContent>
    )
  },
  {
    q: "How can I get support if I find a bug or have a suggestion?",
    a: (
      <AccordionContent>
        <p>
          You can contact us at{" "}
          <a
            href="mailto:support@draculatheme.com?subject=Support Request&body=I found a bug! 🐝"
            target="_blank"
            className="inline"
          >
            support@draculatheme.com
          </a>
        </p>
      </AccordionContent>
    )
  },
  {
    q: "I have more questions.",
    a: (
      <AccordionContent>
        <p>
          If you have more questions, you can contact us at{" "}
          <a
            href="mailto:support@draculatheme.com?subject=Support Request&body=Schrodinger, is the cat dead or alive? 🤔"
            target="_blank"
            className="inline"
          >
            support@draculatheme.com
          </a>
        </p>
      </AccordionContent>
    )
  }
];

const FAQS = () => (
  <article id="faqs">
    <div className="title-wrapper">
      <span className="title p">
        Questions <br />
        and answers
      </span>
    </div>
    <Accordion.Root
      className="accordion-root"
      type="single"
      defaultValue="item-1"
      collapsible
    >
      {faqs.map((faq, index) => (
        <Accordion.Item
          className="accordion"
          value={`item-${index + 1}`}
          key={index}
        >
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          {faq.a}
        </Accordion.Item>
      ))}
    </Accordion.Root>
  </article>
);

export default FAQS;
