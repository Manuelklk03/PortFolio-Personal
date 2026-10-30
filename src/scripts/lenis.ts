// Lenis scroll suave - solo si el usuario no pide menos movimiento
export function initLenis() {
  if (typeof window === "undefined") return

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (prefersReducedMotion) return

  // Import dinámico para no bloquear SSR
  import("lenis").then(({ default: Lenis }) => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2, // reduce efecto en táctil
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Exponer para GSAP ScrollTrigger futuro
    ;(window as any).__lenis = lenis

    // Cleanup al navegar (Astro SPA navigation no recarga la página)
    document.addEventListener("astro:after-swap", () => {
      lenis.resize()
    })

    // Listener para cambios en prefers-reduced-motion en runtime
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) lenis.destroy()
      else initLenis()
    }
    mediaQuery.addEventListener?.("change", handler)
  })
}