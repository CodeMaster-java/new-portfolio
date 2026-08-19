import { useEffect, useRef } from 'react'

import { useIsMobile } from '@/hooks/useIsMobile'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Point = {
  x: number
  y: number
  vx: number
  vy: number
}

const POINT_COUNT = 46
const LINK_DISTANCE = 130
const MOUSE_RADIUS = 140

export const ParticleField = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile(640)
  const shouldRender = !prefersReducedMotion && !isMobile

  useEffect(() => {
    const canvas = canvasRef.current
    if (!shouldRender || !canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let points: Point[] = []
    let frameId = 0
    let isRunning = false
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      points = Array.from({ length: POINT_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }))
    }

    const step = () => {
      ctx.clearRect(0, 0, width, height)

      for (const point of points) {
        const dx = point.x - mouse.x
        const dy = point.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
          point.vx += (dx / (dist || 1)) * force * 0.02
          point.vy += (dy / (dist || 1)) * force * 0.02
        }

        point.vx *= 0.98
        point.vy *= 0.98
        point.x += point.vx
        point.y += point.vy

        if (point.x < 0 || point.x > width) point.vx *= -1
        if (point.y < 0 || point.y > height) point.vy *= -1
        point.x = Math.max(0, Math.min(width, point.x))
        point.y = Math.max(0, Math.min(height, point.y))
      }

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i]
          const b = points[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(255, 176, 32, ${0.14 * (1 - dist / LINK_DISTANCE)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const point of points) {
        ctx.fillStyle = 'rgba(89, 207, 198, 0.55)'
        ctx.beginPath()
        ctx.arc(point.x, point.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      frameId = requestAnimationFrame(step)
    }

    const start = () => {
      if (isRunning) return
      isRunning = true
      frameId = requestAnimationFrame(step)
    }

    const stop = () => {
      isRunning = false
      cancelAnimationFrame(frameId)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = event.clientX - rect.left
      mouse.y = event.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()

    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          start()
        } else {
          stop()
        }
      },
      { threshold: 0.05 },
    )
    intersectionObserver.observe(canvas)

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [shouldRender])

  if (!shouldRender) {
    return null
  }

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
