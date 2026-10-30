import { useEffect, useRef, useState } from "react"

interface CustomCursorProps {
  disabled?: boolean
}

export function CustomCursor({ disabled = false }: CustomCursorProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)
  const styleElRef = useRef<HTMLStyleElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isFinePointer = window.matchMedia("(pointer: fine)").matches
    if (prefersReducedMotion || !isFinePointer || disabled) return

    setVisible(true)

    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    targetRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    outer.style.transform = `translate(${window.innerWidth / 2}px, ${window.innerHeight / 2}px)`

    // Inject global cursor styles
    const styleEl = document.createElement("style")
    styleEl.textContent = `
      @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
        * { cursor: none !important; }
        a, button, [role="button"], input, textarea, select, .project-card, .magnetic { cursor: none !important; }
      }
    `
    document.head.appendChild(styleEl)
    styleElRef.current = styleEl

    function onMouseMove(e: MouseEvent) {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    function onMouseDown() { setIsClicking(true) }
    function onMouseUp() { setIsClicking(false) }
    function onHoverEnter() { setIsHovering(true) }
    function onHoverLeave() { setIsHovering(false) }

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .project-card, .magnetic')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onHoverEnter)
      el.addEventListener("mouseleave", onHoverLeave)
    })

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)

    function animate() {
      const outer = outerRef.current
      const inner = innerRef.current
      if (!outer || !inner) return
      
      const current = position
      const target = targetRef.current
      const lerpFactor = 0.15

      const nextX = current.x + (target.x - current.x) * lerpFactor
      const nextY = current.y + (target.y - current.y) * lerpFactor

      setPosition({ x: nextX, y: nextY })
      outer.style.transform = `translate(${nextX}px, ${nextY}px)`
      inner.style.transform = `translate(${(target.x - nextX) * 0.3}px, ${(target.y - nextY) * 0.3}px) scale(${isHovering ? 1.8 : 1} ${isClicking ? 0.7 : 1})`

      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverEnter)
        el.removeEventListener("mouseleave", onHoverLeave)
      })
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (styleElRef.current) styleElRef.current.remove()
    }
  }, [disabled])

  if (!visible) return null

  return (
    <>
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      >
        <div
          ref={innerRef}
          className="w-6 h-6 rounded-full border-2 border-accent transition-all duration-200 ease-out"
          style={{
            transformOrigin: "center center",
            boxShadow: "0 0 20px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.1)",
          }}
        />
      </div>
    </>
  )
}