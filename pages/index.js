import React from 'react';
import Head from 'next/head';
import Shuffle from 'shufflejs';
import Theme from '../layouts/Theme';
import ComingSoon from '../components/ComingSoon';
import styles from './index.module.css';

class Index extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);

    const paths = JSON.parse(props.query.paths);

    delete paths['/'];
    delete paths['/about'];
    delete paths['/pro'];

    this.state = {
      search: '',
      filter: 'all',
      paths: paths,
      total: Object.keys(paths).length
    };

    this.element = React.createRef();
  }

  componentDidMount() {
    this.shuffle = new Shuffle(this.element.current, {
      itemSelector: '.app'
    });
  }

  componentWillUnmount() {
    this.shuffle.destroy();
  }


  renderItems() {
    const { paths } = this.state;

    return Object.keys(paths).map(path => {
      return <a key={path} href={path} data-title={paths[path].query.title} data-groups={JSON.stringify(paths[path].query.platform)} data-synonyms={paths[path].query.synonyms ? JSON.stringify(paths[path].query.synonyms) : ''} className="app" style={{ display: 'block', width: 360, height: 325 }}>
        <span className="app-img">
          <img src={`/static/icons/${paths[path].query.icon}`} width={200} alt={this.props.query.title} />
        </span>
        <h3 className={`app-title ${paths[path].query.color}`}>{paths[path].query.title}</h3>
      </a>
    });
  }

  onFilter(platform) {
    this.setState({
      search: '',
      filter: platform,
    });

    if (platform === 'all') {
      platform = ['all', 'linux', 'mac', 'windows'];
    } else {
      platform = ['all'].concat([platform]);
    }

    let total = 0;

    this.shuffle.filter(element => {
      const groups = JSON.parse(element.dataset.groups);

      if (groups.some(group => platform.includes(group))) {
        total = total + 1;
        return element;
      }
    });

    this.setState({ total });
  }

  onSearch(e) {
    this.setState({
      search: e.target.value,
      filter: 'all',
    });

    const searchText = e.target.value.toLowerCase();

    let total = 0;

    this.shuffle.filter(element => {
      let dictionary = [];

      dictionary.push(element.dataset.title.toLowerCase());

      if (element.dataset.synonyms) {
        const synonyms = JSON.parse(element.dataset.synonyms);
        dictionary = dictionary.concat(synonyms);
      }

      let hasFound = false;

      dictionary.forEach(item => {
        if (item.indexOf(searchText) !== -1) {
          hasFound = true;
        }
      });

      if (hasFound) {
        total = total + 1;
        return element;
      }
    });

    this.setState({ total });
  }

  render() {
    const title = 'Dracula';
    const description = 'A dark theme for Atom, Alfred, Brackets, Emacs, iTerm, Mintty, Notepad++, Slack, Sequel Pro, Sublime Text, Telegram, Textmate, Terminal.app, Ulysses, Vim, Visual Studio Code, Wox, Xcode, and Zsh';

    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <title>{title} &mdash; {description}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta content="https://draculatheme.com" property="og:url" />
          <meta content="https://draculatheme.com/static/img/facebook.png" property="og:image" />
        </Head>

        <main className={styles.main}>
          <div className={styles.toolbar}>
            <div className={styles.group}>
              <span className={styles.label}>Showing {this.state.total} app(s)</span>
            </div>

            <div className={styles.group}>
              <input className={styles.search} value={this.state.search} placeholder={`Search...`} onChange={this.onSearch.bind(this)} type="search" />
            </div>


            <div className={styles.group}>
              <div className={styles.buttonGroup}>
                <button className={this.state.filter === 'all' ? styles.buttonSelected : styles.button} onClick={this.onFilter.bind(this, 'all')}>All</button>
                <button className={this.state.filter === 'linux' ? styles.buttonSelected : styles.button} onClick={this.onFilter.bind(this, 'linux')}>Linux</button>
                <button className={this.state.filter === 'mac' ? styles.buttonSelected : styles.button} onClick={this.onFilter.bind(this, 'mac')}>Mac</button>
                <button className={this.state.filter === 'windows' ? styles.buttonSelected : styles.button} onClick={this.onFilter.bind(this, 'windows')}>Windows</button>
              </div>
            </div>
          </div>
          <div ref={this.element} className={styles.results}>
            {this.renderItems()}
          </div>
        </main>

        <div style={{ padding: '30px 0 60px' }}>
          <ComingSoon />
        </div>
      </div>
    )
  }
}

Index.Layout = Theme;

export default Index;
