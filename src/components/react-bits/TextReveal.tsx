import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const element = containerRef.current
      if (!element) return

      // Dividir texto en spans por carácter
      const chars = text.split("").map((char) => {
        const span = document.createElement("span")
        span.textContent = char === " " ? "\u00A0" : char
        span.style.display = "inline-block"
        span.style.opacity = "0"
        span.style.transform = "translateY(1.2em) rotateX(-90deg)"
        span.style.transformOrigin = "center bottom"
        return span
      })

      element.innerHTML = ""
      chars.forEach((span) => element.appendChild(span))

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
      })
    }, containerRef)

    return () => ctx.revert()
  }, [text, delay, duration, stagger])

  return <div ref={containerRef} className={className} aria-label={text} />
}