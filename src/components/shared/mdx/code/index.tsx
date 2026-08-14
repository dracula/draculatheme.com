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

const hexColorTokenPattern =
  /class="sh__token--string"([^>]*>)(#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8}))(?=<)/g;

const markHexColorTokens = (highlightedCode: string) =>
  highlightedCode.replace(
    hexColorTokenPattern,
    'class="sh__token--string sh__token--color"$1$2'
  );

export const Code = ({ children, className }: CodeProps) => {
  const language = className?.replace("language-", "") || "";

  if (language) {
    const resolvedLanguage = canonicalLanguage(language);

    const rawHighlightedCode = highlight(children, {
      lang: resolvedLanguage
    });

    const highlightedCode =
      resolvedLanguage === "css"
        ? markHexColorTokens(rawHighlightedCode)
        : rawHighlightedCode;

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
