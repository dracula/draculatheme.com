if (!process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
	throw "Error: You need to define a GitHub Personal Access Token to run the site, see README for more info";
	return;
}

const withTM = require("next-transpile-modules")(["react-github-btn"]);

module.exports = withTM({
	swcMinify: true,
});
