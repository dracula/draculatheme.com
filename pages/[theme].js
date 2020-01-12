import React from 'react';
import Head from 'next/head';
import marked from 'marked';
import fetch from 'isomorphic-unfetch';
import ThemeLayout from '../layouts/Theme';
import Contributors from '../components/Contributors';
import Updates from '../components/Updates';

class Theme extends React.Component {
  static async getInitialProps({ query }) {
    const header = {
      headers: {
        'Authorization': `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
      }
    };

    const renderer = new marked.Renderer();
    renderer.code = (code, infostring) => {
      const lang = (infostring || '').match(/\S*/)[0];
      const prefixed = code.includes('$ ');

      let codeblock = '<pre>';
      if (lang) {
        codeblock += '<code class="'
          + renderer.options.langPrefix
          + escape(lang, true)
          + '">';
      } else {
        codeblock += '<code>';
      }

      if (prefixed) {
        codeblock += '<ul class="prefixed">';

        const multiline = code.split('\n');
        multiline.forEach(function(line) {
          if (line.startsWith('$ ')) {
          line = line.substr(2);
          codeblock += '<li class="line" prefix="$">' + line + '</li>'
          } else {
            codeblock += '<li class="line">' + line + '</li>'
          }
        });

        codeblock += '</ul></code>';
      } else {
        codeblock += code + '</code>';
      }

      codeblock +='</pre>';
      return codeblock;
    };

    const installReq = await fetch(`https://api.github.com/repos/dracula/${query.repo}/contents/INSTALL.md`, header);
    const installRes = await installReq.json();
    const installBuffer = Buffer.from(installRes.content, 'base64');
    query.install = marked(installBuffer.toString('ascii'), { renderer });

    const contributorsReq = await fetch(`https://api.github.com/repos/dracula/${query.repo}/contributors`, header);
    const contributors = await contributorsReq.json();
    query.contributors = contributors;

    return { query };
  }

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

      <main className="theme">
        <img className="preview" src={`https://raw.githubusercontent.com/dracula/${this.props.query.repo}/master/screenshot.png`} alt="Theme Preview" />
        <div className="instructions" dangerouslySetInnerHTML={{ __html: this.props.query.install }} />
        <Updates />
        <Contributors repo={this.props.query.repo} data={this.props.query.contributors} />
      </main>
    </div>
  }
}

Theme.Layout = ThemeLayout;

export default Theme;
