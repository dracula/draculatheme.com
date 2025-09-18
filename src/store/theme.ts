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

declare global {
  interface Window {
    __themeInit?: boolean;
    __themeMql?: MediaQueryList;
    __themeListener?: (e: MediaQueryListEvent) => void;
  }
}

const storageKey = "theme-store";

const applyThemeClass = (theme: ThemeMode) => {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
};

const detectSystemTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const readPersisted = (): { theme: ThemeMode | null; pinned: boolean } => {
  if (typeof window === "undefined") {
    return { theme: null, pinned: false };
  }

  const raw = localStorage.getItem(storageKey);

  if (!raw) {
    return { theme: null, pinned: false };
  }

  try {
    const parsed = JSON.parse(raw);
    const state = parsed?.state ?? {};
    const theme = state.currentTheme as ThemeMode | undefined;
    const pinned = Boolean(state.isUserPinned);

    return { theme: theme ?? null, pinned };
  } catch {
    return { theme: null, pinned: false };
  }
};

const boot = () => {
  if (typeof window === "undefined") {
    return;
  }

  const { theme } = readPersisted();
  const base = theme ?? detectSystemTheme();

  applyThemeClass(base);
};

boot();

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set, get) => ({
      currentTheme: readPersisted().theme ?? detectSystemTheme(),
      isUserPinned: readPersisted().pinned,
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
        if (typeof window === "undefined") {
          return;
        }

        if (window.__themeInit) {
          return;
        }

        window.__themeInit = true;

        const { theme, pinned } = readPersisted();
        const base = pinned
          ? (theme ?? detectSystemTheme())
          : detectSystemTheme();

        set({ currentTheme: base, isUserPinned: Boolean(pinned) });
        applyThemeClass(base);

        if (!window.__themeMql) {
          window.__themeMql = window.matchMedia("(prefers-color-scheme: dark)");
        }

        if (!window.__themeListener) {
          window.__themeListener = (e: MediaQueryListEvent) => {
            if (!get().isUserPinned) {
              const t: ThemeMode = e.matches ? "dark" : "light";
              set({ currentTheme: t });
              applyThemeClass(t);
            }
          };

          window.__themeMql.addEventListener("change", window.__themeListener);
        }
      }
    }),
    {
      name: storageKey,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true
    }
  )
);

if (typeof window !== "undefined" && !window.__themeInit) {
  useThemeStore.getState().initializeTheme();
}
