import React from 'react';
import Head from 'next/head';
import Theme from '../layouts/Theme';
import ProCta from '../components/ProCta';
import styles from './contribute.module.css';

export async function getStaticProps() {
  const query = { title: 'Contribute', color: 'pink', icon: 'pack-1/045-dracula.svg' };
  return { props: { query } };
}

class Contribute extends React.Component {
  renderFaq() {
    return <div className={styles.faq}>
      <h3>FAQ</h3>
      <p><strong>Are you going to create a light color scheme?</strong></p>
      <p>Nope. Dracula can't stand the light.</p>

      <p><strong>Are you going to support app X?</strong></p>
      <p>We hope so, but we need your help to accomplish that. Since you're already using app X you're probably much more experienced on it than us. So give it a try first!</p>

      <p><strong>How do I submit a new theme?</strong></p>
      <ol>
        <li><p>Create a new repository based on this <a href="https://github.com/dracula/template">template</a>.</p></li>
        <li><p>Build the new theme using the <a href="#color-palette">Color Palette</a> below.</p></li>
        <li><p>Finally, <a href="https://github.com/dracula/dracula-theme/issues/new">submit an issue</a> with a link to your repository. Once the theme is accepted, we will move the repository under the Dracula organization and give you rights to maintain it :)</p></li>
      </ol>
    </div>
  }

  renderColorPalette() {
    return <div>
      <h3 id="color-palette">Color Palette</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Palette</th>
            <th>Hex</th>
            <th>RGB</th>
            <th>HSL</th>
            <th>Color Picker</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Background</td>
            <td>#282a36</td>
            <td>40 42 54</td>
            <td>231° 15% 18%</td>
            <td><input type="color" defaultValue="#282a36" /></td>
          </tr>
          <tr>
            <td>Current Line</td>
            <td>#44475a</td>
            <td>68 71 90</td>
            <td>232° 14% 31%</td>
            <td><input type="color" defaultValue="#44475a" /></td>
          </tr>
          <tr>
            <td>Foreground</td>
            <td>#f8f8f2</td>
            <td>248 248 242</td>
            <td>60° 30% 96%</td>
            <td><input type="color" defaultValue="#f8f8f2" /></td>
          </tr>
          <tr>
            <td>Comment</td>
            <td>#6272a4</td>
            <td>98 114 164</td>
            <td>225° 27% 51%</td>
            <td><input type="color" defaultValue="#6272a4" /></td>
          </tr>
          <tr>
            <td>Cyan</td>
            <td>#8be9fd</td>
            <td>139 233 253</td>
            <td>191° 97% 77%</td>
            <td><input type="color" defaultValue="#8be9fd" /></td>
          </tr>
          <tr>
            <td>Green</td>
            <td>#50fa7b</td>
            <td>80 250 123</td>
            <td>135° 94% 65%</td>
            <td><input type="color" defaultValue="#50fa7b" /></td>
          </tr>
          <tr>
            <td>Orange</td>
            <td>#ffb86c</td>
            <td>255 184 108</td>
            <td>31° 100% 71%</td>
            <td><input type="color" defaultValue="#ffb86c" /></td>
          </tr>
          <tr>
            <td>Pink</td>
            <td>#ff79c6</td>
            <td>255 121 198</td>
            <td>326° 100% 74%</td>
            <td><input type="color" defaultValue="#ff79c6" /></td>
          </tr>
          <tr>
            <td>Purple</td>
            <td>#bd93f9</td>
            <td>189 147 249</td>
            <td>265° 89% 78%</td>
            <td><input type="color" defaultValue="#bd93f9" /></td>
          </tr>
          <tr>
            <td>Red</td>
            <td>#ff5555</td>
            <td>255 85 85</td>
            <td>0° 100% 67%</td>
            <td><input type="color" defaultValue="#ff5555" /></td>
          </tr>
          <tr>
            <td>Yellow</td>
            <td>#f1fa8c</td>
            <td>241 250 140</td>
            <td>65° 92% 76%</td>
            <td><input type="color" defaultValue="#f1fa8c" /></td>
          </tr>
        </tbody>
      </table>
      <p>For more details about how to apply these different colors to represent different code symbols, please see the <a href="https://dsifford.github.io/dracula-spec/">Dracula Specification</a>.</p>
    </div>
  }

  render() {
    const title = 'Contribute';
    const description = 'Most common asked questions and color palette of the Dracula theme';

    return (
      <div className="single">
        <Head>
          <meta charSet="utf-8" />
          <title>{title} &mdash; {description}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta content="https://draculatheme.com/contribute" property="og:url" />
          <meta content="https://draculatheme.com/static/img/facebook.png" property="og:image" />
        </Head>

        <div className="wrap">
          <div className="theme">
            {this.renderFaq()}
            {this.renderColorPalette()}
          </div>
        </div>

        <ProCta />
      </div>
    )
  }
}

Contribute.Layout = Theme;

export default Contribute;
