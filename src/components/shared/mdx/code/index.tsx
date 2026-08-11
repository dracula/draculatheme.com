import "./index.css";

import { highlight } from "sugar-high";
import { lang } from "sugar-high/lang";

import { CopyButton } from "../../copy-button";

interface CodeProps {
  children: string;
  className?: string;
}

const canonicalLanguage = (fenceLanguage: string) => {
  const normalizedLanguage = fenceLanguage.toLowerCase();

  if (normalizedLanguage === "sass" || normalizedLanguage === "less") {
    return lang("css");
  }

  return lang(normalizedLanguage);
};

export const Code = ({ children, className }: CodeProps) => {
  const language = className?.replace("language-", "") || "";

  if (language) {
    const highlightedCode = highlight(children, {
      lang: canonicalLanguage(language)
    });

    return (
      <div className="sh-block">
        <pre>
          <code
            className={className}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
        <CopyButton text={children} />
      </div>
    );
  }

  return <code className={className}>{children}</code>;
};
