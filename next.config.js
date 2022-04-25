if (!process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
  throw 'Error: You need to define a GitHub Personal Access Token to run the site, see README for more info'
}

const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['react-github-btn'])
const { withContentlayer } = require('next-contentlayer')

module.exports = withPlugins([withTM, withContentlayer], {
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/discord-invite',
        destination: 'https://discord.gg/yDcFsrYuq9',
        permanent: true,
      },
    ]
  },
})
