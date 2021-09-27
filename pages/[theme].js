import React from 'react';
import Head from 'next/head';
import paths from '../lib/paths';
import ThemeLayout from '../layouts/Theme';
import Contributors from '../components/Contributors';
import Updates from '../components/Updates';
import download from 'download';
import probe from 'probe-image-size';
import { convertMarkdownToReact } from '../lib/markdown';
import { getColorFromName } from '../lib/color';

export async function getStaticPaths() {
  return { paths, fallback: 'blocking' };
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
  query.install = installBuffer.toString('utf8');

  const contributorsReq = await fetch(`https://api.github.com/repos/dracula/${query.repo}/contributors`, header);
  const contributors = await contributorsReq.json();
  query.contributors = contributors.filter(contributor => {
    if (contributor.login === 'ImgBotApp') return;
    return contributor;
  });

  const image = `https://raw.githubusercontent.com/dracula/${query.repo}/master/screenshot.png`;
  await download(image, 'public/static/img/screenshots', { filename: `${query.theme}.png` });

  const metadata = await probe(image);
  query.imageWidth = metadata.width;
  query.imageHeight = metadata.height;

  return { props: { query }, revalidate: 7200 };
}

class Theme extends React.Component {
  state = {
    views: ''
  };

  componentDidMount() {
    this.getViews();
  }

  async getViews() {
    const viewsReq = await fetch(`/api/views/${this.props.query.theme}`);
    const viewsRes = await viewsReq.json();
    const views = new Intl.NumberFormat().format(viewsRes.views || 0);

    this.setState({ views });
  }

  renderViews() {
    if (this.state.views) {
      return <p className="views">{this.state.views} views</p>
    }

    return <p className="views loading" />
  }

  render() {
    let title = `Dark theme for ${this.props.query.title} and ${paths.length}+ apps — Dracula`;

    if (this.props.query.title === 'Wallpaper') {
      title = `Dark wallpaper collection — Dracula`;
    }

    const description = `Dracula is a color scheme for code editors and terminal emulators, including ${this.props.query.title} and ${paths.length}+ other apps. Check the instructions to learn how to install it.`;
    const content = convertMarkdownToReact(this.props.query.install);

    const api = 'https://microlink.vercel.app/?adblock=false&waitForTimeout=1500&meta=false&screenshot&element=%23screenshot&embed=screenshot.url&url=';
    const cardUrl = `https://cards.microlink.io/?preset=dracula&color=%23${getColorFromName(this.props.query.color)}&contributors=${this.props.query.contributors.length}&icon=${this.props.query.icon}&views=${this.state.views}&repo=${this.props.query.repo}&title=${this.props.query.title}`;
    const image = `${api}${encodeURIComponent(cardUrl)}`;

    return <div>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content={`https://draculatheme.com/${this.props.query.theme}`} property="og:url" />
        <meta name="image" content={image} />
        <meta itemprop="image" content={image} />
        <meta name="twitter:image" content={image} />
        <meta property="og:image" content={image} />
      </Head>

      <div className="theme">
        <img className="preview" src={`/static/img/screenshots/${this.props.query.theme}.png`} alt={`${this.props.query.title} Theme Preview`} width={this.props.query.imageWidth} height={this.props.query.imageHeight} />
        {this.renderViews()}
        <div className="instructions">
          {content}
        </div>
        <Updates type="theme" />
        <Contributors repo={this.props.query.repo} data={this.props.query.contributors} />
      </div>
    </div>
  }
}

Theme.Layout = ThemeLayout;

export default Theme;
