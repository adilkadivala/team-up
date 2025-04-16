"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"

export function HeroBackground() {
  const { resolvedTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isDark = resolvedTheme === "dark"

    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw grid lines
      drawGrid(ctx, width, height, isDark)

      // Draw glow
      drawGlow(ctx, width, height, isDark)
    }

    // Draw grid lines
    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, isDark: boolean) => {
      const lineColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
      const spacing = 30

      ctx.strokeStyle = lineColor
      ctx.lineWidth = 1

      // Horizontal lines
      for (let y = 0; y < height; y += spacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Vertical lines
      for (let x = 0; x < width; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
    }

    // Draw glow effect
    const drawGlow = (ctx: CanvasRenderingContext2D, width: number, height: number, isDark: boolean) => {
      const centerX = width / 2
      const centerY = height / 3
      const radius = Math.min(width, height) * 0.4

      // Create radial gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)

      if (isDark) {
        gradient.addColorStop(0, "rgba(124, 58, 237, 0.3)") // Purple in dark mode
        gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.1)")
        gradient.addColorStop(1, "rgba(124, 58, 237, 0)")
      } else {
        gradient.addColorStop(0, "rgba(124, 58, 237, 0.15)") // Lighter purple in light mode
        gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.05)")
        gradient.addColorStop(1, "rgba(124, 58, 237, 0)")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    }

    // Initial resize
    resizeCanvas()

    // Add resize event listener
    window.addEventListener("resize", resizeCanvas)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [resolvedTheme])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} />
}
