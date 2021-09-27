import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import queryString from 'query-string';
import Blogpost from '../layouts/Blogpost';
import CodeEditor from '../components/CodeEditor';
import styles from './playground.module.css';
import snippets from '../lib/snippets/all';

const SelectInput = dynamic(() => import('react-select'), { ssr: false });

export async function getStaticProps() {
  const query = { title: 'Playground', color: 'purple', icon: 'pack-1/045-dracula.svg', };
  return { props: { query, post: { color: 'purple' } } };
}

class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: 'javascript'
    };
  }

  componentDidMount() {
    const queryParams = queryString.parse(location.search);

    if (queryParams && queryParams.lang) {
      this.setState({ language: queryParams.lang });
    }
  }

  changeLanguage(e) {
    Router.push(`?lang=${e.value}`);
    this.setState({ language: e.value });
  }

  render() {
    const title = 'Playground — The online theme preview for Dracula';
    const description = 'An online playground for Dracula that lets you see the theme directly in the browser.';

    const languages = Object.keys(snippets).map(snippet => {
      return { value: snippet, label: snippets[snippet].name }
    })

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

        <div className={styles.main}>
          <div className={styles.wrapper}>
            <CodeEditor language={this.state.language} />
            <div className={styles.sidebar}>
              <h1 className={styles.title}>Playground</h1>
              <span className={styles.label}>Languages</span>
              <SelectInput id="languages" defaultValue={{value: this.state.language, label: snippets[this.state.language].name}} options={languages} onChange={this.changeLanguage.bind(this)} isSearchable={true}
                styles={{
                  option: (styles, state) => ({
                    ...styles,
                    cursor: 'pointer',
                  }),
                  control: (styles) => ({
                    ...styles,
                    cursor: 'pointer',
                  })
                }}
                theme={theme => ({
                  ...theme,
                  borderRadius: 0,
                  cursor: 'pointer',
                  colors: {
                    ...theme.colors,
                    primary:   '#bd93f9', // Opened - Border
                    primary25: '#2a2c37', // Opened - Active
                    primary50: '#2a2c37', // Opened - Focus
                    neutral0:  '#1d1e26', // Closed - Background
                    neutral10: '#bd93f9', // Closed - Arrow
                    neutral20: '#bd93f9', // Closed - Border
                    neutral30: '#bd93f9', // Closed - Border Hover
                    neutral40: '#bd93f9', // Closed - Arrow Hover
                    neutral60: '#bd93f9', // Opened - Arrow
                    neutral80: '#bd93f9', // Closed - Text
                  },
                })}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Playground.Layout = Blogpost;

export default Playground;
