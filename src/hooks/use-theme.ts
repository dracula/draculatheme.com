"use client";

import { useThemeStore } from "@/store/theme";

export const useTheme = () => {
  const currentTheme = useThemeStore((state) => state.currentTheme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const followSystemTheme = useThemeStore((state) => state.followSystemTheme);

  return {
    currentTheme,
    toggleTheme,
    setTheme,
    followSystemTheme
  };
};
