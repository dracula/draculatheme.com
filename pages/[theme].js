import React from 'react';
import Head from 'next/head';
import marked from 'marked';
import fetch from 'isomorphic-unfetch';
import paths from '../lib/paths';
import ThemeLayout from '../layouts/Theme';
import Contributors from '../components/Contributors';
import Updates from '../components/Updates';

export async function getStaticPaths() {
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const header = {
    headers: {
      'Authorization': `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
    }
  };

  const query = paths.find(path => path.params.theme === params.theme).params;

  const installReq = await fetch(`https://api.github.com/repos/dracula/${query.repo}/contents/INSTALL.md`, header);
  const installRes = await installReq.json();
  const installBuffer = Buffer.from(installRes.content, 'base64');
  query.install = marked(installBuffer.toString('ascii'));

  const contributorsReq = await fetch(`https://api.github.com/repos/dracula/${query.repo}/contributors`, header);
  const contributors = await contributorsReq.json();
  query.contributors = contributors;

  query.total = paths.length;

  return { props: { query } };
}

class Theme extends React.Component {
  render() {
    const description = `A dark theme for ${this.props.query.title} and ${this.props.query.total}+ apps`;

    return <div>
      <Head>
        <title>Dracula &mdash; {description}</title>
        <meta content="Dracula" property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content={`https://draculatheme.com/static/img/${this.props.query.icon}`} property="og:image" />
      </Head>

      <div className="theme">
        <img className="preview" src={`https://raw.githubusercontent.com/dracula/${this.props.query.repo}/master/screenshot.png`} alt="Theme Preview" />
        <div className="instructions" dangerouslySetInnerHTML={{ __html: this.props.query.install }} />
        <Updates />
        <Contributors repo={this.props.query.repo} data={this.props.query.contributors} />
      </div>
    </div>
  }
}

Theme.Layout = ThemeLayout;

export default Theme;
