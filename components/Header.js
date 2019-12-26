import { Component } from 'react';
import icons from '../lib/icons';

class Header extends Component {
  renderDescription() {
    if (this.props.query.repo) {
      return <h2 className="subtitle">A dark theme for {this.props.query.title} <a href="/">and {this.props.query.total}+ apps</a></h2>
    }

    return <h2 className="subtitle">A dark theme for <span className="rotating"></span></h2>
  }

  render() {
    return <header className="header row center-xs">
      <div className="col-xs-12">
        <a href="/">
          <img className="icon" src={`/static/img/icons/${this.props.query.icon}`} width={icons[this.props.query.icon].width} height={icons[this.props.query.icon].height} alt={this.props.query.title} />
          <h1 className="title">Dracula</h1>
        </a>
        {this.renderDescription()}
        <p className="gh-btns">
          <iframe src="https://ghbtns.com/github-btn.html?user=dracula&amp;repo=dracula-theme&amp;type=watch&amp;count=true&amp;size=large" title="GitHub Stars" allowtransparency="true" frameBorder="0" scrolling="0" width="152" height="30"></iframe>
          <iframe src="https://ghbtns.com/github-btn.html?user=dracula&amp;repo=dracula-theme&amp;type=fork&amp;count=true&amp;size=large" title="GitHub Forks" allowtransparency="true" frameBorder="0" scrolling="0" width="156" height="30"></iframe>
        </p>
      </div>
    </header>
  }
}

export default Header;