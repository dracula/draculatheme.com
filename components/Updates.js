import { Component } from 'react';

class Updates extends Component {
  render() {
    return <div style={{ marginBottom: '2em' }}>
      <h3>Stay up to date</h3>
      <p>Receive updates about this theme and more about Dracula.</p>

      <form action="https://draculatheme.us4.list-manage.com/subscribe/post?u=91b5113403e18d357704e4b08&amp;id=05d188e2db" method="post" className="form">
          <input name="EMAIL" placeholder="Your email address" id="mce-EMAIL" type="email" required />
          <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" />
      </form>
    </div>
  }
}

export default Updates;

