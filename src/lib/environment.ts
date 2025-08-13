export const isProd = () => {
  return process.env.ENVIRONMENT === "production";
};

export const getBasePath = () => {
  return isProd() ? "https://draculatheme.com" : "http://localhost:3000";
};
