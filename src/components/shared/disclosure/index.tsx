import "./index.css";

import type { ReactNode } from "react";

type DisclosureProps = {
  question: string;
  answer: ReactNode;
};

export const Disclosure = ({ question, answer }: DisclosureProps) => (
  <details>
    <summary className="action summary">
      <span>{question}</span>
      <svg
        className="icon"
        width={12}
        height={12}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path className="vertical-line" d="M12 5v14" />
      </svg>
    </summary>
    <div className="answer">
      {typeof answer === "string" ? <p>{answer}</p> : answer}
    </div>
  </details>
);
