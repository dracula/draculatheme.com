import { Component } from 'react';

class Footer extends Component {
  render() {
    return <p className="credits">Made with <span className="love">♥</span> by <a className="green" href="https://zenorocha.com" target="blank">Zeno Rocha</a><br />under <a className="orange" href="http://zenorocha.mit-license.org/" target="blank">MIT license</a></p>
  }
}

export default Footer;