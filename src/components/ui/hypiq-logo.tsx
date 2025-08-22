import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HypiqLogoProps {
  className?: string
  size?: number
}

export const HypiqLogo: React.FC<HypiqLogoProps> = ({ 
  className, 
  size = 16 
}) => {
  return (
    <Image
      src="/whale-tail.png"
      alt="Whale Logo"
      width={size}
      height={size}
      className={cn("object-contain", className)}
    />
  )
}
