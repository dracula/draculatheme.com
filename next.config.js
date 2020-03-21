require('dotenv').config();

if (!process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
  throw 'Error: You need to define a GitHub Personal Access Token to run the site, see README for more info';
  return;
}

module.exports = {
  exportTrailingSlash: true
};