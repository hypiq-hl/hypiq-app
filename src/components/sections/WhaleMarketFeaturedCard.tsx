'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Progress } from '@/components/ui/progress'

// Whale position data type
type WhalePosition = {
  id: string
  type: 'LONG' | 'SHORT'
  asset: string
  whaleId: string
  amount: string
  title: string
  description: string
  odds: {
    profit: number
    loss: number
  }
}

// Mock whale positions data
const whalePositions: WhalePosition[] = [
  {
    id: '1',
    type: 'LONG',
    asset: 'Bitcoin',
    whaleId: '#420',
    amount: '$50M',
    title: 'WHALE BITCOIN LONG',
    description: 'Massive bullish position on BTC breakthrough',
    odds: {
      profit: 67,
      loss: 33
    }
  },
  {
    id: '2',
    type: 'SHORT',
    asset: 'Ethereum',
    whaleId: '#888',
    amount: '$25M',
    title: 'WHALE ETHEREUM SHORT',
    description: 'High-conviction bearish bet against ETH',
    odds: {
      profit: 45,
      loss: 55
    }
  }
]

export function WhaleMarketFeaturedCard() {
  // Map asset names to logo file keys in /public/coin-logos
  const getCoinKeyFromAsset = (asset: string): string => {
    const key = asset.trim().toLowerCase().replace(/\s+/g, '')
    // In case of any special mappings later
    return key
  }
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState<'next' | 'prev' | null>(null)
  const currentPosition = whalePositions[currentPositionIndex]

  const handlePrevious = () => {
    setIsAnimating('prev')
    setTimeout(() => {
      setCurrentPositionIndex((prev) => prev === 0 ? whalePositions.length - 1 : prev - 1)
      setIsAnimating(null)
    }, 200)
  }

  const handleNext = () => {
    setIsAnimating('next')
    setTimeout(() => {
      setCurrentPositionIndex((prev) => prev === whalePositions.length - 1 ? 0 : prev + 1)
      setIsAnimating(null)
    }, 200)
  }
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
    const { profit: profitTarget, loss: lossTarget } = currentPosition.odds
    
    return Array.from({ length: 50 }, (_, i) => {
      const timeProgress = i / 50
      const convergence = Math.pow(timeProgress, 1.5) // Stronger convergence toward end
      
      // Start with some variation and converge to actual percentages
      const startVariationProfit = profitTarget + (prng() - 0.5) * 20
      const startVariationLoss = lossTarget + (prng() - 0.5) * 20
      
      // Add some realistic market movement
      const marketMovementProfit = Math.sin(timeProgress * Math.PI * 3) * 8 * (1 - convergence)
      const marketMovementLoss = Math.cos(timeProgress * Math.PI * 2.5) * 8 * (1 - convergence)
      
      // Noise decreases over time to show convergence
      const noiseProfit = (prng() - 0.5) * 6 * (1 - convergence * 0.8)
      const noiseLoss = (prng() - 0.5) * 6 * (1 - convergence * 0.8)
      
      // Interpolate between start variation and actual percentage
      const profitValue = startVariationProfit * (1 - convergence) + profitTarget * convergence + marketMovementProfit + noiseProfit
      const lossValue = startVariationLoss * (1 - convergence) + lossTarget * convergence + marketMovementLoss + noiseLoss
      
      return {
        time: hours[Math.floor(i / 10)] || `${i}h`,
        profit: Math.max(5, Math.min(95, profitValue)),
        loss: Math.max(5, Math.min(95, lossValue)),
      }
    })
  }, [currentPosition])

  const chartConfig = {
    profit: {
      label: "Will Profit",
      color: "#34d399",
    },
    loss: {
      label: "Will Lose", 
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
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm z-10 h-9 w-9"
        aria-label="Next"
        onClick={handleNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <Card className={`relative overflow-hidden bg-white/10 border border-white/20 rounded-xl p-4 md:p-6 text-white w-full transition-transform duration-200 ease-out ${
        isAnimating === 'next' ? 'translate-x-4 opacity-90' : ''
      } ${isAnimating === 'prev' ? '-translate-x-4 opacity-90' : ''}`}>
        {/* Global background icon anchored to card edges (not affected by inner padding) */}
        <div className="pointer-events-none absolute left-[-15px] bottom-[-60px] opacity-30">
          <div className="relative w-[16.5rem] h-[16.5rem]">
            <Image
              src={currentPosition.type === 'LONG' ? '/long.svg' : '/short.svg'}
              alt={`${currentPosition.type} position`}
              fill
              className="object-contain object-left-bottom"
              priority
            />
          </div>
        </div>
      <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
        {/* Left block - whale position with background */}
        <div className="relative md:w-[48%] overflow-hidden rounded-lg">
          
          {/* Content overlay */}
          <div className="relative p-4 z-10">
            {/* Header: Position Type + Date */}
            <div className="flex items-center justify-between mb-4">
              <span 
                className={`px-2 py-0.5 text-[9px] font-bold tracking-[2px] uppercase rounded ${
                  currentPosition.type === 'LONG' 
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}
              >
                {currentPosition.type}
              </span>
              <span className="text-white/40 text-xs font-mono">Dec 24</span>
            </div>

            {/* Compact headline with asset info */}
            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-md overflow-hidden shrink-0 flex items-center justify-center border border-white/15 bg-white/10">
                <Image 
                  src={`/coin-logos/${getCoinKeyFromAsset(currentPosition.asset)}.png`} 
                  alt={currentPosition.asset} 
                  width={40} 
                  height={40} 
                  className={`w-10 h-10 md:w-12 md:h-12 object-contain ${getCoinKeyFromAsset(currentPosition.asset) === 'xrp' ? 'invert' : ''}`} 
                />
              </div>
              <h1 className="text-lg md:text-2xl font-black leading-tight tracking-tight text-white">
                {`WHALE ${currentPosition.asset.toUpperCase()} ${currentPosition.type}`}
              </h1>
            </div>



            {/* Whale Position Odds */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="text-white/80 text-sm w-24 shrink-0">Will Profit</div>
                <div className="flex-1 flex items-center gap-3">
                  <Progress 
                    value={currentPosition.odds.profit} 
                    className="h-2 bg-white/10 [&>div]:from-emerald-500 [&>div]:to-emerald-400" 
                  />
                  <div className="text-lg md:text-xl font-bold text-white tabular-nums">
                    {currentPosition.odds.profit}%
                  </div>
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
                <div className="text-white/80 text-sm w-24 shrink-0">Will Lose</div>
                <div className="flex-1 flex items-center gap-3">
                  <Progress 
                    value={currentPosition.odds.loss} 
                    className="h-2 bg-white/10 [&>div]:from-red-500 [&>div]:to-rose-400" 
                  />
                  <div className="text-lg md:text-xl font-bold text-white/80 tabular-nums">
                    {currentPosition.odds.loss}%
                  </div>
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
                {currentPosition.description}
              </p>
              <div className="text-[10px] text-white/50 font-mono tracking-wider">
                {currentPosition.amount} POSITION • WHALE {currentPosition.whaleId} • LIVE
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
              <span>Will Profit ({currentPosition.odds.profit}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span>Will Lose ({currentPosition.odds.loss}%)</span>
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
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (!active || !payload || payload.length === 0) return null
                    
                    return (
                      <div className="rounded-lg border bg-background/95 backdrop-blur-sm p-2 shadow-md">
                        <div className="space-y-1">
                          {payload.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="text-sm font-medium">
                                {Math.round(entry.value as number)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="var(--color-profit)"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="0"
                />
                <Line
                  type="monotone"
                  dataKey="loss"
                  stroke="var(--color-loss)"
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
