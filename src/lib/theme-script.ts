const setInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  const system = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  document.documentElement.className = saved || system;
};

export const themeScript = `(${setInitialTheme})();`;
