import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react'
import { useMemo } from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Progress } from '@/components/ui/progress'

export function FeaturedBets() {
  const chartData = useMemo(() => {
    // Deterministic PRNG to avoid hydration mismatches between SSR and client
    const prng = (() => {
      let seed = 0x9e3779b1 >>> 0
      return () => {
        // xorshift32
        seed ^= seed << 13
        seed ^= seed >>> 17
        seed ^= seed << 5
        // map to [0,1)
        return ((seed >>> 0) % 1_000_000) / 1_000_000
      }
    })()

    const hours = ['3:26am', '4:58am', '6:31am', '8:04am', '2:36pm']
    return Array.from({ length: 50 }, (_, i) => {
      const noiseA = prng() * 6 - 3
      const noiseB = prng() * 4 - 2
      return {
        time: hours[Math.floor(i / 10)] || `${i}h`,
        above27: 63 + Math.sin(i / 8) * 5 + noiseA,
        above28: 18 + Math.cos(i / 6) * 3 + noiseB,
      }
    })
  }, [])

  const chartConfig = {
    above27: {
      label: "Above 2.7%",
      color: "#34d399",
    },
    above28: {
      label: "Above 2.8%", 
      color: "#ef4444",
    },
  }
  const chartTicks = ['3:26am', '4:58am', '6:31am', '8:04am', '2:36pm']
  return (
    <div className="relative">
      {/* Outer glass arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm z-10 h-9 w-9"
        aria-label="Previous"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm z-10 h-9 w-9"
        aria-label="Next"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <Card className="bg-white/10 border border-white/20 rounded-xl p-4 md:p-6 text-white w-full">
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
        {/* Left block - compact magazine layout with bars */}
        <div className="relative md:w-[48%]">
          <div className="relative p-4">
            {/* Header: Category + Date */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-2 py-0.5 bg-white/10 text-[9px] font-bold tracking-[2px] text-white/80 uppercase">
                Economics
              </span>
              <span className="text-white/40 text-xs font-mono">Dec 24</span>
            </div>

            {/* Compact headline with thumbnail */}
            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-md overflow-hidden border border-white/15 shrink-0">
                <Image src="https://picsum.photos/seed/cpi/96/96" alt="market" width={48} height={48} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-lg md:text-2xl font-black leading-tight tracking-tight text-white">
                INFLATION OUTLOOK
              </h1>
            </div>

            {/* Odds with progress bars */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="text-white/80 text-sm w-24 shrink-0">Above 2.7%</div>
                <div className="flex-1 flex items-center gap-3">
                  <Progress value={63} className="h-2 bg-white/10 [&>div]:from-emerald-500 [&>div]:to-emerald-400" />
                  <div className="text-lg md:text-xl font-bold text-white tabular-nums">63%</div>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-7 px-3 border-white/30 text-white hover:bg-white/10 rounded-full flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" /> Yes
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 px-3 border-white/30 text-white hover:bg-white/10 rounded-full flex items-center gap-1">
                    <X className="h-3.5 w-3.5" /> No
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-white/80 text-sm w-24 shrink-0">Above 2.8%</div>
                <div className="flex-1 flex items-center gap-3">
                  <Progress value={18} className="h-2 bg-white/10 [&>div]:from-red-500 [&>div]:to-rose-400" />
                  <div className="text-lg md:text-xl font-bold text-white/80 tabular-nums">18%</div>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-7 px-3 border-white/30 text-white hover:bg-white/10 rounded-full flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" /> Yes
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 px-3 border-white/30 text-white hover:bg-white/10 rounded-full flex items-center gap-1">
                    <X className="h-3.5 w-3.5" /> No
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom meta */}
            <div className="pt-3 border-t border-white/10">
              <p className="text-xs text-white/70 mb-2 leading-relaxed">
                Energy surge meets cooling labor. Fed signals measured approach.
              </p>
              <div className="text-[10px] text-white/50 font-mono tracking-wider">
                $20.1M VOL • 1,247 TRADERS • MONTHLY
              </div>
            </div>
          </div>
        </div>

        {/* Vertical divider between columns */}
          <div className="hidden md:flex w-px self-stretch bg-gradient-to-b from-transparent via-white/30 to-transparent" />

        {/* Right block - options + chart */}
        <div className="md:w-[52%] flex flex-col justify-center">
          {/* Legend centered above the chart with same width as chart */}
          <div className="mx-auto max-w-[420px] flex items-center justify-center gap-4 md:gap-6 mb-2 md:mb-3 text-[11px] md:text-xs text-white/80">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>Above 2.7%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span>Above 2.8%</span>
            </div>
          </div>
          {/* Options moved to left; keep spacing before divider */}
          <div className="mb-3" />
           {/* Centered half-length divider (hidden on mobile to reduce clutter) */}
           <div className="hidden md:flex justify-center mb-3">
            <div className="h-px w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>
          
           {/* Chart container */}
           <div className="h-32 md:h-36">
            <ChartContainer config={chartConfig} className="h-full w-full mx-auto max-w-[420px]">
              <LineChart data={chartData} margin={{ top: 6, right: 32, left: 32, bottom: 16 }}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.6)' }}
                  tickMargin={10}
                  allowDuplicatedCategory={false}
                  ticks={chartTicks}
                  interval={0}
                />
                <YAxis 
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.6)' }}
                  width={32}
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="above27"
                  stroke="var(--color-above27)"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="0"
                />
                <Line
                  type="monotone"
                  dataKey="above28"
                  stroke="var(--color-above28)"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="0"
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      {/* removed inner pagination controls; handled by outer arrows */}
    </Card>
    </div>
  )
}
