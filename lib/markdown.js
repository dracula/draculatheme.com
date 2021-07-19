import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';

export function convertMarkdownToReact(markdown) {
  const content = unified()
    .use(parse)
    .use(remark2react)
    .processSync(markdown).result;

  return content;
}