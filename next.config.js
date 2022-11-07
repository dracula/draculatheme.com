if (!process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
  throw 'Error: You need to define a GitHub Personal Access Token to run the site, see README for more info'
  return
}

const withTM = require('next-transpile-modules')(['react-github-btn'])

module.exports = withTM({
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/discord-invite',
        destination: 'https://discord.gg/yDcFsrYuq9',
        permanent: true,
      },
      {
        source: '/ui',
        destination: 'https://ui.draculatheme.com',
        permanent: true,
      },
      {
        source: '/shop/dracula-sticker-pack',
        destination: 'https://draculatheme.com/shop/dracula-sticker-pack-n1',
        permanent: true,
      },
    ]
  },
})
