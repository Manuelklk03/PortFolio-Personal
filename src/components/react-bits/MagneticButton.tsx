import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"
import { Button } from "@/components/ui/button"

interface MagneticButtonProps extends Omit<ButtonProps, "asChild"> {
  children: React.ReactNode
  strength?: number
  asChild?: boolean
}

export function MagneticButton({
  children,
  strength = 0.3,
  asChild = false,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const boundsRef = useRef<DOMRect | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isFinePointer = window.matchMedia("(pointer: fine)").matches
    if (prefersReducedMotion || !isFinePointer) return

    const el = ref.current
    if (!el) return

    function onMouseMove(e: MouseEvent) {
      if (!boundsRef.current) return
      const x = e.clientX - boundsRef.current.left - boundsRef.current.width / 2
      const y = e.clientY - boundsRef.current.top - boundsRef.current.height / 2
      setMousePos({ x, y })
    }

    function onMouseEnter() {
      const element = ref.current
      if (!element) return
      boundsRef.current = element.getBoundingClientRect()
      element.addEventListener("mousemove", onMouseMove)
    }

    function onMouseLeave() {
      const element = ref.current
      if (!element) return
      element.removeEventListener("mousemove", onMouseMove)
      gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" })
    }

    function onResize() {
      const element = ref.current
      if (!element) return
      boundsRef.current = element.getBoundingClientRect()
    }

    const element = ref.current
    if (!element) return
    
    element.addEventListener("mouseenter", onMouseEnter)
    element.addEventListener("mouseleave", onMouseLeave)
    window.addEventListener("resize", onResize)
    boundsRef.current = element.getBoundingClientRect()

    function animate() {
      if (Math.abs(mousePos.x) > 0.1 || Math.abs(mousePos.y) > 0.1) {
        gsap.set(el, { x: mousePos.x * strength, y: mousePos.y * strength })
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      el.removeEventListener("mouseenter", onMouseEnter)
      el.removeEventListener("mouseleave", onMouseLeave)
      window.removeEventListener("resize", onResize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [strength])

  return (
    <Button
      ref={ref}
      asChild={asChild}
      className={cn("relative overflow-visible", className)}
      {...props}
    >
      {children}
    </Button>
  )
}