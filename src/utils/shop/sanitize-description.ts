export const sanitizeDescription = (htmlString: string): string => {
  let isFirstLi = true;
  let sanitized = htmlString
    .replace(/<li>/g, () => {
      if (isFirstLi) {
        isFirstLi = false;
        return "";
      }
      return ", ";
    })
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>|<p>/g, " ")
    .replace(/<\/?[^>]+(>|$)/g, "");

  sanitized = sanitized.replace(/\s\s+/g, " ").trim();

  return sanitized.length > 160
    ? `${sanitized.substring(0, 157)}...`
    : sanitized;
};
