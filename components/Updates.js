import { Component } from 'react'

class Updates extends Component {
  render() {
    let title = 'Stay up to date'
    let description = 'Receive updates about this theme and more about Dracula.'

    if (this.props.type === 'blog') {
      description = 'Get updates about code editors and terminal themes.'
    } else if (this.props.type === 'journey') {
      title = 'Follow the Journey'
      description = 'Every month I send updates about this project and more.'
    }

    return (
      <div style={{ marginBottom: '2em' }}>
        <h3>{title}</h3>
        <p>{description}</p>

        <form
          action="https://draculatheme.us4.list-manage.com/subscribe/post?u=91b5113403e18d357704e4b08&amp;id=05d188e2db"
          method="post"
          className="form"
        >
          <input
            style={{ display: 'none' }}
            type="checkbox"
            value="1"
            name="group[66939][1]"
            id="mce-group[66939]-66939-0"
            defaultChecked
          />
          <input
            style={{ display: 'none' }}
            type="checkbox"
            value="2"
            name="group[66939][2]"
            id="mce-group[66939]-66939-1"
          />
          <input
            name="EMAIL"
            placeholder="Your email address"
            id="mce-EMAIL"
            type="email"
            required
          />
          <input
            type="submit"
            value="Subscribe"
            name="subscribe"
            id="mc-embedded-subscribe"
          />
        </form>

        {this.props.type === 'blog' && (
          <p className="rss">
            Or subscribe to the <a href="/rss.xml">RSS feed</a>.
          </p>
        )}
      </div>
    )
  }
}

export default Updates
