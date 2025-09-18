import { create } from "zustand";

type ThemeMode = "light" | "dark";

type ThemeState = {
  currentTheme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const applyThemeClass = (theme: ThemeMode) => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
};

const readSavedTheme = (): ThemeMode | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const value = localStorage.getItem("theme");
  return value === "dark" || value === "light" ? value : null;
};

const getInitialTheme = (): ThemeMode => {
  const saved = readSavedTheme();
  return saved ?? "dark";
};

const initialTheme = getInitialTheme();

if (typeof window !== "undefined") {
  if (readSavedTheme() === null) {
    localStorage.setItem("theme", initialTheme);
  }
}

applyThemeClass(initialTheme);

export const useThemeStore = create<ThemeState>((set, get) => ({
  currentTheme: initialTheme,
  setTheme: (theme) => {
    set({ currentTheme: theme });

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }

    applyThemeClass(theme);
  },
  toggleTheme: () => {
    const next = get().currentTheme === "dark" ? "light" : "dark";
    get().setTheme(next);
  }
}));
