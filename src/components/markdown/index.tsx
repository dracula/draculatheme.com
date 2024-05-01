import "./index.scss";
import rangeParser from "parse-numeric-range";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import CodeCopyBtn from "./codeCopyBtn";

const Markdown: FC<MarkdownProps> = ({ markdown }) => {
  const syntaxTheme = dracula;

  const MarkdownComponents: object = {
    pre({ children }) {
      const textToCopy = children?.props?.children || "";

      return (
        <pre>
          <CodeCopyBtn textToCopy={textToCopy} />
          {children}
        </pre>
      );
    },
    code({ node, inline, className, ...props }) {
      const hasLang = /language-(\w+)/.exec(className || "");
      const hasMeta = node?.data?.meta;

      const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta?.replace(/\s/g, "");
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)[1]
            : "0";
          const highlightLines = rangeParser(strlineNumbers);
          const highlight = highlightLines;
          const data: string = highlight.includes(applyHighlights)
            ? "highlight"
            : null;
          return { data };
        } else {
          return {};
        }
      };

      return hasLang ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={hasLang[1]}
          PreTag="div"
          className="codeblock"
          showLineNumbers={false}
          wrapLines={hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlights}
        >
          {props.children}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props} />
      );
    }
  };

  return (
    <div className="markdown">
      <ReactMarkdown components={MarkdownComponents}>{markdown}</ReactMarkdown>
    </div>
  );
};

export default Markdown;
