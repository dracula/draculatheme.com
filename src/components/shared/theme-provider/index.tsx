"use client";

import {
  createContext,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState
} from "react";

const themeStorageKey = "theme";
const defaultThemeName = "dark";
const themeNames = ["light", "dark"] as const;

const isBrowserColorScheme = (
  value: string
): value is (typeof themeNames)[number] =>
  value === "light" || value === "dark";

const applyDomTheme = (themeName: string) => {
  const root = document.documentElement;
  root.setAttribute("data-theme", themeName);
  if (isBrowserColorScheme(themeName)) {
    root.style.colorScheme = themeName;
  }
};

type ThemeContextValue = {
  theme: string | undefined;
  setTheme: (value: SetStateAction<string>) => void;
  resolvedTheme: string | undefined;
  themes: string[];
  forcedTheme?: string | undefined;
  systemTheme?: "light" | "dark" | undefined;
};

const fallbackContext: ThemeContextValue = {
  theme: undefined,
  setTheme: () => {},
  resolvedTheme: undefined,
  themes: []
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<string | undefined>(undefined);

  useLayoutEffect(() => {
    const readThemeFromStorage = () => {
      try {
        const stored = localStorage.getItem(themeStorageKey);
        return stored ?? defaultThemeName;
      } catch {
        return defaultThemeName;
      }
    };

    queueMicrotask(() => {
      setThemeState(readThemeFromStorage());
    });

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== themeStorageKey) {
        return;
      }

      const next = event.newValue === null ? defaultThemeName : event.newValue;
      setThemeState(next);
      applyDomTheme(next);
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const setTheme = useCallback((value: SetStateAction<string>) => {
    setThemeState((previous) => {
      const current = previous ?? defaultThemeName;
      const next = typeof value === "function" ? value(current) : value;
      applyDomTheme(next);
      try {
        localStorage.setItem(themeStorageKey, next);
      } catch {}
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      resolvedTheme: theme,
      themes: [...themeNames]
    }),
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  return context ?? fallbackContext;
};
