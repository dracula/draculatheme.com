"use client";

import "./index.css";

import { useTheme } from "next-themes";
import { useSound } from "use-sound";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [play] = useSound("/sounds/toggle.mp3", { volume: 0.12 });

  const isDark = theme === "dark";
  const themeLabel = isDark ? "Switch to light theme" : "Switch to dark theme";

  const toggleTheme = () => {
    play();
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="action theme-toggle"
      aria-label={themeLabel}
      title={themeLabel}
    >
      <span className="sr-only">{themeLabel}</span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 1.75V3.25M12 20.75V22.25M1.75 12H3.25M20.75 12H22.25M4.75216 4.75216L5.81282 5.81282M18.1872 18.1872L19.2478 19.2478M4.75216 19.2478L5.81282 18.1872M18.1872 5.81282L19.2478 4.75216M16.25 12C16.25 14.3472 14.3472 16.25 12 16.25C9.65279 16.25 7.75 14.3472 7.75 12C7.75 9.65279 9.65279 7.75 12 7.75C14.3472 7.75 16.25 9.65279 16.25 12Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="sun"
        />
        <path
          d="M2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C16.7154 21.25 20.6068 17.7216 21.1778 13.161C20.1198 13.8498 18.8566 14.25 17.5 14.25C13.7721 14.25 10.75 11.2279 10.75 7.5C10.75 5.66012 11.4861 3.99217 12.6799 2.77461C12.4554 2.7583 12.2287 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12Z"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="moon"
        />
      </svg>
    </button>
  );
};
