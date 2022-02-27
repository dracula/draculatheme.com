function ThemeDetails({ repo, stars, lastCommit, pullRequests, openIssues }) {
  return (
    <div>
      <h3>Theme details</h3>
      <div className="text">
        <p>See below for details on this specific theme.</p>
        <p>
          If you have any questions, the best place to ask or seek help is here;
          you can create an issue, for example, and the project maintainer will
          help you!
        </p>
      </div>
      <ul>
        <li>
          <span>📌 </span>
          <a
            href={`https://github.com/dracula/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code on GitHub
          </a>
        </li>
        <li>
          <span>⭐ Number of stars: </span>
          <span>{stars}</span>
        </li>
        <li>
          <span>⌚ Last Commit: </span>
          <span>{lastCommit}</span>
        </li>
        <li>
          <span>✅ Pull Requests: </span>
          <span>{pullRequests}</span>
        </li>
        <li>
          <span>⚠️ Open Issues: </span>
          <span>{openIssues}</span>
        </li>
      </ul>
    </div>
  )
}

export default ThemeDetails
