import Contributor from "../contributor";
import { GithubIcon, PenSquareIcon, FolderDownIcon, BugIcon } from "lucide-react";
import Link from "next/link";

const Info = ({ theme, contributors }) => (
  <div className="info">
    <div className="item">
      <span className="title">Details</span>
      <Link
        href={`https://github.com/dracula/${theme}`}
        target="_blank"
        className="inline"
      >
        <span className="icon">
          <GithubIcon />
        </span>
        <span>View source code</span>
      </Link>
      <Link
        href={`https://github.com/dracula/${theme}/archive/refs/heads/master.zip`}
        target="_blank"
        className="inline"
      >
        <span className="icon">
          <FolderDownIcon />
        </span>
        <span>Download ZIP file</span>
      </Link>
      <Link
        href={`https://github.com/dracula/${theme}/issues/new`}
        target="_blank"
        className="inline"
      >
        <span className="icon">
          <BugIcon />
        </span>
        <span>Report an issue</span>
      </Link>
      <Link
        href={`https://github.com/dracula/${theme}/edit/master/README.md`}
        target="_blank"
        className="inline"
      >
        <span className="icon">
          <PenSquareIcon />
        </span>
        <span>Edit this page</span>
      </Link>
    </div>
    <div className="item">
      <span className="title">Contributors</span>
      <span className="counter">{contributors.length}</span>
      <ul>
        {contributors.map((contributor, index) => (
          <Contributor key={index} contributor={contributor} />
        ))}
      </ul>
    </div>
  </div>
);

export default Info;
