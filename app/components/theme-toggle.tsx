"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function setDocumentTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("shiguang-theme");
    const initial: Theme =
      saved === "light" || saved === "dark" ? saved : "dark";
    setDocumentTheme(initial);
    const frame = window.requestAnimationFrame(() => setTheme(initial));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function choose(next: Theme) {
    setTheme(next);
    setDocumentTheme(next);
    window.localStorage.setItem("shiguang-theme", next);
  }

  return (
    <div className="theme-toggle" aria-label="界面主题">
      <button
        type="button"
        aria-label="浅色模式"
        aria-pressed={theme === "light"}
        onClick={() => choose("light")}
      >
        ☼
      </button>
      <button
        type="button"
        aria-label="深色模式"
        aria-pressed={theme === "dark"}
        onClick={() => choose("dark")}
      >
        ◐
      </button>
    </div>
  );
}
