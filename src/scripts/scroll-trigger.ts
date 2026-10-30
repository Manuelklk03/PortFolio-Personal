// GSAP ScrollTrigger setup - solo si el usuario no pide menos movimiento
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  console.log('[scroll-trigger] Registering GSAP and ScrollTrigger')
  // Registrar GSAP globalmente
  ;(window as any).gsap = gsap
  ;(window as any).ScrollTrigger = ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)
  console.log('[scroll-trigger] Registered:', { gsap: !!(window as any).gsap, ScrollTrigger: !!(window as any).ScrollTrigger })

  // Sincronizar con Lenis si existe
  const lenis = (window as any).__lenis
  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update)
    ScrollTrigger.scrollerProxy(window, {
      scrollTop(value: number | undefined) {
        return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
    })
    ScrollTrigger.addEventListener("refresh", () => lenis.resize())
    ScrollTrigger.refresh()
  }
}

export function initScrollTrigger() {
  // Función vacía para import side-effect
}