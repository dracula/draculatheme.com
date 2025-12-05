interface Contributor {
  login?: string;
  avatar_url?: string;
  type?: string;
}

interface ContributorWithLogin extends Contributor {
  login: string;
}

export const isBot = (contributor: Contributor): boolean => {
  if (!contributor.login) {
    return false;
  }

  return (
    contributor.type === "Bot" ||
    contributor.login.includes("[bot]") ||
    contributor.login.toLowerCase().endsWith("-bot") ||
    contributor.login === "ImgBotApp"
  );
};

export const filterBots = <T extends Contributor>(
  contributors: T[]
): T[] => {
  return contributors.filter(
    (contributor): contributor is T & ContributorWithLogin =>
      !!contributor.login && !isBot(contributor)
  );
};
