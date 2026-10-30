import { useEffect, useRef } from "react"

interface OrbitingBallsProps {
  className?: string
  count?: number
  color?: string
  size?: number
  speed?: number
}

interface Ball {
  x: number
  y: number
  angle: number
  radius: number
  baseRadius: number
  phase: number
  ballSize: number
  opacity: number
}

export function OrbitingBalls({
  className = "",
  count = 12,
  color = "#22d3ee",
  size = 4,
  speed = 0.3,
}: OrbitingBallsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const ballsRef = useRef<Ball[]>([])
  const dprRef = useRef(1)
  const rectRef = useRef<DOMRect | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    if (isMobile) return

    dprRef.current = window.devicePixelRatio || 1

    function resize() {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return

      rectRef.current = rect
      canvas.width = rect.width * dprRef.current
      canvas.height = rect.height * dprRef.current
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      // Recalcular bolas
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const maxRadius = Math.min(rect.width, rect.height) * 0.35

      ballsRef.current = Array.from({ length: count }, (_, i) => {
        const baseRadius = (maxRadius * (0.3 + Math.random() * 0.7)) / dprRef.current
        return {
          x: centerX,
          y: centerY,
          angle: (i / count) * Math.PI * 2,
          radius: baseRadius,
          baseRadius,
          phase: Math.random() * Math.PI * 2,
          ballSize: (size * (0.5 + Math.random() * 0.5)) / dprRef.current,
          opacity: 0.15 + Math.random() * 0.25,
        }
      })
    }

    function animate() {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const rect = rectRef.current
      if (!rect) return

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ballsRef.current.forEach((ball) => {
        ball.angle += (speed * 0.01) / (ball.radius / ball.baseRadius)
        ball.radius = ball.baseRadius * (0.9 + Math.sin(ball.phase + ball.angle * 2) * 0.1)

        ball.x = centerX + Math.cos(ball.angle) * ball.radius
        ball.y = centerY + Math.sin(ball.angle) * ball.radius

        ctx.beginPath()
        ctx.arc(ball.x * dprRef.current, ball.y * dprRef.current, ball.ballSize * dprRef.current, 0, Math.PI * 2)
        const alpha = Math.round(ball.opacity * 255).toString(16).padStart(2, "0")
        ctx.fillStyle = `${color}${alpha}`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [count, color, size, speed])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  )
}