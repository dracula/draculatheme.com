export function isProd() {
  return process.env.NODE_ENV === "production";
}

export function getBasePath() {
  return isProd() ? "https://draculatheme.com" : "http://localhost:3000";
}
