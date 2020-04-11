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
  state = {
    tooltip: 'Copy'
  };

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
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>#282a36</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>40 42 54</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>231° 15% 18%</td>
            <td><input type="color" defaultValue="#282a36" /></td>
          </tr>
          <tr>
            <td>Current Line</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>#44475a</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>68 71 90</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>232° 14% 31%</td>
            <td><input type="color" defaultValue="#44475a" /></td>
          </tr>
          <tr>
            <td>Foreground</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>#f8f8f2</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>248 248 242</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>60° 30% 96%</td>
            <td><input type="color" defaultValue="#f8f8f2" /></td>
          </tr>
          <tr>
            <td>Comment</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>#6272a4</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>98 114 164</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>225° 27% 51%</td>
            <td><input type="color" defaultValue="#6272a4" /></td>
          </tr>
          <tr>
            <td>Cyan</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>#8be9fd</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>139 233 253</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>191° 97% 77%</td>
            <td><input type="color" defaultValue="#8be9fd" /></td>
          </tr>
          <tr>
            <td>Green</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>#50fa7b</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>80 250 123</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>135° 94% 65%</td>
            <td><input type="color" defaultValue="#50fa7b" /></td>
          </tr>
          <tr>
            <td>Orange</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>#ffb86c</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>255 184 108</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>31° 100% 71%</td>
            <td><input type="color" defaultValue="#ffb86c" /></td>
          </tr>
          <tr>
            <td>Pink</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>#ff79c6</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>255 121 198</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>326° 100% 74%</td>
            <td><input type="color" defaultValue="#ff79c6" /></td>
          </tr>
          <tr>
            <td>Purple</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>#bd93f9</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>189 147 249</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>265° 89% 78%</td>
            <td><input type="color" defaultValue="#bd93f9" /></td>
          </tr>
          <tr>
            <td>Red</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>#ff5555</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>255 85 85</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>0° 100% 67%</td>
            <td><input type="color" defaultValue="#ff5555" /></td>
          </tr>
          <tr>
            <td>Yellow</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>#f1fa8c</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>241 250 140</td>
            <td className={styles.copy} aria-label={this.state.tooltip} data-microtip-position="bottom" role="tooltip" onClick={this.copy.bind(this)} onMouseLeave={this.resetTooltip.bind(this)}>65° 92% 76%</td>
            <td><input type="color" defaultValue="#f1fa8c" /></td>
          </tr>
        </tbody>
      </table>
      <p>For more details about how to apply these different colors to represent different code symbols, please see the <a href="https://spec.draculatheme.com">Dracula Specification</a>.</p>
    </div>
  }

  async copy(e) {
    if (!navigator.clipboard) return;

    try {
      this.setState({ tooltip: 'Copied!' })
      await navigator.clipboard.writeText(e.currentTarget.textContent);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  resetTooltip() {
    this.setState({ tooltip: 'Copy' });
  }

  render() {
    const title = 'Contribute — The color palette of the Dracula theme';
    const description = 'Check this guide to understand how to contribute to Dracula, including the most commonly asked questions and the color palette.';

    return (
      <div className="single">
        <Head>
          <meta charSet="utf-8" />
          <title>{title}</title>
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
