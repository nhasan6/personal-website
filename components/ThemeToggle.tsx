"use client";

import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      suppressHydrationWarning
      className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:text-primary"
    >
      {isDark ? (
        <LuSun size={18} aria-hidden="true" />
      ) : (
        <LuMoon size={18} aria-hidden="true" />
      )}
    </button>
  );
}
