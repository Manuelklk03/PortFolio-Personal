// Scroll suave con Lenis; con movimiento reducido se usa el scroll nativo.
import Lenis from "lenis";

export function initLenis(): void {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    autoRaf: true,
  });

  // Si el usuario pide menos movimiento con la página abierta, vuelve el scroll nativo.
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) lenis.destroy();
  });
}
