"use client"

import type React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
  backgroundOpacity?: number
  logoText?: string
  faded?: boolean
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  backgroundOpacity = 0.05,
  logoText = "v0",
  faded = true,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isInView, setIsInView] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  const memoizedColor = useMemo(() => {
    const toRGBA = (color: string) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`
      }
      const canvas = document.createElement("canvas")
      canvas.width = canvas.height = 1
      const ctx = canvas.getContext("2d")
      if (!ctx) return "rgba(255, 0, 0,"
      ctx.fillStyle = color
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
      return `rgba(${r}, ${g}, ${b},`
    }
    return toRGBA(color)
  }, [color])

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const cols = Math.floor(width / (squareSize + gridGap))
      const rows = Math.floor(height / (squareSize + gridGap))

      const maskCanvas = document.createElement("canvas")
      maskCanvas.width = cols
      maskCanvas.height = rows
      const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true })

      if (maskCtx) {
        maskCtx.fillStyle = "black"
        maskCtx.fillRect(0, 0, cols, rows)
        maskCtx.fillStyle = "white"

        let fontSize = Math.floor(rows * 0.4)
        maskCtx.font = `bold ${fontSize}px sans-serif`

        // Adjust font size if text exceeds 90% of the grid width
        const maxWidth = cols * 0.9
        const maxHeight = rows * 0.8
        let textMetrics = maskCtx.measureText(logoText)

        while (textMetrics.width > maxWidth || fontSize > maxHeight) {
          fontSize -= 1
          if (fontSize <= 8) break // Minimum font size
          maskCtx.font = `bold ${fontSize}px sans-serif`
          textMetrics = maskCtx.measureText(logoText)
        }

        maskCtx.textAlign = "center"
        maskCtx.textBaseline = "middle"
        maskCtx.fillText(logoText, cols / 2, rows / 2)
      }

      const maskData = maskCtx?.getImageData(0, 0, cols, rows).data
      const squares = new Float32Array(cols * rows)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = i * rows + j
          const maskIdx = (j * cols + i) * 4
          const isMasked = maskData ? maskData[maskIdx] > 128 : false
          squares[idx] = isMasked ? Math.random() * maxOpacity : Math.random() * backgroundOpacity
        }
      }

      return { cols, rows, squares, dpr, maskData }
    },
    [squareSize, gridGap, maxOpacity, backgroundOpacity, logoText],
  )

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number, cols: number, rows: number, maskData?: Uint8ClampedArray) => {
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = i * rows + j
          const maskIdx = (j * cols + i) * 4
          const isMasked = maskData ? maskData[maskIdx] > 128 : false

          if (Math.random() < flickerChance * deltaTime) {
            squares[idx] = isMasked ? Math.random() * (maxOpacity - 0.1) + 0.1 : Math.random() * backgroundOpacity
          }
        }
      }
    },
    [flickerChance, maxOpacity, backgroundOpacity],
  )

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "transparent"
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j]
          if (opacity < 0.01) continue

          ctx.fillStyle = `${memoizedColor}${opacity})`
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr,
          )
        }
      }
    },
    [memoizedColor, squareSize, gridGap],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let gridParams: ReturnType<typeof setupCanvas>

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth
      const newHeight = height || container.clientHeight
      setCanvasSize({ width: newWidth, height: newHeight })
      gridParams = setupCanvas(canvas, newWidth, newHeight)
    }

    updateCanvasSize()

    let lastTime = 0
    const animate = (time: number) => {
      if (!isInView) return

      const deltaTime = (time - lastTime) / 1000
      lastTime = time

      updateSquares(gridParams.squares, deltaTime, gridParams.cols, gridParams.rows, gridParams.maskData)
      drawGrid(ctx, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr)
      animationFrameId = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
    })

    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0 },
    )

    intersectionObserver.observe(canvas)

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView])

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      style={{
        maskImage: faded ? `linear-gradient(to bottom, transparent, black 25%, black 85%, transparent)` : undefined,
        WebkitMaskImage: faded
          ? `linear-gradient(to bottom, transparent, black 25%, black 85%, transparent)`
          : undefined,
      }}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  )
}
