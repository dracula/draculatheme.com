import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";
import CodeSnippet from "../components/CodeSnippet";

export function convertMarkdownToReact(markdown) {
  const content = unified()
    .use(parse)
    .use(remark2react, {
      remarkReactComponents: {
        pre: CodeSnippet,
      },
    })
    .processSync(markdown).result;

  return content;
}
