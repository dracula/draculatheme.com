module.exports = {
  source: 'src/content',
  destination: 'dist',
  metadata: {
    site: 'site.yml'
  },
  filemetadata: [
    {
      pattern: '**/*.html',
      metadata: {
        'baseurl': '..'
      }
    },
    {
      pattern: 'index.html',
      metadata: {
        'baseurl': '.'
      }
    }
  ],
  request: {
    alfred: 'https://contributors-dracula.wedeploy.io/alfred',
    atom: 'https://contributors-dracula.wedeploy.io/atom',
    base16: 'https://contributors-dracula.wedeploy.io/base16',
    brackets: 'https://contributors-dracula.wedeploy.io/brackets',
    coda: 'https://contributors-dracula.wedeploy.io/coda',
    conemu: 'https://contributors-dracula.wedeploy.io/conemu',
    emacs: 'https://contributors-dracula.wedeploy.io/emacs',
    duckduckgo: 'https://contributors-dracula.wedeploy.io/duckduckgo',
    gedit: 'https://contributors-dracula.wedeploy.io/gedit',
    highlightjs: 'https://contributors-dracula.wedeploy.io/highlightjs',
    hyper: 'https://contributors-dracula.wedeploy.io/hyper',
    iterm: 'https://contributors-dracula.wedeploy.io/iterm',
    jetbrains: 'https://contributors-dracula.wedeploy.io/jetbrains',
    kate: 'https://contributors-dracula.wedeploy.io/kate',
    konsole: 'https://contributors-dracula.wedeploy.io/konsole',
    lighttable: 'https://contributors-dracula.wedeploy.io/light-table',
    lightpaper: 'https://contributors-dracula.wedeploy.io/lightpaper',
    mintty: 'https://contributors-dracula.wedeploy.io/mintty',
    monodevelop: 'https://contributors-dracula.wedeploy.io/monodevelop',
    notepadplusplus: 'https://contributors-dracula.wedeploy.io/notepad-plus-plus',
    nylasn1: 'https://contributors-dracula.wedeploy.io/nylas-n1',
    pygments: 'https://contributors-dracula.wedeploy.io/pygments',
    qtcreator: 'https://contributors-dracula.wedeploy.io/qtcreator',
    quassel: 'https://contributors-dracula.wedeploy.io/quassel',
    sequelpro: 'https://contributors-dracula.wedeploy.io/sequel-pro',
    slack: 'https://contributors-dracula.wedeploy.io/slack',
    sublime: 'https://contributors-dracula.wedeploy.io/sublime',
    telegram: 'https://contributors-dracula.wedeploy.io/telegram',
    terminal: 'https://contributors-dracula.wedeploy.io/terminal.app',
    textmate: 'https://contributors-dracula.wedeploy.io/textmate',
    textual: 'https://contributors-dracula.wedeploy.io/textual',
    ulysses: 'https://contributors-dracula.wedeploy.io/ulysses',
    vim: 'https://contributors-dracula.wedeploy.io/vim',
    visualstudio: 'https://contributors-dracula.wedeploy.io/visual-studio',
    visualstudiocode: 'https://contributors-dracula.wedeploy.io/visual-studio-code',
    wox: 'https://contributors-dracula.wedeploy.io/wox',
    xchat: 'https://contributors-dracula.wedeploy.io/xchat',
    xcode: 'https://contributors-dracula.wedeploy.io/xcode',
    xresources: 'https://contributors-dracula.wedeploy.io/xresources',
    zsh: 'https://contributors-dracula.wedeploy.io/zsh'
  },
  assets: {
    source: 'src/assets',
    destination: './assets'
  },
  layouts: {
    engine: 'handlebars',
    directory: 'src/layouts',
    partials: {
      contributors: '../partials/contributors',
      header: '../partials/header',
      footer: '../partials/footer'
    }
  },
  inPlace: {
    directory: 'src/layouts',
    engine: 'handlebars'
  },
  serve: {
    port: 8000,
    verbose: true
  },
  watch: {
    paths: {
      "${source}/**/*": true,
      "src/assets/**/*": "**/*",
      "src/layouts/**/*": "**/*.html",
      "src/partials/**/*": "**/*.html"
    }
  }
};