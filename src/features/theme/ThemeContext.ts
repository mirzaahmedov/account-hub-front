import { createContext } from "react";

type ThemeValue = "dark" | "light";

interface IThemeContext {
  theme: ThemeValue;
  setTheme: (theme: ThemeValue) => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  setTheme: () => {},
});
