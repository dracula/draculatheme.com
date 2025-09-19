"use client";

import "./index.css";

import { useSound } from "use-sound";

import { useThemeStore } from "@/store/theme";

export const ThemeToggle = () => {
  const currentTheme = useThemeStore((s) => s.currentTheme);
  const [play] = useSound("/sounds/toggle.mp3");

  const toggleTheme = useThemeStore((s) => s.toggleTheme);

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
        {currentTheme === "dark" ? "Switch to light" : "Switch to dark"}
      </span>
      <span className="icon">{currentTheme === "dark" ? "☀️" : "🌙"}</span>
    </button>
  );
};
