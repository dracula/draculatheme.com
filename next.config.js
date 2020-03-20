require('dotenv').config();

module.exports = {
  exportTrailingSlash: true,
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/', query: { title: 'Dracula', color: 'purple', icon: 'pack-1/045-dracula.svg' } },
      '/about': { page: '/about', query: { title: 'About Dracula', color: 'cyan', icon: 'pack-1/045-dracula.svg' } },
      '/pro': { page: '/pro', query: {} },
      '/adobe': { page: '/[theme]', query: { title: 'Adobe', repo: 'adobe', color: 'pink', icon: 'pack-6/039-zombie.svg', platform: ['mac', 'windows'] } },
      '/alacritty': { page: '/[theme]', query: { title: 'Alacritty', repo: 'alacritty', color: 'orange', icon: 'pack-1/006-night.svg', platform: ['all'] } },
      '/alfred': { page: '/[theme]', query: { title: 'Alfred', repo: 'alfred', color: 'purple', icon: 'pack-5/019-wizard hat.svg', platform: ['mac'] } },
      '/arduino-ide': { page: '/[theme]', query: { title: 'Arduino IDE', repo: 'arduino-ide', color: 'cyan', icon: 'pack-1/001-gallows.svg', platform: ['all'] } },
      '/atom': { page: '/[theme]', query: { title: 'Atom', repo: 'atom', color: 'purple', icon: 'pack-1/005-potion.svg', platform: ['all'] } },
      '/base16': { page: '/[theme]', query: { title: 'Base16', repo: 'base16-dracula-scheme', color: 'orange', icon: 'pack-1/033-black-cat.svg', platform: ['all'] } },
      '/bbedit': { page: '/[theme]', query: { title: 'BBEdit', repo: 'bbedit', color: 'cyan', icon: 'pack-4/041-cyclops.svg', platform: ['mac'] } },
      '/bear': { page: '/[theme]', query: { title: 'Bear', repo: 'bear', color: 'orange', icon: 'pack-1/008-tree.svg', platform: ['mac'] } },
      '/blender': { page: '/[theme]', query: { title: 'Blender', repo: 'blender', color: 'pink', icon: 'pack-2/029-bomb.svg', platform: ['all'] } },
      '/brackets': { page: '/[theme]', query: { title: 'Brackets', repo: 'brackets', color: 'cyan', icon: 'pack-1/014-voodoo-doll.svg', platform: ['all'] } },
      '/chrome': { page: '/[theme]', query: { title: 'Chrome', repo: 'google-chrome', color: 'orange', icon: 'pack-4/042-hydra.svg', platform: ['all'] } },
      '/cmder': { page: '/[theme]', query: { title: 'Cmder', repo: 'cmder', color: 'pink', icon: 'pack-1/010-trident.svg', platform: ['windows'] } },
      '/coda': { page: '/[theme]', query: { title: 'Coda', repo: 'coda', color: 'pink', icon: 'pack-1/013-lollipop.svg', platform: ['mac'] } },
      '/conemu': { page: '/[theme]', query: { title: 'ConEmu', repo: 'conemu', color: 'orange', icon: 'pack-1/025-candle-1.svg', platform: ['windows'] } },
      '/coteditor': { page: '/[theme]', query: { title: 'CotEditor', repo: 'coteditor', color: 'cyan', icon: 'pack-1/026-mummy.svg', platform: ['mac'] } },
      '/couscous': { page: '/[theme]', query: { title: 'Couscous', repo: 'couscous', color: 'cyan', icon: 'pack-1/024-tombstone-1.svg', platform: ['all'] } },
      '/duckduckgo': { page: '/[theme]', query: { title: 'DuckDuckGo', repo: 'duckduckgo', color: 'pink', icon: 'pack-1/019-spider.svg', platform: ['all'] } },
      '/editplus': { page: '/[theme]', query: { title: 'Editplus', repo: 'editplus', color: 'purple', icon: 'pack-1/023-bones.svg', platform: ['windows'] } },
      '/emacs': { page: '/[theme]', query: { title: 'Emacs', repo: 'emacs', color: 'pink', icon: 'pack-1/018-devil.svg', platform: ['all'] } },
      '/facebook-messenger': { page: '/[theme]', query: { title: 'Facebook Messenger', repo: 'fb-messenger', color: 'cyan', icon: 'pack-3/030-moon.svg', platform: ['all'] } },
      '/figma': { page: '/[theme]', query: { title: 'Figma', repo: 'figma', color: 'orange', icon: 'pack-1/015-makeup.svg', platform: ['all'] } },
      '/firefox': { page: '/[theme]', query: { title: 'Firefox', repo: 'firefox', color: 'purple', icon: 'pack-1/028-finger.svg', platform: ['all'] } },
      '/fish': { page: '/[theme]', query: { title: 'Fish', repo: 'fish', color: 'orange', icon: 'pack-1/011-poison.svg', platform: ['all'] } },
      '/fluent-terminal': { page: '/[theme]', query: { title: 'Fluent Terminal', repo: 'fluent-terminal', color: 'cyan', icon: 'pack-1/034-eye.svg', platform: ['windows'] } },
      '/gamemaker-studio': { page: '/[theme]', query: { title: 'GameMaker Studio', repo: 'gamemaker-studio', color: 'cyan', icon: 'pack-1/031-serial-killer.svg', platform: ['all'] } },
      '/geany': { page: '/[theme]', query: { title: 'Geany', repo: 'geany', color: 'orange', icon: 'pack-3/009-crystal-ball.svg', platform: ['all'] } },
      '/gedit': { page: '/[theme]', query: { title: 'Gedit', repo: 'gedit', color: 'purple', icon: 'pack-1/029-werewolf.svg', platform: ['all'] } },
      '/github-pages': { page: '/[theme]', query: { title: 'GitHub Pages', repo: 'gh-pages', color: 'cyan', icon: 'pack-1/037-candies.svg', platform: ['all'] } },
      '/gitk': { page: '/[theme]', query: { title: 'Gitk', repo: 'gitk', color: 'purple', icon: 'pack-5/020-saw.svg', platform: ['all'] } },
      '/gmk': { page: '/[theme]', query: { title: 'GMK', repo: 'gmk', color: 'orange', icon: 'pack-5/012-spell book.svg', platform: ['all'] } },
      '/gnome-terminal': { page: '/[theme]', query: { title: 'Gnome Terminal', repo: 'gnome-terminal', color: 'orange', icon: 'pack-1/042-candle.svg', platform: ['linux'] } },
      '/highlightjs': { page: '/[theme]', query: { title: 'Highlight.js', repo: 'highlightjs', color: 'cyan', icon: 'pack-1/044-spider-web.svg', platform: ['all'] } },
      '/hyper': { page: '/[theme]', query: { title: 'Hyper', repo: 'hyper', color: 'purple', icon: 'pack-3/048-unicorn.svg', platform: ['all'] } },
      '/i3': { page: '/[theme]', query: { title: 'i3', repo: 'i3', color: 'orange', icon: 'pack-1/016-candies-1.svg', platform: ['linux'] } },
      '/insomnia': { page: '/[theme]', query: { title: 'Insomnia', repo: 'insomnia', color: 'cyan', icon: 'pack-1/043-scythe.svg', platform: ['all'] } },
      '/iterm': { page: '/[theme]', query: { title: 'iTerm', repo: 'iterm', color: 'purple', icon: 'pack-1/030-clown.svg', platform: ['mac'] } },
      '/jetbrains': { page: '/[theme]', query: { title: 'JetBrains', repo: 'jetbrains', color: 'pink', icon: 'pack-1/046-zombie.svg', platform: ['all'] } },
      '/jgrasp': { page: '/[theme]', query: { title: 'jGrasp', repo: 'jgrasp', color: 'orange', icon: 'pack-1/007-guillotine.svg', platform: ['all'] } },
      '/jupyterlab': { page: '/[theme]', query: { title: 'JupyterLab', repo: 'jupyterlab', color: 'purple', icon: 'pack-6/012-candles.svg', platform: ['all'] } },
      '/kate': { page: '/[theme]', query: { title: 'Kate', repo: 'kate', color: 'orange', icon: 'pack-5/039-flask.svg', platform: ['all'] } },
      '/kitty': { page: '/[theme]', query: { title: 'Kitty', repo: 'kitty', color: 'cyan', icon: 'pack-4/044-werewolf.svg', platform: ['all'] } },
      '/konsole': { page: '/[theme]', query: { title: 'Konsole', repo: 'konsole', color: 'orange', icon: 'pack-1/049-bats.svg', platform: ['linux'] } },
      '/light-table': { page: '/[theme]', query: { title: 'Light Table', repo: 'light-table', color: 'orange', icon: 'pack-1/050-pumpkin.svg', platform: ['all'] } },
      '/lightpaper': { page: '/[theme]', query: { title: 'LightPaper', repo: 'lightpaper', color: 'purple', icon: 'pack-5/030-voodoo.svg', platform: ['mac'] } },
      '/limechat': { page: '/[theme]', query: { title: 'LimeChat', repo: 'limechat', color: 'purple', icon: 'pack-3/016-fire.svg', platform: ['mac'] } },
      '/macdown': { page: '/[theme]', query: { title: 'MacDown', repo: 'macdown', color: 'cyan', icon: 'pack-1/047-cleaver.svg', platform: ['mac'] } },
      '/mattermost': { page: '/[theme]', query: { title: 'Mattermost', repo: 'mattermost', color: 'orange', icon: 'pack-1/002-coffin.svg', platform: ['all'] } },
      '/mindnode': { page: '/[theme]', query: { title: 'MindNode', repo: 'mindnode', color: 'purple', icon: 'pack-5/008-wizard.svg', platform: ['mac'] } },
      '/mintty': { page: '/[theme]', query: { title: 'Mintty', repo: 'mintty', color: 'orange', icon: 'pack-4/043-minotaur.svg', platform: ['windows'] } },
      '/mobaxterm': { page: '/[theme]', query: { title: 'MobaXterm', repo: 'mobaxterm', color: 'cyan', icon: 'pack-3/042-skull.svg', platform: ['windows'] } },
      '/monodevelop': { page: '/[theme]', query: { title: 'MonoDevelop', repo: 'monodevelop', color: 'pink', icon: 'pack-1/027-hand.svg', platform: ['all'] } },
      '/mutt': { page: '/[theme]', query: { title: 'Mutt', repo: 'mutt', color: 'purple', icon: 'pack-3/045-tree.svg', platform: ['all'] } },
      '/notepad-plus-plus': { page: '/[theme]', query: { title: 'Notepad++', repo: 'notepad-plus-plus', color: 'orange', icon: 'pack-1/048-frankenstein.svg', platform: ['windows'] } },
      '/nylas-n1': { page: '/[theme]', query: { title: 'Nylas N1', repo: 'nylas-n1', color: 'cyan', icon: 'pack-1/032-bat.svg', platform: ['all'] } },
      '/oracle-sql-developer': { page: '/[theme]', query: { title: 'Oracle SQL Developer', repo: 'oracle-sql-developer', color: 'cyan', icon: 'pack-1/036-spellbook.svg', platform: ['all'] } },
      '/powershell': { page: '/[theme]', query: { title: 'PowerShell', repo: 'powershell', color: 'purple', icon: 'pack-5/046-magic trick.svg', platform: ['all'] } },
      '/pygments': { page: '/[theme]', query: { title: 'Pygments', repo: 'pygments', color: 'orange', icon: 'pack-3/027-magician-hat-1.svg', platform: ['all'] } },
      '/pythonista': { page: '/[theme]', query: { title: 'Pythonista', repo: 'pythonista', color: 'purple', icon: 'pack-6/048-grave.svg', platform: ['mac'] } },
      '/qtcreator': { page: '/[theme]', query: { title: 'Qt Creator', repo: 'qtcreator', color: 'orange', icon: 'pack-3/043-snake.svg', platform: ['all'] } },
      '/quassel': { page: '/[theme]', query: { title: 'Quassel', repo: 'quassel', color: 'cyan', icon: 'pack-4/046-evil.svg', platform: ['all'] } },
      '/quiver': { page: '/[theme]', query: { title: 'Quiver', repo: 'quiver', color: 'orange', icon: 'pack-5/041-guillotine.svg', platform: ['mac'] } },
      '/qutebrowser': { page: '/[theme]', query: { title: 'Qutebrowser', repo: 'qutebrowser', color: 'purple', icon: 'pack-5/015-box.svg', platform: ['all'] } },
      '/react-devtools': { page: '/[theme]', query: { title: 'React DevTools', repo: 'react-devtools', color: 'cyan', icon: 'pack-3/005-candle.svg', platform: ['all'] } },
      '/sequel-pro': { page: '/[theme]', query: { title: 'Sequel Pro', repo: 'sequel-pro', color: 'orange', icon: 'pack-4/016-axe.svg', platform: ['mac'] } },
      '/sketch': { page: '/[theme]', query: { title: 'Sketch', repo: 'sketch', color: 'cyan', icon: 'pack-3/025-magic-wand-1.svg', platform: ['all'] } },
      '/slack': { page: '/[theme]', query: { title: 'Slack', repo: 'slack', color: 'purple', icon: 'pack-6/030-graveyard.svg', platform: ['all'] } },
      '/steam': { page: '/[theme]', query: { title: 'Steam', repo: 'steam', color: 'purple', icon: 'pack-5/049-target.svg', platform: ['all'] } },
      '/sublime': { page: '/[theme]', query: { title: 'Sublime', repo: 'sublime', color: 'cyan', icon: 'pack-2/046-ghost.svg', platform: ['all'] } },
      '/telegram': { page: '/[theme]', query: { title: 'Telegram', repo: 'telegram', color: 'orange', icon: 'pack-6/002-grave.svg', platform: ['all'] } },
      '/telegram-android': { page: '/[theme]', query: { title: 'Telegram Android', repo: 'telegram-android', color: 'orange', icon: 'pack-6/038-skull.svg', platform: ['all'] } },
      '/terminal': { page: '/[theme]', query: { title: 'Terminal.app', repo: 'terminal-app', color: 'purple', icon: 'pack-5/047-mortar.svg', platform: ['mac'] } },
      '/termite': { page: '/[theme]', query: { title: 'Termite', repo: 'termite', color: 'cyan', icon: 'pack-3/037-voodoo-doll.svg', platform: ['linux'] } },
      '/termux': { page: '/[theme]', query: { title: 'Termux', repo: 'termux', color: 'purple', icon: 'pack-3/002-spellbook.svg', platform: ['all'] } },
      '/textmate': { page: '/[theme]', query: { title: 'Textmate', repo: 'textmate', color: 'cyan', icon: 'pack-1/038-tombstone.svg', platform: ['mac'] } },
      '/textual': { page: '/[theme]', query: { title: 'Textual', repo: 'textual', color: 'orange', icon: 'pack-5/045-hourglass.svg', platform: ['mac'] } },
      '/tilix': { page: '/[theme]', query: { title: 'Tilix', repo: 'tilix', color: 'cyan', icon: 'pack-1/039-ghost.svg', platform: ['linux'] } },
      '/typora': { page: '/[theme]', query: { title: 'Typora', repo: 'typora', color: 'purple', icon: 'pack-1/017-witch-1.svg', platform: ['all'] } },
      '/ulauncher': { page: '/[theme]', query: { title: 'Ulauncher', repo: 'ulauncher', color: 'orange', icon: 'pack-3/034-pot.svg', platform: ['linux'] } },
      '/ulysses': { page: '/[theme]', query: { title: 'Ulysses', repo: 'ulysses', color: 'orange', icon: 'pack-5/033-smoke.svg', platform: ['mac'] } },
      '/vim': { page: '/[theme]', query: { title: 'Vim', repo: 'vim', color: 'purple', icon: 'pack-1/040-zombie-1.svg', platform: ['all'] } },
      '/vimium': { page: '/[theme]', query: { title: 'Vimium', repo: 'vimium', color: 'purple', icon: 'pack-3/019-lantern.svg', platform: ['all'] } },
      '/visual-studio': { page: '/[theme]', query: { title: 'Visual Studio', repo: 'visual-studio', color: 'orange', icon: 'pack-3/035-potion-1.svg', platform: ['all'] } },
      '/visual-studio-code': { page: '/[theme]', query: { title: 'Visual Studio Code', repo: 'visual-studio-code', color: 'purple', icon: 'pack-1/041-skeleton.svg', platform: ['all'] } },
      '/vivaldi': { page: '/[theme]', query: { title: 'Vivaldi', repo: 'vivaldi', color: 'cyan', icon: 'pack-1/003-broom.svg', platform: ['all'] } },
      '/windows-terminal': { page: '/[theme]', query: { title: 'Windows Terminal', repo: 'windows-terminal', color: 'purple', icon: 'pack-3/047-tube.svg', platform: ['windows'] } },
      '/wing': { page: '/[theme]', query: { title: 'Wing', repo: 'wing', color: 'cyan', icon: 'pack-5/024-cauldron.svg', platform: ['all'] } },
      '/wordpress': { page: '/[theme]', query: { title: 'Wordpress', repo: 'wordpress', color: 'purple', icon: 'pack-5/004-tarot.svg', platform: ['all'] } },
      '/wox': { page: '/[theme]', query: { title: 'Wox', repo: 'wox', color: 'cyan', icon: 'pack-5/003-crystal ball.svg', platform: ['windows'] } },
      '/xchat': { page: '/[theme]', query: { title: 'XChat', repo: 'xchat', color: 'orange', icon: 'pack-6/001-coffin.svg', platform: ['linux', 'windows'] } },
      '/xcode': { page: '/[theme]', query: { title: 'Xcode', repo: 'xcode', color: 'pink', icon: 'pack-6/004-reaper.svg', platform: ['mac'] } },
      '/xresources': { page: '/[theme]', query: { title: 'Xresources', repo: 'xresources', color: 'purple', icon: 'pack-1/035-cauldron.svg', platform: ['all'] } },
      '/zsh': { page: '/[theme]', query: { title: 'Zsh', repo: 'zsh', color: 'orange', icon: 'pack-6/042-corpse.svg', platform: ['all'] } },
    };

    Object.keys(paths).map(path => {
      if (path === '/') {
        paths[path].query.paths = JSON.stringify(paths);
      }

      paths[path].query.total = Object.keys(paths).length - 3;
    });

    if (!process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
      throw 'Error: You need to define a GitHub Personal Access Token to run the site, see README for more info';
      return;
    }

    return paths;
  }
};