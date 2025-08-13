export const isProd = () => {
  return process.env.NODE_ENV === "production";
};

export const getBasePath = () => {
  return isProd() ? "https://draculatheme.com" : "http://localhost:3000";
};
