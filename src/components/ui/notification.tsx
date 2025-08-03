'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface NotificationProps {
  whale: {
    name: string
    position: {
      type: string
      amount: string
    }
  }
  onClose: () => void
}

export function WhaleNotification({ whale, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 100)
    
    // Auto close after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`fixed top-20 right-4 z-50 transition-all duration-300 transform ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20 shadow-xl max-w-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐋</span>
            <div>
              <Badge variant="whale" className="mb-2">
                New Position
              </Badge>
              <p className="text-sm font-medium">
                {whale.name} {whale.position.type} {whale.position.amount}$
              </p>
              <p className="text-xs text-muted-foreground">
                Just opened a position
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              setIsVisible(false)
              setTimeout(onClose, 300)
            }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </Card>
    </div>
  )
} 