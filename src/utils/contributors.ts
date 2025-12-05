interface Contributor {
  login: string;
  avatar_url?: string;
  type?: string;
}

export const isBot = (contributor: Contributor): boolean => {
  return (
    contributor.type === "Bot" ||
    contributor.login.includes("[bot]") ||
    contributor.login.toLowerCase().endsWith("-bot") ||
    contributor.login === "ImgBotApp"
  );
};

export const filterBots = <T extends Contributor>(contributors: T[]): T[] => {
  return contributors.filter((contributor) => !isBot(contributor));
};
