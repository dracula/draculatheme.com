import { Component } from 'react'
import Link from 'next/link'

class Footer extends Component {
  render() {
    const items = [
      {
        section: 'Projects',
        children: [
          {
            name: 'Dracula Theme',
            url: '/',
          },
          {
            name: 'Dracula PRO',
            url: '/pro',
          },
          {
            name: 'Dracula UI',
            url: '/ui',
          },
          {
            name: 'Dracula Shop',
            url: '/shop',
          },
        ],
      },
      {
        section: 'Resources',
        children: [
          {
            name: 'About',
            url: '/about',
          },
          {
            name: 'Blog',
            url: '/blog',
          },
          {
            name: 'Contribute',
            url: '/contribute',
          },
          {
            name: 'Spec',
            url: 'https://spec.draculatheme.com',
            isExternal: true,
          },
        ],
      },
      {
        section: 'Community',
        children: [
          {
            name: 'GitHub',
            url: 'https://github.com/dracula/dracula-theme',
            isExternal: true,
          },
          {
            name: 'Twitter',
            url: 'https://twitter.com/draculatheme',
            isExternal: true,
          },
          {
            name: 'Discord',
            url: 'https://discord.gg/yDcFsrYuq9',
            isExternal: true,
          },
          {
            name: 'Reddit',
            url: 'https://www.reddit.com/r/draculatheme',
            isExternal: true,
          },
          {
            name: 'Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Dracula_(color_scheme)',
            isExternal: true,
          },
        ],
      },
    ]

    return (
      <div
        style={{
          background: '#282a36',
          padding: '60px 0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="footer-columns">
          {items.map(item => {
            return (
              <div key={item.section} className="footer-column">
                <p className="footer-section">{item.section}</p>
                <ul className="footer-list">
                  {item.children.map(child => {
                    return (
                      <li key={child.name} className="footer-item">
                        {child.isExternal ? (
                          <a
                            href={child.url}
                            className="footer-link"
                            target="_blank"
                          >
                            {child.name}
                          </a>
                        ) : (
                          <Link href={child.url}>
                            <a className="footer-link">{child.name}</a>
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
        <p className="credits">
          Made with <span className="love">♥</span> by{' '}
          <a className="green" href="https://zenorocha.com" target="blank">
            Zeno Rocha
          </a>
          <br />
          under{' '}
          <a
            className="orange"
            href="http://zenorocha.mit-license.org/"
            target="blank"
          >
            MIT license
          </a>
        </p>
      </div>
    )
  }
}

export default Footer
