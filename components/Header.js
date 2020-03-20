import { Component } from 'react';
import Link from 'next/link';
import malarkey from 'malarkey';
import styles from './Header.module.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.malarkey = React.createRef();
  }

  componentDidMount() {
    if (!this.malarkey.current) return;

    malarkey(this.malarkey.current, {
      typeSpeed: 50,
      deleteSpeed: 50,
      pauseDelay: 2000,
      loop: true,
      postfix: ''
    })
    .type('Sublime').pause().delete()
    .type('Atom').pause().delete()
    .type('Vim').pause().delete()
    .type('iTerm').pause().delete()
    .type('Terminal.app').pause().delete()
    .type('Zsh').pause().delete()
    .type('Alfred').pause().delete()
    .type('Slack').pause().delete()
    .type('CodeMirror').pause().delete()
    .type('Xcode').pause().delete()
    .type('Coda').pause().delete()
    .type('TextMate').pause().delete()
    .type('Emacs').pause().delete()
    .type('Sequel Pro').pause().delete()
    .type('Visual Studio Code').pause().delete()
    .type('JetBrains').pause().delete()
    .type('Visual Studio').pause().delete()
    .type('Mintty').pause().delete()
    .type('Brackets').pause().delete()
    .type('Wox').pause().delete()
    .type('Hyper').pause().delete()
    .type('Konsole').pause().delete()
  }

  renderDescription() {
    if (this.props.query.repo) {
      return <h2 className="subtitle">A dark theme for {this.props.query.title} <a href="/">and {this.props.query.total}+ apps</a></h2>
    }

    if (this.props.query.title === 'About Dracula') {
      return <h2 className="subtitle">A dark theme for {this.props.query.total}+ apps</h2>
    }

    return <h2 className="subtitle">A dark theme for <span className="rotating"></span></h2>
  }

  renderGithubButtons() {
    if (this.props.query.title !== 'About Dracula') {
      return <p className="gh-btns">
        <iframe src="https://ghbtns.com/github-btn.html?user=dracula&amp;repo=dracula-theme&amp;type=watch&amp;count=true&amp;size=large" title="GitHub Stars" allowtransparency="true" frameBorder="0" scrolling="0" width="152" height="30"></iframe>
        <iframe src="https://ghbtns.com/github-btn.html?user=dracula&amp;repo=dracula-theme&amp;type=fork&amp;count=true&amp;size=large" title="GitHub Forks" allowtransparency="true" frameBorder="0" scrolling="0" width="156" height="30"></iframe>
      </p>
    }
  }

  render() {
    return <div>
      <nav>
        <ul>
          <li><a href="/about">About</a></li>
          <li><Link href="/pro"><a className={styles.cta}>Dracula PRO</a></Link></li>
        </ul>
      </nav>
      <header className="header row center-xs">
        <div className="col-xs-12">
          <a href="/">
            <img className="icon" src={`/static/img/icons/${this.props.query.icon}`} width={icons[this.props.query.icon].width} height={icons[this.props.query.icon].height} alt={this.props.query.title} />
            <h1 className="title">Dracula</h1>
          </a>
          {this.renderDescription()}
          {this.renderGithubButtons()}
        </div>
      </header>
    </div>
  }
}

export default Header;