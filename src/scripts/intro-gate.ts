// Las animaciones pesadas del inicio (nudo 3D, partículas del nombre, retrato) esperan a que
// el visitante elija una píldora, para no gastar CPU detrás del diálogo de entrada.
// Si ya había un tema guardado, el diálogo no se abre y se ejecutan de inmediato.
import { getSavedTheme } from "./theme";

export const INTRO_DONE_EVENT = "intro-done";

export function whenIntroDone(callback: () => void): void {
  if (getSavedTheme() || document.documentElement.dataset.introDone === "true") {
    callback();
    return;
  }
  window.addEventListener(INTRO_DONE_EVENT, callback, { once: true });
}

// Lo llama el diálogo de entrada cuando se cierra.
export function markIntroDone(): void {
  document.documentElement.dataset.introDone = "true";
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
}
