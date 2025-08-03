'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Activity, Timer } from 'lucide-react'

export function StatsSection() {
  const stats = [
    {
      title: "24h Volume",
      value: "$847K",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Active Markets",
      value: "23",
      change: "+3",
      trend: "up",
      icon: Activity,
    },
    {
      title: "Avg. Bet Size",
      value: "$156",
      change: "-2.1%",
      trend: "down",
      icon: TrendingDown,
    },
    {
      title: "Fastest Settlement",
      value: "2.3h",
      change: "New Record",
      trend: "neutral",
      icon: Timer,
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Platform Statistics</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time data from the most active whale trading betting platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="trading-card hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center pt-1">
                    <Badge 
                      variant={
                        stat.trend === 'up' ? 'profit' : 
                        stat.trend === 'down' ? 'loss' : 
                        'secondary'
                      }
                      className="text-xs"
                    >
                      {stat.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 