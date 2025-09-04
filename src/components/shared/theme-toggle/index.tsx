"use client";

import { useTheme } from "@/hooks/use-theme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="action"
      aria-label="Toggle Theme"
    >
      <span className="icon">{theme === "dark" ? "☀️" : "🌙"}</span>
      {theme}
    </button>
  );
};

export default ThemeToggle;
