"use client";

import { useEffect, useState } from "react";
import { getInitialTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setMode(getInitialTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.toggle("light", mode === "light");
    window.localStorage.setItem("orbity-theme", mode);
  }, [mode, mounted]);

  if (!mounted) return null;

  return (
    <button
      className="btn"
      onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
      title="Toggle theme"
      aria-pressed={mode === "light"}
    >
      {mode === "dark" ? "🌙" : "☀️"} Theme
    </button>
  );
}
