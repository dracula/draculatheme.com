"use client";

import "./index.css";

import { useTheme } from "next-themes";
import { useSound } from "use-sound";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [play] = useSound("/sounds/toggle.mp3");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={() => {
        play();
        toggleTheme();
      }}
      className="action theme-toggle"
      aria-label="Toggle Theme"
      title="Toggle Theme"
    >
      <span className="sr-only">
        {theme === "dark" ? "Switch to light" : "Switch to dark"}
      </span>
      <span className="icon">{theme === "dark" ? "☀️" : "🌙"}</span>
    </button>
  );
};
