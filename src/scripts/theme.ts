// Gestión centralizada de temas: Píldora Roja (Matrix Phosphor) vs Píldora Azul (Abyss + Jade).
// Hasta que el visitante elige, la web se ve en un modo neutro sin color ("neutral").

export type Theme = "matrix" | "abyss";

export const THEME_KEY = "portfolio-theme";

// Tema elegido, o null si todavía no se ha tomado ninguna píldora.
export function getSavedTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "matrix" || saved === "abyss" ? saved : null;
  } catch {
    return null;
  }
}

export function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") return;

  if (theme === "matrix") {
    document.documentElement.dataset.theme = "matrix";
  } else {
    // Abyss es el tema base: sin atributo.
    delete document.documentElement.dataset.theme;
  }

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Sin almacenamiento (modo privado): el tema dura solo esta visita.
  }
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

export function openPillModal(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("open-matrix-pill"));
}
