"use client";

import "./index.scss";
import * as Avatar from "@radix-ui/react-avatar";
import Link from "next/link";

const AvatarItem = ({ url, name, src }) => (
  <Link href={url} target="_blank" className="inline" title={`@${name}`}>
    <Avatar.Root className="avatar-root">
      <Avatar.Image className="pic" src={src} alt={name} />
      <Avatar.Fallback className="fallback" delayMs={600}>
        {name.slice(0, 2).toUpperCase()}
      </Avatar.Fallback>
    </Avatar.Root>
  </Link>
);

const OurCommunity = ({ contributorsList }) => {
  if (contributorsList.length === 0) {
    return (
      <div id="our-community" role="region" aria-labelledby="community-heading">
        <h3 id="community-heading">Our Community!</h3>
        <div className="text">
          <p>
            Unfortunately, we can&apos;t find the contributors at this moment.
            Please check back later. 🌙
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="our-community" role="region" aria-labelledby="community-heading">
      <h3 id="community-heading">
        Join over {contributorsList.length} contributors
      </h3>
      <div className="text">
        <p>
          Whether you&apos;re maintaining a port, contributing via a pull
          request, or reporting an issue, the community is the heart and soul of
          the Dracula Theme.
        </p>
      </div>
      <ul id="contributors-list">
        {contributorsList.map((contributor) => (
          <li key={contributor.login}>
            <AvatarItem
              url={`https://github.com/${contributor.login}`}
              name={contributor.login}
              src={contributor.avatar_url}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OurCommunity;
