'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, BarChart3, Users, Layers } from 'lucide-react'

export function StatsSection() {
  const stats = [
    {
      title: "24h Volume",
      value: "$847K",
      change: "+12.5%",
      trend: "up",
      icon: BarChart3,
    },
    {
      title: "Total Volume",
      value: "$2.4M",
      change: "+$40K",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Active Traders",
      value: "1,247",
      change: "+89",
      trend: "up",
      icon: Users,
    },
    {
      title: "Live Positions",
      value: "89",
      change: "+12",
      trend: "up",
      icon: Layers,
    },
  ]

  return (
    <section className="py-12 px-4 bg-[#0e241f]">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Icon className="h-5 w-5 text-kalshi-accent mr-2" />
                  <span className="text-sm font-medium text-white/70">{stat.title}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className={`text-xs font-medium ${
                  stat.trend === 'up' ? 'text-kalshi-accent' : 
                  stat.trend === 'down' ? 'text-red-400' : 
                  'text-white/50'
                }`}>
                  {stat.change}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 