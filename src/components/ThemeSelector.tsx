import { useTheme } from "@/features/theme/useTheme";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      <input
        type="checkbox"
        className="theme-controller"
        checked={theme === "dark"}
        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      />

      <SunIcon className="swap-on size-5" />
      <MoonIcon className="swap-off size-5" />
    </label>
  );
};
