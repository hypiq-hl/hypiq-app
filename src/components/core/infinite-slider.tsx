"use client"

import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef } from "react"

interface InfiniteSliderProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
  vertical?: boolean
  repeat?: number
  gap?: number
  speed?: string
}

export function InfiniteSlider({
  className,
  reverse = false,
  pauseOnHover = true,
  children,
  vertical = false,
  repeat = 4,
  gap = 24,
  speed = "40s",
  ...props
}: InfiniteSliderProps) {
  return (
    <div
      {...props}
      style={{
        "--duration": speed,
        "--gap": `${gap}px`,
      } as React.CSSProperties}
      className={cn(
        "group flex overflow-hidden [gap:var(--gap)]",
        { "flex-row": !vertical, "flex-col": vertical },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              {
                "animate-marquee flex-row": !vertical,
                "animate-marquee-vertical flex-col": vertical,
                "group-hover:[animation-play-state:paused]": pauseOnHover,
                "[animation-direction:reverse]": reverse,
              },
            )}
          >
            {children}
          </div>
        ))}
    </div>
  )
}
