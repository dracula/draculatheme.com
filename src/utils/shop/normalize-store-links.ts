const STORE_DOMAIN_PATTERN = /https?:\/\/store\.draculatheme\.com/gi;

export const normalizeStoreLinks = (content: string): string => {
  return content.replace(
    STORE_DOMAIN_PATTERN,
    "https://store.draculatheme.com"
  );
};

