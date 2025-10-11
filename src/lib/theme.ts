export function getInitialTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("orbity-theme") as
    | "dark"
    | "light"
    | null;
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}
