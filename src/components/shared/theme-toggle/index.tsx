"use client";

import { useTheme } from "@/hooks/use-theme";

export const ThemeToggle = () => {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="action"
      aria-label="Toggle Theme"
    >
      <span className="sr-only">{currentTheme}</span>
      <span className="icon">{currentTheme === "dark" ? "☀️" : "🌙"}</span>
    </button>
  );
};
