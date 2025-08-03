import React from 'react'
import { cn } from '@/lib/utils'

interface HypiqLogoProps {
  className?: string
  size?: number
}

export const HypiqLogo: React.FC<HypiqLogoProps> = ({ 
  className, 
  size = 24 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      {/* Whale body with stripes */}
      <g>
        {/* Main whale outline */}
        <path
          d="M15 30c0 0 5-10 25-10s35 5 40 15c0 0 15 2 18 8-3-6-18-8-18-8-5-10-20-15-40-15s-25 10-25 10z"
          fill="currentColor"
          opacity="0.1"
        />
        
        {/* Whale body with horizontal stripes */}
        <g mask="url(#whale-mask)">
          {/* Stripes */}
          {Array.from({ length: 20 }, (_, i) => (
            <line
              key={i}
              x1="0"
              y1={15 + i * 2}
              x2="100"
              y2={15 + i * 2}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.8"
            />
          ))}
        </g>
        
        {/* Whale outline */}
        <path
          d="M8 35c2-8 8-12 20-12 15 0 30 3 35 12 8 2 15 6 15 10-8-5-15-8-15-8-5-9-20-12-35-12-12 0-18 4-20 10z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        
        {/* Whale tail */}
        <path
          d="M85 30c5 2 10 8 12 15-2-7-7-13-12-15z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        
        <path
          d="M85 35c5-2 10-8 12-15 2 7-7 13-12 15z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        
        {/* Whale eye */}
        <circle
          cx="25"
          cy="32"
          r="1.5"
          fill="currentColor"
        />
      </g>
      
      {/* Mask for stripes */}
      <defs>
        <mask id="whale-mask">
          <rect width="100" height="60" fill="black" />
          <path
            d="M8 35c2-8 8-12 20-12 15 0 30 3 35 12 8 2 15 6 15 10-8-5-15-8-15-8-5-9-20-12-35-12-12 0-18 4-20 10z"
            fill="white"
          />
        </mask>
      </defs>
    </svg>
  )
}
