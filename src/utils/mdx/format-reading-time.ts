export const formatReadingTime = (durationText: string) => {
  if (!durationText) return "1min";
  const match = durationText.match(/(\d+)\smin/);
  return match ? `${match[1]}min` : "1min";
};
