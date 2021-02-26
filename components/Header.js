import { Component } from 'react';
import Link from 'next/link';
import malarkey from 'malarkey';
import Topbar from './Topbar';
import paths from '../lib/paths';
import GitHubButton from 'react-github-btn';

class Header extends Component {
  constructor(props) {
    super(props);

    this.malarkey = React.createRef();
  }

  componentDidMount() {
    this.startTypewriter();
  }

  componentDidUpdate() {
    this.startTypewriter();
  }

  startTypewriter() {
    if (!this.malarkey.current) return;

    malarkey(this.malarkey.current, {
      typeSpeed: 50,
      deleteSpeed: 50,
      pauseDelay: 2000,
      loop: true,
      postfix: ''
    })
      .type('Vim').pause().delete()
      .type('Notepad++').pause().delete()
      .type('iTerm').pause().delete()
      .type('Visual Studio Code').pause().delete()
      .type('Terminal.app').pause().delete()
      .type('JetBrains').pause().delete()
      .type('Zsh').pause().delete()
      .type('Sublime').pause().delete()
      .type('Xcode').pause().delete()
      .type('Slack').pause().delete()
      .type('Telegram').pause().delete()
      .type('Emacs').pause().delete()
      .type('Windows Terminal').pause().delete()
  }

  renderDescription() {
    if (this.props.query.title === 'Wallpaper') {
      return <h2 className="subtitle">Dark wallpaper collection</h2>
    }

    if (this.props.query.repo) {
      return <h2 className="subtitle">Dark theme for {this.props.query.title} <Link href="/"><a>and {paths.length}+ apps</a></Link></h2>
    }

    if (this.props.query.title === 'About' || this.props.query.title === 'Contribute') {
      return <h2 className="subtitle">Dark theme for {paths.length}+ apps</h2>
    }

    return <h2 className="subtitle">Dark theme for <span ref={this.malarkey} className="rotating"></span></h2>
  }

  renderGithubButtons() {
    if (this.props.query.title !== 'About Dracula') {
      return <p className="gh-buttons">
        <GitHubButton href="https://github.com/dracula/dracula-theme" data-size="large" data-show-count="true" aria-label="Star dracula/dracula-theme on GitHub">Star</GitHubButton>
        <GitHubButton href="https://github.com/dracula/dracula-theme/fork" data-size="large" data-show-count="true" aria-label="Fork dracula/dracula-theme on GitHub">Fork</GitHubButton>
      </p>
    }
  }

  render() {
    return <div>
      <Topbar />
      <header className="header">
        <img className="icon" src={`/static/icons/${this.props.query.icon}`} width={220} height={220} alt={this.props.query.title} />
        <h1 className="title">Dracula</h1>
        {this.renderDescription()}
        {this.renderGithubButtons()}
      </header>
    </div>
  }
}

export default Header;