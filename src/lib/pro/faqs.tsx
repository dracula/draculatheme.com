import Link from "next/link";

import type { FrequentlyAskedQuestion } from "@/lib/types";

export const frequentlyAskedQuestions: FrequentlyAskedQuestion[] = [
  {
    question: "Do you offer student discounts?",
    answer: (
      <p>
        We don&apos;t offer specific group discounts, but we provide Purchase
        Parity Power for 160+ countries with exclusive pricing based on local
        currency and economic conditions.
      </p>
    )
  },
  {
    question: "How do I get access to the private GitHub organization?",
    answer: (
      <p>
        Use the <Link href="/pro/request-access">Request Access form</Link> with
        the same email used for your purchase. If you still get an error, email{" "}
        <a href="mailto:support@draculatheme.com">support@draculatheme.com</a>{" "}
        and we&apos;ll send the invite manually.
      </p>
    )
  },
  {
    question: "How do I re-download if I lost my email?",
    answer: (
      <p>
        Visit{" "}
        <a
          href="https://app.gumroad.com/library"
          target="_blank"
          rel="noopener noreferrer"
        >
          your Gumroad library
        </a>{" "}
        and log in with your purchase account. Your Dracula Pro will be in your
        library for download.
      </p>
    )
  },
  {
    question: "How do licenses work?",
    answer: (
      <p>
        Your license covers multiple computers, with up to 3 devices active at
        the same time. You can deactivate a device and reactivate on a new one
        whenever you need — including after reinstalling your OS. Need more than
        3 active devices at once? Contact{" "}
        <a href="mailto:support@draculatheme.com">support@draculatheme.com</a>{" "}
        for team licensing.
      </p>
    )
  },
  {
    question: "Can I use Dracula Pro commercially?",
    answer: (
      <p>
        Yes, Dracula Pro works for company use. For multiple team devices,
        consider our <Link href="/pro#pricing">team license options</Link>.
      </p>
    )
  },
  {
    question: "Do I need to repurchase for updates?",
    answer: (
      <p>
        Never. All updates are free forever. Just download the latest version
        from your{" "}
        <a
          href="https://app.gumroad.com/library"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gumroad library
        </a>
        .
      </p>
    )
  },
  {
    question: "How do I report bugs or suggest features?",
    answer: (
      <p>
        Email us at{" "}
        <a href="mailto:support@draculatheme.com">support@draculatheme.com</a>{" "}
        for bug reports, feature requests, or technical assistance.
      </p>
    )
  },
  {
    question: "Need more help?",
    answer: (
      <p>
        You can reach our customer support team by emailing{" "}
        <a href="mailto:support@draculatheme.com">support@draculatheme.com</a>.
        We aim to respond to all inquiries promptly.
      </p>
    )
  }
];
