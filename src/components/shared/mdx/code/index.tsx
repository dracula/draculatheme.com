import "./index.css";

import { highlight } from "sugar-high";

import { CopyButton } from "../../copy-button";

interface CodeProps {
  children: string;
  className?: string;
}

export const Code = ({ children, className }: CodeProps) => {
  const language = className?.replace("language-", "") || "";

  if (language) {
    const highlightedCode = highlight(children).replace(/<[^>]*>/g, "");

    return (
      <div className="sh-block">
        <pre>
          <code className={className}>{highlightedCode}</code>
        </pre>
        <CopyButton text={children} />
      </div>
    );
  }

  return <code className={className}>{children}</code>;
};
