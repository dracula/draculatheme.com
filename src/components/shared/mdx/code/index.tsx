import "./index.css";

import { highlight } from "sugar-high";
import * as presets from "sugar-high/presets";

import { CopyButton } from "../../copy-button";

interface CodeProps {
  children: string;
  className?: string;
}

const presetForLanguage = (language: string) => {
  const normalisedLanguage = language.toLowerCase();

  if (
    normalisedLanguage === "css" ||
    normalisedLanguage === "scss" ||
    normalisedLanguage === "sass" ||
    normalisedLanguage === "less"
  ) {
    return presets.css;
  }

  if (normalisedLanguage === "py" || normalisedLanguage === "python") {
    return presets.python;
  }

  if (normalisedLanguage === "rs" || normalisedLanguage === "rust") {
    return presets.rust;
  }

  return undefined;
};

export const Code = ({ children, className }: CodeProps) => {
  const language = className?.replace("language-", "") || "";

  if (language) {
    const preset = presetForLanguage(language);
    const highlightedCode = preset
      ? highlight(children, preset)
      : highlight(children);

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
