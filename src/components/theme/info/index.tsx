import {
  BugIcon,
  FolderDownIcon,
  GithubIcon,
  PenSquareIcon,
} from "lucide-react";
import Contributor from "../contributor";
import Link from "next/link";
import PromoBanner from "src/components/promoBanner";

const Info = ({ theme, contributors, defaultBranch }) => {
  const branch =
    typeof defaultBranch === "string" && defaultBranch ? defaultBranch : "main";

  const sourceCodeUrl = `https://github.com/dracula/${theme}`;
  const downloadZipUrl = `https://github.com/dracula/${theme}/archive/refs/heads/${branch}.zip`;
  const reportIssueUrl = `https://github.com/dracula/${theme}/issues/new`;
  const editPageUrl = `https://github.com/dracula/${theme}/edit/${branch}/README.md`;

  return (
    <div className="lx-col info-wrapper">
      <div className="info">
        <div className="item">
          <span className="title">Details</span>
          <Link href={sourceCodeUrl} target="_blank" className="inline">
            <span className="icon">
              <GithubIcon />
            </span>
            <span>View source code</span>
          </Link>
          <Link href={downloadZipUrl} target="_blank" className="inline">
            <span className="icon">
              <FolderDownIcon />
            </span>
            <span>Download ZIP file</span>
          </Link>
          <Link href={reportIssueUrl} target="_blank" className="inline">
            <span className="icon">
              <BugIcon />
            </span>
            <span>Report an issue</span>
          </Link>
          <Link href={editPageUrl} target="_blank" className="inline">
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
      <PromoBanner />
    </div>
  );
};

export default Info;
