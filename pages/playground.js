import React from 'react';
import Head from 'next/head';
import Blogpost from '../layouts/Blogpost';
import CodeEditor from '../components/CodeEditor';

export async function getStaticProps() {
  const query = { title: 'Playground', color: 'purple', icon: 'pack-1/045-dracula.svg', };
  return { props: { query, post: { color: 'purple' } } };
}

class Playground extends React.Component {
  render() {
    const title = 'Playground — The online theme preview for Dracula';
    const description = 'An online playground for Dracula that lets you see the theme directly in the browser.';

    return (
      <div className="single">
        <Head>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta content="https://draculatheme.com/playground" property="og:url" />
        </Head>

        <div style={{ marginTop: 60 }}>
          <CodeEditor />
        </div>
      </div>
    )
  }
}

Playground.Layout = Blogpost;

export default Playground;
