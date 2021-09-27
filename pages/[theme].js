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

    const api = 'https://i.microlink.io/';
    const cardUrl = `https://cards.microlink.io/?endpoint=microlink.vercel.app&preset=tinybird&color=%23${getColorFromName(this.props.query.color)}&contributors=${this.props.query.contributors.length}&p=2g9YPD4KICA8TGluawogICAgaHJlZj0naHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1GaXJhK0NvZGU6d2dodEAzMDA7NDAwOzcwMCcKICAgIHJlbD0nc3R5bGVzaGVldCcKICAvPgogIDxGbGV4CiAgICBzeD17ewogICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywKICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLAogICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJywKICAgICAgYmc6ICcjMjgyQTM2JywKICAgICAgcGw6IDUsCiAgICAgIHByOiA1LAogICAgICBib3JkZXI6IGAxMHB4IHNvbGlkICR7cXVlcnkuY29sb3J9YCwKICAgICAgYm9yZGVyUmFkaXVzOiA0LAogICAgfX0KICA-CiAgICA8RmxleAogICAgICBhcz0naGVhZGVyJwogICAgICBzeD17ewogICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLAogICAgICAgIHRvcDogNjAsCiAgICAgICAgbGVmdDogNSwKICAgICAgICBkaXNwbGF5OiAnZmxleCcsCiAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsCiAgICAgICAgd2lkdGg6ICcxMDAlJywKICAgICAgfX0KICAgID4KICAgICAgPEZsZXg-CiAgICAgICAgPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2RDcyOTAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWdpdGh1YiI-PHBhdGggZD0iTTkgMTljLTUgMS41LTUtMi41LTctM20xNCA2di0zLjg3YTMuMzcgMy4zNyAwIDAgMC0uOTQtMi42MWMzLjE0LS4zNSA2LjQ0LTEuNTQgNi40NC03QTUuNDQgNS40NCAwIDAgMCAyMCA0Ljc3IDUuMDcgNS4wNyAwIDAgMCAxOS45MSAxUzE4LjczLjY1IDE2IDIuNDhhMTMuMzggMTMuMzggMCAwIDAtNyAwQzYuMjcuNjUgNS4wOSAxIDUuMDkgMUE1LjA3IDUuMDcgMCAwIDAgNSA0Ljc3YTUuNDQgNS40NCAwIDAgMC0xLjUgMy43OGMwIDUuNDIgMy4zIDYuNjEgNi40NCA3QTMuMzcgMy4zNyAwIDAgMCA5IDE4LjEzVjIyIj48L3BhdGg-PC9zdmc-CiAgICAgICAgPFRleHQKICAgICAgICAgIHN4PXt7CiAgICAgICAgICAgIHBsOiAyLAogICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywKICAgICAgICAgICAgZm9udFNpemU6IDIwLAogICAgICAgICAgICBmb250RmFtaWx5OiAnRmlyYSBDb2RlJywKICAgICAgICAgICAgY29sb3I6IHF1ZXJ5LmNvbG9yLAogICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTQwJScsCiAgICAgICAgICB9fQogICAgICAgID4KICAgICAgICAgIGRyYWN1bGEKICAgICAgICA8L1RleHQ-CiAgICAgICAgPFRleHQKICAgICAgICAgIHN0eWxlPXt7CiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLAogICAgICAgICAgICBmb250U2l6ZTogMjAsCiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdGaXJhIENvZGUnLAogICAgICAgICAgICBjb2xvcjogJyNmMmYyZjInLAogICAgICAgICAgfX0KICAgICAgICA-CiAgICAgICAgICAve3F1ZXJ5LnJlcG99CiAgICAgICAgPC9UZXh0PgogICAgICA8L0ZsZXg-CiAgICA8L0ZsZXg-CgogICAgPEZsZXggYXM9J2NvbnRlbnQnPgogICAgICA8SW1hZ2UKICAgICAgICBzeD17ewogICAgICAgICAgd2lkdGg6IDMwMCwKICAgICAgICAgIG1hcmdpblJpZ2h0OiA1MCwKICAgICAgICB9fQogICAgICAgIHNyYz17YGh0dHBzOi8vZHJhY3VsYXRoZW1lLmNvbS9zdGF0aWMvaWNvbnMvJHtxdWVyeS5pY29ufWB9CiAgICAgIC8-CiAgICAgIDxQYXJhZ3JhcGgKICAgICAgICBzeD17ewogICAgICAgICAgd2lkdGg6ICcxMDAlJywKICAgICAgICAgIGZvbnRTaXplOiAiNDBweCIsCiAgICAgICAgICBmb250V2VpZ2h0OiAzMDAsCiAgICAgICAgICBmb250RmFtaWx5OiAnRmlyYSBDb2RlJywKICAgICAgICAgIGNvbG9yOiAnI2YyZjJmMicsCiAgICAgICAgfX0KICAgICAgPgogICAgICAgIERhcmsgVGhlbWUgZm9yPGJyIC8-CiAgICAgICAgPFRleHQgc3g9e3sgZm9udFdlaWdodDogNzAwIH19ID57cXVlcnkudGl0bGV9PC9UZXh0PgogICAgICA8L1BhcmFncmFwaD4KICAgIDwvRmxleD4KCiAgICA8RmxleAogICAgICBhcz0nZm9vdGVyJwogICAgICBzeD17ewogICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLAogICAgICAgIGJvdHRvbTogNDAsCiAgICAgICAgbGVmdDogNSwKICAgICAgICBkaXNwbGF5OiAnZmxleCcsCiAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsCiAgICAgICAgd2lkdGg6ICcxMDAlJywKICAgICAgfX0KICAgID4KICAgICAgPEZsZXg-CiAgICAgICAgPFBhcmFncmFwaAogICAgICAgICAgc3g9e3sKICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsCiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCwKICAgICAgICAgICAgZm9udFNpemU6IDIwLAogICAgICAgICAgICBmb250RmFtaWx5OiAnRmlyYSBDb2RlJywKICAgICAgICAgICAgY29sb3I6ICcjZjJmMmYyJywKICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLAogICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJywKICAgICAgICAgIH19CiAgICAgICAgPgogICAgICAgICAgPEZsZXg-CiAgICAgICAgICAgIDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNkQ3MjkwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9ImZlYXRoZXIgZmVhdGhlci1leWUiPjxwYXRoIGQ9Ik0xIDEyczQtOCAxMS04IDExIDggMTEgOC00IDgtMTEgOC0xMS04LTExLTh6Ij48L3BhdGg-PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyI-PC9jaXJjbGU-PC9zdmc-CiAgICAgICAgICAgIDxUZXh0CiAgICAgICAgICAgICAgc3g9e3sKICAgICAgICAgICAgICAgIHBsOiAyLAogICAgICAgICAgICAgICAgcHI6IDEsCiAgICAgICAgICAgICAgICBjb2xvcjogcXVlcnkuY29sb3IKICAgICAgICAgICAgICB9fQogICAgICAgICAgICA-CiAgICAgICAgICAgICAge3F1ZXJ5LnZpZXdzfQogICAgICAgICAgICA8L1RleHQ-IHZpZXdzCiAgICAgICAgICA8L0ZsZXg-CiAgICAgICAgICAKICAgICAgICAgIDxGbGV4IHN4PXt7IG1hcmdpbkxlZnQ6IDUwIH19PgogICAgICAgICAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZENzI5MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItdXNlcnMiPjxwYXRoIGQ9Ik0xNyAyMXYtMmE0IDQgMCAwIDAtNC00SDVhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg-PGNpcmNsZSBjeD0iOSIgY3k9IjciIHI9IjQiPjwvY2lyY2xlPjxwYXRoIGQ9Ik0yMyAyMXYtMmE0IDQgMCAwIDAtMy0zLjg3Ij48L3BhdGg-PHBhdGggZD0iTTE2IDMuMTNhNCA0IDAgMCAxIDAgNy43NSI-PC9wYXRoPjwvc3ZnPgogICAgICAgICAgICA8VGV4dAogICAgICAgICAgICAgIHN4PXt7CiAgICAgICAgICAgICAgICBwbDogMiwKICAgICAgICAgICAgICAgIHByOiAxLAogICAgICAgICAgICAgICAgY29sb3I6IHF1ZXJ5LmNvbG9yCiAgICAgICAgICAgICAgfX0KICAgICAgICAgICAgPgogICAgICAgICAgICAgIHtxdWVyeS5jb250cmlidXRvcnN9CiAgICAgICAgICAgIDwvVGV4dD4gY29udHJpYnV0b3JzCiAgICAgICAgICA8L0ZsZXg-CiAgICAgICAgPC9QYXJhZ3JhcGg-CiAgICAgIDwvRmxleD4KICAgIDwvRmxleD4KICA8L0ZsZXg-CjwvPg&icon=${this.props.query.icon}&views=${this.state.views}&repo=${this.props.query.repo}&title=${this.props.query.title}`;
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
