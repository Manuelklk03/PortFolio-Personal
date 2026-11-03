// Gestión centralizada de temas: Píldora Roja (Matrix Phosphor) vs Píldora Azul (Abyss + Jade).

export type Theme = "matrix" | "abyss";

export const THEME_KEY = "portfolio-theme";

export function getSavedTheme(): Theme {
  if (typeof window === "undefined") return "abyss";
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "matrix" || saved === "abyss") return saved;
  return "abyss";
}

export function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") return;

  if (theme === "matrix") {
    document.documentElement.dataset.theme = "matrix";
  } else {
    // abyss es el tema base por defecto
    delete document.documentElement.dataset.theme;
  }

  localStorage.setItem(THEME_KEY, theme);
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

export function openPillModal(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("open-matrix-pill"));
}

