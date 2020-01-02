import { Component } from 'react';

class ComingSoon extends Component {
  render() {
    return <div className="green">
      <h1 style={{  marginBottom: 20 }} className="title">Dracula Pro</h1>
      <div style={{ backgroundColor: '#1d1e26', borderRadius: '10px', margin: '0 auto' }} className="box">
        <h2 style={{ textAlign: 'center', color: '#fff' }}>a new theme is coming.</h2>
        <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, .6)' }}>Enter your email and we'll put you on the invite list.</p>
        <form action="https://draculatheme.us4.list-manage.com/subscribe/post?u=91b5113403e18d357704e4b08&amp;id=05d188e2db" method="post" className="form">
          <input style={{ display: 'none' }} type="checkbox" value="1" name="group[66939][1]" id="mce-group[66939]-66939-0" />
          <input style={{ display: 'none' }} type="checkbox" value="2" name="group[66939][2]" id="mce-group[66939]-66939-1" defaultChecked />
          <input style={{ fontSize: '18px', backgroundColor: '#333' }} name="EMAIL" placeholder="your@email.com" id="mce-EMAIL" type="email" required />
          <input style={{ fontSize: '18px' }} type="submit" value="Notify me" name="subscribe" id="mc-embedded-subscribe" />
        </form>
      </div>

      <style jsx>{`
      h2 {
        font-size: 38px;
      }

      p {
        font-size: 19px;
      }

      .box {
        padding: 45px;
        max-width: 400px;
      }

      @media (max-width: 840px) {
        h2 {
          font-size: 32px;
        }

        p {
          font-size: 16px;
        }

        .box {
          padding: 20px;
          max-width: 375px;
        }
      }
    `}</style>
    </div>
  }
}

export default ComingSoon;