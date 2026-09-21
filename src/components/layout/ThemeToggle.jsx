import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "nexora-theme";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === "dark";
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const shouldBeDark = savedTheme === "dark";

    setIsDark(shouldBeDark);

    document.documentElement.classList.toggle(
      "dark",
      shouldBeDark
    );
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;

    setIsDark(newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme
    );

    localStorage.setItem(
      STORAGE_KEY,
      newTheme ? "dark" : "light"
    );
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="
        flex h-10 w-10
        items-center justify-center
        rounded-xl
        border border-slate-200
        bg-white
        text-slate-600
        transition
        hover:border-blue-200
        hover:bg-blue-50
        hover:text-blue-600
        focus-visible:outline-none
        focus-visible:ring-4
        focus-visible:ring-blue-500/20
        dark:border-slate-700
        dark:bg-slate-900
        dark:text-slate-300
        dark:hover:bg-slate-800
      "
    >
      {isDark ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}