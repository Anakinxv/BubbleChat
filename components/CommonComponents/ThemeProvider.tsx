"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type Theme = {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
};

const themes: Theme[] = [
  {
    id: "light",
    name: "Light Mode",
    colors: {
      primary: "#867EFF",
      secondary: "#867EFF",
      accent: "#867EFF",
      background: "#FFFFFF",
      surface: "#FCFCFF",
      text: "#14141F",
      textSecondary: "#616B7C",
      border: "#E8E9F0",
    },
  },
  {
    id: "dark",
    name: "Dark Mode",
    colors: {
      primary: "#867EFF",
      secondary: "#867EFF",
      accent: "#867EFF",
      background: "#14141F",
      surface: "#171723",
      text: "#FFFFFF",
      textSecondary: "#616B7C",
      border: "#373B4D",
    },
  },
];

type ThemeContextType = {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
  resetTheme: () => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [mounted, setMounted] = useState(false);

  // Cargar tema del localStorage al montar
  useEffect(() => {
    const savedThemeId = localStorage.getItem("theme") || "light";
    const savedTheme = themes.find((t) => t.id === savedThemeId) || themes[0];
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
    setMounted(true);
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;

    // Aplicar clase dark si es necesario
    if (theme.id === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Aplicar variables CSS personalizadas
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
  };

  const setTheme = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      applyTheme(theme);
      // Guardar en localStorage
      localStorage.setItem("theme", themeId);
    }
  };

  const resetTheme = () => {
    setTheme("light");
  };

  return (
    <ThemeContext.Provider
      value={{ currentTheme, setTheme, themes, resetTheme, mounted }}
    >
      <div
        className="min-h-screen transition-all duration-300"
        style={{
          background: currentTheme.colors.background,
          color: currentTheme.colors.text,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
