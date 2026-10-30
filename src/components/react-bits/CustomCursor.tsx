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
  const positionRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)
  const styleElRef = useRef<HTMLStyleElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isFinePointer = window.matchMedia("(pointer: fine)").matches
    if (prefersReducedMotion || !isFinePointer || disabled) return

    setVisible(true)

    // Esperar a que refs estén listos
    const waitForRefs = () => {
      const outer = outerRef.current
      const inner = innerRef.current
      if (!outer || !inner) {
        requestAnimationFrame(waitForRefs)
        return
      }
      setupCursor(outer)
    }
    requestAnimationFrame(waitForRefs)

    function setupCursor(outer: HTMLDivElement) {
      targetRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      positionRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
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
        const o = outerRef.current
        const i = innerRef.current
        if (!o || !i) {
          animationRef.current = requestAnimationFrame(animate)
          return
        }
        
        const current = positionRef.current
        const target = targetRef.current
        const lerpFactor = 0.15

        const nextX = current.x + (target.x - current.x) * lerpFactor
        const nextY = current.y + (target.y - current.y) * lerpFactor

        positionRef.current = { x: nextX, y: nextY }
        o.style.transform = `translate(${nextX}px, ${nextY}px)`
        i.style.transform = `translate(${(target.x - nextX) * 0.3}px, ${(target.y - nextY) * 0.3}px) scale(${isHovering ? 1.8 : 1} ${isClicking ? 0.7 : 1})`

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
    }
  }, [disabled])

  if (!visible) return null

  return (
    <>
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
        aria-hidden="true"
      >
        <div
          ref={innerRef}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid #22d3ee',
            transformOrigin: 'center center',
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.1)',
            transition: 'transform 0.2s ease-out',
            backgroundColor: 'rgba(34, 211, 238, 0.1)',
          }}
        />
      </div>
    </>
  )
}