"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeMode = "light" | "dark";

type ThemeState = {
  currentTheme: ThemeMode;
  isUserPinned: boolean;
};

type ThemeActions = {
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  followSystemTheme: () => void;
  initializeTheme: () => void;
};

const applyThemeClass = (theme: ThemeMode) => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
};

const detectSystemTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set, get) => ({
      currentTheme: "light",
      isUserPinned: false,
      setTheme: (theme) => {
        set({ currentTheme: theme, isUserPinned: true });
        applyThemeClass(theme);
      },
      toggleTheme: () => {
        const nextTheme: ThemeMode =
          get().currentTheme === "light" ? "dark" : "light";
        get().setTheme(nextTheme);
      },
      followSystemTheme: () => {
        const systemTheme = detectSystemTheme();
        set({ currentTheme: systemTheme, isUserPinned: false });
        applyThemeClass(systemTheme);
      },
      initializeTheme: () => {
        const savedTheme = get().currentTheme;
        const isPinned = get().isUserPinned;
        const initialTheme = isPinned ? savedTheme : detectSystemTheme();

        set({ currentTheme: initialTheme });
        applyThemeClass(initialTheme);

        if (typeof window !== "undefined") {
          const mediaQueryList = window.matchMedia(
            "(prefers-color-scheme: dark)"
          );
          const handleSystemThemeChange = (event: MediaQueryListEvent) => {
            if (!get().isUserPinned) {
              const newTheme: ThemeMode = event.matches ? "dark" : "light";
              set({ currentTheme: newTheme });
              applyThemeClass(newTheme);
            }
          };

          mediaQueryList.addEventListener("change", handleSystemThemeChange);
        }
      }
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true
    }
  )
);

if (typeof window !== "undefined") {
  const { initializeTheme } = useThemeStore.getState();
  initializeTheme();
}
