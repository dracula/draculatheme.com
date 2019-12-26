import { Component } from 'react';

class Contributors extends Component {
  renderContributors() {
    if (this.props.data && this.props.data.length) {
      return this.props.data.map((contributor, index) => {
        return <li key={index}>
          <a href={contributor.html_url} title={contributor.login} target="_blank">
            <img loading="lazy" src={`${contributor.avatar_url}&s=160`} alt={contributor.login} width="80" />
          </a>
        </li>
      });
    }
  }

  render() {
    return <div>
      <h3>Contributors</h3>
      <p>This theme wouldn't exist without these people. Wanna help too? Check the <a className="cyan" href={`https://github.com/dracula/${this.props.repo}`} target="blank">repository on GitHub</a>.</p>

      <ul className="contributors">
        {this.renderContributors()}
      </ul>
    </div>
  }
}

export default Contributors;