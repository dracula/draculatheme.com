import React from 'react';
import Head from 'next/head';
import Theme from '../layouts/Theme';
import ComingSoon from '../components/ComingSoon';

class Index extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  render() {
    const title = 'Dracula';
    const description = 'A dark theme for Atom, Alfred, Brackets, Emacs, iTerm, Mintty, Notepad++, Slack, Sequel Pro, Sublime Text, Telegram, Textmate, Terminal.app, Ulysses, Vim, Visual Studio Code, Wox, Xcode, and Zsh';

    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <title>{title} &mdash; {description}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta content="https://draculatheme.com" property="og:url" />
          <meta content="https://draculatheme.com/static/img/facebook.png" property="og:image" />

          <link rel="stylesheet" href="//cdn.jsdelivr.net/flexboxgrid/6.3.0/flexboxgrid.min.css" type="text/css" />
        </Head>

        <main>
          <div className="row around-xs">
            <h2 className="category-title cyan tilt-right">Featured</h2>
          </div>

          <div className="row around-xs">
            <a href="/notepad-plus-plus/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/bat.png" width="222" height="158" alt="Bat" />
              </span>
              <h3 className="app-title cyan">Notepad++</h3>
            </a>
            <a href="/iterm/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/pumpkin.png" width="198" height="182" alt="Pumpkin" />
              </span>
              <h3 className="app-title orange">iTerm</h3>
            </a>
            <a href="/visual-studio-code/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/tombstone.png" width="238" height="190" alt="Tombstone" />
              </span>
              <h3 className="app-title purple">Visual Studio Code</h3>
            </a>
          </div>

          <div style={{ backgroundColor: '#2a2c37', marginRight: '-2rem', marginLeft: '-2rem', marginBottom: '80px', padding: '30px 0 60px' }}>
            <ComingSoon />
          </div>

          <div className="row around-xs">
            <h2 className="category-title orange tilt-left">Code Editors</h2>
          </div>

          <div className="row around-xs">
            <a href="/vim/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/eye.png" width="168" height="170" alt="Eye" />
              </span>
              <h3 className="app-title purple">Vim</h3>
            </a>
            <a href="/sublime/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/ghost.png" width="198" height="181" alt="Ghost" />
              </span>
              <h3 className="app-title cyan">Sublime</h3>
            </a>
            <a href="/xcode/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/candies.png" width="198" height="184" alt="Candies" />
              </span>
              <h3 className="app-title orange">Xcode</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/atom/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/glass.png" width="174" height="204" alt="Glass" />
              </span>
              <h3 className="app-title orange">Atom</h3>
            </a>
            <a href="/visual-studio-code/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/tombstone.png" width="238" height="190" alt="Tombstone" />
              </span>
              <h3 className="app-title purple">Visual Studio Code</h3>
            </a>
            <a href="/emacs/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/spider.png" width="181" height="175" alt="Spider" />
              </span>
              <h3 className="app-title cyan">Emacs</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/notepad-plus-plus/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/bat.png" width="222" height="158" alt="Bat" />
              </span>
              <h3 className="app-title cyan">Notepad++</h3>
            </a>
            <a href="/jetbrains/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/frankenstein.png" width="175" height="150" alt="Frankenstein" />
              </span>
              <h3 className="app-title pink">JetBrains</h3>
            </a>
            <a href="/visual-studio/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/broom.png" width="186" height="202" alt="Broom" />
              </span>
              <h3 className="app-title purple">Visual Studio</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/coda/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/cauldron.png" width="198" height="184" alt="Cauldron" />
              </span>
              <h3 className="app-title purple">Coda</h3>
            </a>
            <a href="/brackets/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/ghost.png" width="198" height="181" alt="Ghost" />
              </span>
              <h3 className="app-title cyan">Brackets</h3>
            </a>
            <a href="/light-table/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/pumpkin.png" width="198" height="182" alt="Pumpkin" />
              </span>
              <h3 className="app-title orange">Light Table</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/textmate/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/skull.png" width="198" height="182" alt="Skull" />
              </span>
              <h3 className="app-title cyan">TextMate</h3>
            </a>
            <a href="/gedit/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/moon.png" width="168" height="168" alt="Moon" />
              </span>
              <h3 className="app-title orange">Gedit</h3>
            </a>
            <a href="/pythonista/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/candle.png" width="198" height="184" alt="Candle" />
              </span>
              <h3 className="app-title purple">Pythonista</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/arduino-ide/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/tombstone.png" width="238" height="190" alt="Tombstone" />
              </span>
              <h3 className="app-title purple">Arduino IDE</h3>
            </a>
            <a href="/coteditor/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/axe.png" width="198" height="174" alt="Axe" />
              </span>
              <h3 className="app-title cyan">CotEditor</h3>
            </a>
            <a href="/geany/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/cone.png" width="168" height="189" alt="Cone" />
              </span>
              <h3 className="app-title orange">Geany</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/lightpaper/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/eye.png" width="168" height="170" alt="Eye" />
              </span>
              <h3 className="app-title purple">LightPaper</h3>
            </a>
            <a href="/monodevelop/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/spider.png" width="181" height="175" alt="Spider" />
              </span>
              <h3 className="app-title cyan">MonoDevelop</h3>
            </a>
            <a href="/qtcreator/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/candies.png" width="198" height="184" alt="Candies" />
              </span>
              <h3 className="app-title orange">Qt Creator</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/bbedit/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/broom.png" width="186" height="202" alt="Broom" />
              </span>
              <h3 className="app-title purple">BBEdit</h3>
            </a>
            <a href="/editplus/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/bat.png" width="222" height="158" alt="Bat" />
              </span>
              <h3 className="app-title cyan">Editplus</h3>
            </a>
            <a href="/gamemaker-studio/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/frankenstein.png" width="175" height="150" alt="Frankenstein" />
              </span>
              <h3 className="app-title pink">GameMaker Studio</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/kate/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/glass.png" width="174" height="204" alt="Glass" />
              </span>
              <h3 className="app-title orange">Kate</h3>
            </a>
            <a href="/jupyterlab/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/candle.png" width="198" height="184" alt="Candle" />
              </span>
              <h3 className="app-title purple">JupyterLab</h3>
            </a>
            <a href="/wing/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/coffin.png" width="200" height="197" alt="Broom" />
              </span>
              <h3 className="app-title cyan">Wing</h3>
            </a>
          </div>

          <div className="row around-xs">
            <h2 className="category-title purple tilt-right">Terminal</h2>
          </div>

          <div className="row around-xs">
            <a href="/iterm/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/pumpkin.png" width="198" height="182" alt="Pumpkin" />
              </span>
              <h3 className="app-title orange">iTerm</h3>
            </a>
            <a href="/hyper/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/cauldron.png" width="198" height="184" alt="Cauldron" />
              </span>
              <h3 className="app-title purple">Hyper</h3>
            </a>
            <a href="/zsh/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/bat.png" width="222" height="158" alt="Bat" />
              </span>
              <h3 className="app-title cyan">Zsh</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/windows-terminal/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/spider.png" width="181" height="175" alt="Spider" />
              </span>
              <h3 className="app-title cyan">Windows Terminal</h3>
            </a>
            <a href="/tilix/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/moon.png" width="168" height="168" alt="Moon" />
              </span>
              <h3 className="app-title orange">Tilix</h3>
            </a>
            <a href="/termux/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/eye.png" width="168" height="170" alt="Eye" />
              </span>
              <h3 className="app-title purple">Termux</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/terminal/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/candle.png" width="198" height="184" alt="Candle" />
              </span>
              <h3 className="app-title purple">Terminal.app</h3>
            </a>
            <a href="/mintty/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/coffin.png" width="200" height="197" alt="Broom" />
              </span>
              <h3 className="app-title cyan">Mintty</h3>
            </a>
            <a href="/mutt/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/tombstone.png" width="238" height="190" alt="Tombstone" />
              </span>
              <h3 className="app-title purple">Mutt</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/kitty/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/skull.png" width="198" height="182" alt="Skull" />
              </span>
              <h3 className="app-title cyan">Kitty</h3>
            </a>
            <a href="/gnome-terminal/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/broom.png" width="186" height="202" alt="Broom" />
              </span>
              <h3 className="app-title orange">Gnome Terminal</h3>
            </a>
            <a href="/mobaxterm/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/ghost.png" width="198" height="181" alt="Ghost" />
              </span>
              <h3 className="app-title cyan">MobaXterm</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/konsole/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/candies.png" width="198" height="184" alt="Candies" />
              </span>
              <h3 className="app-title orange">Konsole</h3>
            </a>
            <a href="/conemu/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/hat-magic.png" width="237" height="196" alt="Magic Hat" />
              </span>
              <h3 className="app-title purple">ConEmu</h3>
            </a>
            <a href="/xresources/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/cone.png" width="168" height="189" alt="Cone" />
              </span>
              <h3 className="app-title orange">Xresources</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/alacritty/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/axe.png" width="198" height="174" alt="Axe" />
              </span>
              <h3 className="app-title cyan">Alacritty</h3>
            </a>
            <a href="/cmder/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/glass.png" width="174" height="204" alt="Glass" />
              </span>
              <h3 className="app-title orange">Cmder</h3>
            </a>
            <a href="/fish/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/cauldron.png" width="198" height="184" alt="Cauldron" />
              </span>
              <h3 className="app-title purple">Fish</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/powershell/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/frankenstein.png" width="175" height="150" alt="Frankenstein" />
              </span>
              <h3 className="app-title pink">PowerShell</h3>
            </a>
            <a href="/fluent-terminal/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/pumpkin.png" width="198" height="182" alt="Pumpkin" />
              </span>
              <h3 className="app-title orange">Fluent Terminal</h3>
            </a>
            <a href="/termite/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/bat.png" width="222" height="158" alt="Bat" />
              </span>
              <h3 className="app-title cyan">Termite</h3>
            </a>
          </div>

          <div className="row around-xs">
            <h2 className="category-title cyan tilt-left">Syntax Highlight</h2>
          </div>

          <div className="row around-xs">
            <a href="https://github.com/codemirror/CodeMirror/blob/master/theme/dracula.css" target="_blank" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/moon.png" width="168" height="168" alt="Moon" />
              </span>
              <h3 className="app-title orange">CodeMirror</h3>
            </a>
            <a href="/highlightjs/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/skull.png" width="198" height="182" alt="Skull" />
              </span>
              <h3 className="app-title cyan">Highlight.js</h3>
            </a>
            <a href="/pygments/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/broom.png" width="186" height="202" alt="Broom" />
              </span>
              <h3 className="app-title purple">Pygments</h3>
            </a>
          </div>

          <div className="row around-xs">
            <h2 className="category-title orange tilt-left">Design</h2>
          </div>

          <div className="row around-xs">
            <a href="/adobe/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/hat-magic.png" width="237" height="196" alt="Magic Hat" />
              </span>
              <h3 className="app-title purple">Adobe</h3>
            </a>
            <a href="/figma/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/spider.png" width="181" height="175" alt="Spider" />
              </span>
              <h3 className="app-title cyan">Figma</h3>
            </a>
            <a href="/sketch/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/candies.png" width="198" height="184" alt="Candies" />
              </span>
              <h3 className="app-title orange">Sketch</h3>
            </a>
          </div>

          <div className="row around-xs">
            <h2 className="category-title purple tilt-right">Messaging</h2>
          </div>

          <div className="row around-xs">
            <a href="/slack/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/axe.png" width="198" height="174" alt="Axe" />
              </span>
              <h3 className="app-title cyan">Slack</h3>
            </a>
            <a href="/telegram/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/candle.png" width="198" height="184" alt="Candle" />
              </span>
              <h3 className="app-title purple">Telegram Desktop</h3>
            </a>
            <a href="/telegram-android/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/cone.png" width="168" height="189" alt="Cone" />
              </span>
              <h3 className="app-title orange">Telegram Android</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/facebook-messenger/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/cauldron.png" width="198" height="184" alt="Cauldron" />
              </span>
              <h3 className="app-title purple">Facebook Messenger</h3>
            </a>
            <a href="/limechat/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/ghost.png" width="198" height="181" alt="Ghost" />
              </span>
              <h3 className="app-title cyan">LimeChat</h3>
            </a>
            <a href="/textual/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/glass.png" width="174" height="204" alt="Glass" />
              </span>
              <h3 className="app-title orange">Textual</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/mattermost/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/pumpkin.png" width="198" height="182" alt="Pumpkin" />
              </span>
              <h3 className="app-title orange">Mattermost</h3>
            </a>
            <a href="/quassel/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/candies.png" width="198" height="184" alt="Candies" />
              </span>
              <h3 className="app-title orange">Quassel</h3>
            </a>
            <a href="/xchat/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/bat.png" width="222" height="158" alt="Bat" />
              </span>
              <h3 className="app-title cyan">XChat</h3>
            </a>
          </div>

          <div className="row around-xs">
            <h2 className="category-title orange tilt-left">Notes</h2>
          </div>

          <div className="row around-xs">
            <a href="/bear/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/ghost.png" width="198" height="181" alt="Ghost" />
              </span>
              <h3 className="app-title cyan">Bear</h3>
            </a>
            <a href="/ulysses/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/glass.png" width="174" height="204" alt="Glass" />
              </span>
              <h3 className="app-title orange">Ulysses</h3>
            </a>
            <a href="/macdown/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/broom.png" width="186" height="202" alt="Broom" />
              </span>
              <h3 className="app-title purple">MacDown</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/typora/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/cauldron.png" width="198" height="184" alt="Cauldron" />
              </span>
              <h3 className="app-title purple">Typora</h3>
            </a>
            <a href="/quiver/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/moon.png" width="168" height="168" alt="Moon" />
              </span>
              <h3 className="app-title orange">Quiver</h3>
            </a>
          </div>

          <div className="row around-xs">
            <h2 className="category-title cyan tilt-right">Launchers</h2>
          </div>

          <div className="row around-xs">
            <a href="/alfred/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/hat-magic.png" width="237" height="196" alt="Magic Hat" />
              </span>
              <h3 className="app-title purple">Alfred</h3>
            </a>
            <a href="/ulauncher/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/candies.png" width="198" height="184" alt="Candies" />
              </span>
              <h3 className="app-title orange">Ulauncher</h3>
            </a>
            <a href="/wox/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/eye.png" width="168" height="170" alt="Eye" />
              </span>
              <h3 className="app-title purple">Wox</h3>
            </a>
          </div>

          <div className="row around-xs">
            <h2 className="category-title purple tilt-left">Browsers & Extensions</h2>
          </div>

          <div className="row around-xs">
            <a href="/chrome/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/cone.png" width="168" height="189" alt="Cone" />
              </span>
              <h3 className="app-title orange">Chrome</h3>
            </a>
            <a href="/firefox/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/coffin.png" width="200" height="197" alt="Broom" />
              </span>
              <h3 className="app-title cyan">Firefox</h3>
            </a>
            <a href="/duckduckgo/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/broom.png" width="186" height="202" alt="Broom" />
              </span>
              <h3 className="app-title purple">DuckDuckGo</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/react-devtools/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/ghost.png" width="198" height="181" alt="Ghost" />
              </span>
              <h3 className="app-title cyan">React DevTools</h3>
            </a>
            <a href="/qutebrowser/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/cauldron.png" width="198" height="184" alt="Cauldron" />
              </span>
              <h3 className="app-title purple">Qutebrowser</h3>
            </a>
            <a href="/vimium/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/pumpkin.png" width="198" height="182" alt="Pumpkin" />
              </span>
              <h3 className="app-title orange">Vimium</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/vivaldi/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/bat.png" width="222" height="158" alt="Bat" />
              </span>
              <h3 className="app-title cyan">Vivaldi</h3>
            </a>
          </div>

          <div className="row around-xs">
            <h2 className="category-title orange tilt-right">Miscellaneous</h2>
          </div>

          <div className="row around-xs">
            <a href="/base16/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/skull.png" width="198" height="182" alt="Skull" />
              </span>
              <h3 className="app-title cyan">Base16</h3>
            </a>
            <a href="/blender/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/spider.png" width="181" height="175" alt="Spider" />
              </span>
              <h3 className="app-title cyan">Blender</h3>
            </a>
            <a href="/couscous/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/frankenstein.png" width="175" height="150" alt="Frankenstein" />
              </span>
              <h3 className="app-title pink">Couscous</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/gitk/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/axe.png" width="198" height="174" alt="Axe" />
              </span>
              <h3 className="app-title cyan">Gitk</h3>
            </a>
            <a href="/gmk/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/cauldron.png" width="198" height="184" alt="Cauldron" />
              </span>
              <h3 className="app-title purple">GMK</h3>
            </a>
            <a href="/sequel-pro/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/cone.png" width="168" height="189" alt="Cone" />
              </span>
              <h3 className="app-title orange">Sequel Pro</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/react-devtools/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/ghost.png" width="198" height="181" alt="Ghost" />
              </span>
              <h3 className="app-title cyan">React DevTools</h3>
            </a>
            <a href="/mindnode/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/candle.png" width="198" height="184" alt="Candle" />
              </span>
              <h3 className="app-title purple">Mindnode</h3>
            </a>
            <a href="/nylas-n1/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/coffin.png" width="200" height="197" alt="Broom" />
              </span>
              <h3 className="app-title cyan">Nylas N1</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/oracle-sql-developer/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/cone.png" width="168" height="189" alt="Cone" />
              </span>
              <h3 className="app-title orange">Oracle SQL Developer</h3>
            </a>
            <a href="/jgrasp/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/hat-magic.png" width="237" height="196" alt="Magic Hat" />
              </span>
              <h3 className="app-title purple">jGrasp</h3>
            </a>
            <a href="/i3/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/candies.png" width="198" height="184" alt="Candies" />
              </span>
              <h3 className="app-title orange">i3</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/steam/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/tombstone.png" width="238" height="190" alt="Tombstone" />
              </span>
              <h3 className="app-title purple">Steam</h3>
            </a>
            <a href="/github-pages/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/candies.png" width="198" height="184" alt="Candies" />
              </span>
              <h3 className="app-title orange">GitHub Pages</h3>
            </a>
            <a href="/insomnia/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/spider.png" width="181" height="175" alt="Spider" />
              </span>
              <h3 className="app-title cyan">Insomnia</h3>
            </a>
          </div>

          <div className="row around-xs">
            <a href="/wordpress/" className="app col-xs-12 col-sm-2">
              <span className="app-img">
                <img src="/static/img/icons/eye.png" width="168" height="170" alt="Eye" />
              </span>
              <h3 className="app-title purple">Wordpress</h3>
            </a>
          </div>
        </main>

      </div>
    )
  }
}

Index.Layout = Theme;

export default Index;
