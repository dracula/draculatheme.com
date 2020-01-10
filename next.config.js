require('dotenv').config();

module.exports = {
  exportTrailingSlash: true,
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/', query: { title: 'Dracula', color: 'purple', icon: 'dracula.svg' } },
      '/pro': { page: '/pro', query: {} },
      '/alacritty': { page: '/[theme]', query: { title: 'Alacritty', repo: 'alacritty', color: 'cyan', icon: 'axe.png' } },
      '/alfred': { page: '/[theme]', query: { title: 'Alfred', repo: 'alfred', color: 'purple', icon: 'hat-magic.png' } },
      '/atom': { page: '/[theme]', query: { title: 'Atom', repo: 'atom', color: 'orange', icon: 'glass.png' } },
      '/base16': { page: '/[theme]', query: { title: 'Base16', repo: 'base16-dracula-scheme', color: 'cyan', icon: 'skull.png' } },
      '/bbedit': { page: '/[theme]', query: { title: 'BBEdit', repo: 'bbedit', color: 'purple', icon: 'broom.png' } },
      '/brackets': { page: '/[theme]', query: { title: 'Brackets', repo: 'brackets', color: 'cyan', icon: 'ghost.png' } },
      '/cmder': { page: '/[theme]', query: { title: 'Cmder', repo: 'cmder', color: 'orange', icon: 'glass.png' } },
      '/coda': { page: '/[theme]', query: { title: 'Coda', repo: 'coda', color: 'purple', icon: 'cauldron.png' } },
      '/conemu': { page: '/[theme]', query: { title: 'ConEmu', repo: 'conemu', color: 'purple', icon: 'hat-magic.png' } },
      '/emacs': { page: '/[theme]', query: { title: 'Emacs', repo: 'emacs', color: 'cyan', icon: 'spider.png' } },
      '/fish': { page: '/[theme]', query: { title: 'Fish', repo: 'fish', color: 'purple', icon: 'cauldron.png' } },
      '/gedit': { page: '/[theme]', query: { title: 'Gedit', repo: 'gedit', color: 'orange', icon: 'moon.png' } },
      '/github-pages': { page: '/[theme]', query: { title: 'GitHub Pages', repo: 'gh-pages', color: 'orange', icon: 'candies.png' } },
      '/gitk': { page: '/[theme]', query: { title: 'Gitk', repo: 'gitk', color: 'cyan', icon: 'axe.png' } },
      '/gmk': { page: '/[theme]', query: { title: 'GMK', repo: 'gmk', color: 'purple', icon: 'cauldron.png' } },
      '/gnome-terminal': { page: '/[theme]', query: { title: 'Gnome Terminal', repo: 'gnome-terminal', color: 'orange', icon: 'broom.png' } },
      '/highlightjs': { page: '/[theme]', query: { title: 'Highlight.js', repo: 'highlightjs', color: 'cyan', icon: 'skull.png' } },
      '/hyper': { page: '/[theme]', query: { title: 'Hyper', repo: 'hyper', color: 'purple', icon: 'cauldron.png' } },
      '/iterm': { page: '/[theme]', query: { title: 'iTerm', repo: 'iterm', color: 'orange', icon: 'pumpkin.png' } },
      '/jetbrains': { page: '/[theme]', query: { title: 'JetBrains', repo: 'jetbrains', color: 'pink', icon: 'frankenstein.png' } },
      '/kate': { page: '/[theme]', query: { title: 'Kate', repo: 'kate', color: 'orange', icon: 'glass.png' } },
      '/kitty': { page: '/[theme]', query: { title: 'Kitty', repo: 'kitty', color: 'cyan', icon: 'skull.png' } },
      '/konsole': { page: '/[theme]', query: { title: 'Konsole', repo: 'konsole', color: 'orange', icon: 'candies.png' } },
      '/light-table': { page: '/[theme]', query: { title: 'Light Table', repo: 'light-table', color: 'orange', icon: 'pumpkin.png' } },
      '/lightpaper': { page: '/[theme]', query: { title: 'LightPaper', repo: 'lightpaper', color: 'purple', icon: 'eye.png' } },
      '/macdown': { page: '/[theme]', query: { title: 'MacDown', repo: 'macdown', color: 'purple', icon: 'broom.png' } },
      '/mindnode': { page: '/[theme]', query: { title: 'MindNode', repo: 'mindnode', color: 'purple', icon: 'candle.png' } },
      '/mintty': { page: '/[theme]', query: { title: 'Mintty', repo: 'mintty', color: 'orange', icon: 'coffin.png' } },
      '/mobaxterm': { page: '/[theme]', query: { title: 'MobaXterm', repo: 'mobaxterm', color: 'cyan', icon: 'ghost.png' } },
      '/monodevelop': { page: '/[theme]', query: { title: 'MonoDevelop', repo: 'monodevelop', color: 'cyan', icon: 'spider.png' } },
      '/mutt': { page: '/[theme]', query: { title: 'Mutt', repo: 'mutt', color: 'purple', icon: 'tombstone.png' } },
      '/notepad-plus-plus': { page: '/[theme]', query: { title: 'Notepad++', repo: 'notepad-plus-plus', color: 'cyan', icon: 'bat.png' } },
      '/nylas-n1': { page: '/[theme]', query: { title: 'Nylas N1', repo: 'nylas-n1', color: 'orange', icon: 'coffin.png' } },
      '/powershell': { page: '/[theme]', query: { title: 'PowerShell', repo: 'powershell', color: 'pink', icon: 'frankenstein.png' } },
      '/pygments': { page: '/[theme]', query: { title: 'Pygments', repo: 'pygments', color: 'purple', icon: 'broom.png' } },
      '/pythonista': { page: '/[theme]', query: { title: 'Pythonista', repo: 'Pythonista', color: 'purple', icon: 'candle.png' } },
      '/qtcreator': { page: '/[theme]', query: { title: 'Qt Creator', repo: 'qtcreator', color: 'orange', icon: 'candies.png' } },
      '/quassel': { page: '/[theme]', query: { title: 'Quassel', repo: 'quassel', color: 'orange', icon: 'candies.png' } },
      '/quiver': { page: '/[theme]', query: { title: 'Quiver', repo: 'quiver', color: 'orange', icon: 'moon.png' } },
      '/react-devtools': { page: '/[theme]', query: { title: 'React DevTools', repo: 'react-devtools', color: 'cyan', icon: 'ghost.png' } },
      '/sequel-pro': { page: '/[theme]', query: { title: 'Sequel Pro', repo: 'sequel-pro', color: 'orange', icon: 'cone.png' } },
      '/slack': { page: '/[theme]', query: { title: 'Slack', repo: 'slack', color: 'cyan', icon: 'axe.png' } },
      '/sublime': { page: '/[theme]', query: { title: 'Sublime', repo: 'sublime', color: 'cyan', icon: 'ghost.png' } },
      '/telegram': { page: '/[theme]', query: { title: 'Telegram', repo: 'telegram', color: 'purple', icon: 'candle.png' } },
      '/terminal': { page: '/[theme]', query: { title: 'Terminal.app', repo: 'terminal-app', color: 'purple', icon: 'candle.png' } },
      '/termux': { page: '/[theme]', query: { title: 'Termux', repo: 'termux', color: 'purple', icon: 'eye.png' } },
      '/textmate': { page: '/[theme]', query: { title: 'Textmate', repo: 'textmate', color: 'cyan', icon: 'skull.png' } },
      '/textual': { page: '/[theme]', query: { title: 'Textual', repo: 'textual', color: 'orange', icon: 'glass.png' } },
      '/tilix': { page: '/[theme]', query: { title: 'Tilix', repo: 'tilix', color: 'orange', icon: 'moon.png' } },
      '/ulysses': { page: '/[theme]', query: { title: 'Ulysses', repo: 'ulysses', color: 'orange', icon: 'glass.png' } },
      '/vim': { page: '/[theme]', query: { title: 'Vim', repo: 'vim', color: 'purple', icon: 'eye.png' } },
      '/visual-studio': { page: '/[theme]', query: { title: 'Visual Studio', repo: 'visual-studio', color: 'purple', icon: 'broom.png' } },
      '/visual-studio-code': { page: '/[theme]', query: { title: 'Visual Studio Code', repo: 'visual-studio-code', color: 'purple', icon: 'tombstone.png' } },
      '/vivaldi': { page: '/[theme]', query: { title: 'Vivaldi', repo: 'vivaldi', color: 'cyan', icon: 'bat.png' } },
      '/windows-terminal': { page: '/[theme]', query: { title: 'Windows Terminal', repo: 'windows-terminal', color: 'cyan', icon: 'spider.png' } },
      '/wox': { page: '/[theme]', query: { title: 'Wox', repo: 'wox', color: 'purple', icon: 'eye.png' } },
      '/xchat': { page: '/[theme]', query: { title: 'XChat', repo: 'xchat', color: 'cyan', icon: 'bat.png' } },
      '/xcode': { page: '/[theme]', query: { title: 'Xcode', repo: 'xcode', color: 'orange', icon: 'candies.png' } },
      '/xresources': { page: '/[theme]', query: { title: 'Xresources', repo: 'xresources', color: 'orange', icon: 'cone.png' } },
      '/zsh': { page: '/[theme]', query: { title: 'Zsh', repo: 'zsh', color: 'cyan', icon: 'bat.png' } },
    };

    Object.keys(paths).map(path => {
      paths[path].query.total = Object.keys(paths).length - 2;
    });

    if (!process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
      throw 'Error: You need to define a GitHub Personal Access Token to run the site, see README for more info';
      return;
    }

    return paths;
  }
};