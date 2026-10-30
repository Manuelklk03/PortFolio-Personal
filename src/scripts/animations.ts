// Animaciones GSAP para componentes Astro (HTML estático)
// Se usa en <script> de cada sección .astro

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)

  // Sincronizar con Lenis
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

/**
 * Animación de entrada fade-up con stagger
 * @param scope - Elemento contenedor (section, article, etc.)
 * @param selector - Selector de los elementos a animar (ej: ".animate-fade-up")
 */
export function animateFadeUp(scope: Element | string, selector = ".animate-fade-up") {
  const container = typeof scope === "string" ? document.querySelector(scope) : scope
  if (!container) return

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (prefersReducedMotion) {
    container.querySelectorAll(selector).forEach((el) => {
      ;(el as HTMLElement).style.opacity = "1"
      ;(el as HTMLElement).style.transform = "none"
    })
    return
  }

  gsap.from(selector, {
    scrollTrigger: {
      trigger: container,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.1,
    immediateRender: false,
  })
}

/**
 * Animación para tarjetas de proyectos (stagger horizontal)
 */
export function animateProjectCards(scope: Element | string) {
  const container = typeof scope === "string" ? document.querySelector(scope) : scope
  if (!container) return

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (prefersReducedMotion) {
    container.querySelectorAll(".project-card").forEach((el) => {
      ;(el as HTMLElement).style.opacity = "1"
      ;(el as HTMLElement).style.transform = "none"
    })
    return
  }

  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: container,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.08,
    immediateRender: false,
  })
}

/**
 * Animación hero (título, descripción, CTAs)
 */
export function animateHero(scope: Element | string) {
  const container = typeof scope === "string" ? document.querySelector(scope) : scope
  if (!container) return

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (prefersReducedMotion) {
    container.querySelectorAll(".hero-element").forEach((el) => {
      ;(el as HTMLElement).style.opacity = "1"
      ;(el as HTMLElement).style.transform = "none"
    })
    return
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  })

  tl.from(".hero-element", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.1,
    immediateRender: false,
  })
}