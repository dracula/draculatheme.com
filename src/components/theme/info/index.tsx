import Contributor from "../contributor";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

const Info = ({ theme, contributors }) => (
  <div className="info">
    <div className="item">
      <span className="title">Source code</span>
      <Link
        href={`https://github.com/dracula/${theme}`}
        target="_blank"
        className="inline"
      >
        <span className="icon">
          <GithubIcon />
        </span>
        <span>View source code.</span>
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
