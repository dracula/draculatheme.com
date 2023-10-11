import Image from "next/image";
import Link from "next/link";
import { UserCircle2Icon } from "lucide-react";

const Contributor = ({ contributor }) => {
  return (
    <li>
      <Link
        href={`https://github.com/${contributor.login}`}
        target="_blank"
        className="inline"
      >
        <div className="avatar">
          {contributor.avatar_url ? (
            <Image
              src={contributor.avatar_url}
              width={24}
              height={24}
              alt={contributor.login}
            />
          ) : (
            <span className="icon">
              <UserCircle2Icon />
            </span>
          )}
        </div>
        <span>{contributor.login}</span>
      </Link>
    </li>
  );
};

export default Contributor;
