export function isProd() {
  return process.env.NODE_ENV === "production";
}

export function getBasePath() {
  return isProd() ? "https://draculatheme.vercel.app" : "http://localhost:3000";
}
