'use client'

import { BaseMarketLayout } from './BaseMarketLayout'
import { Card } from '@/components/ui/card'
import { BetTypeConfig } from '@/types/betTypes'
import { Market } from '@/data/markets'
import { OrderBookData } from '@/components/ui/OrderBook'
import { TrendingUp, TrendingDown, DollarSign, Clock } from 'lucide-react'

interface WhaleCryptoLayoutProps {
  market: Market
  betType: BetTypeConfig
  logoUrl: string
  marketRules: string
  timeline: {
    openAt: Date
    closesAtText: string
    payoutText: string
  }
  orderBookData: OrderBookData
  chartData: Array<{
    t: number
    option1: number
    option2: number
  }>
}

export function WhaleCryptoLayout(props: WhaleCryptoLayoutProps) {
  const { market, betType } = props

  // Custom sections for whale crypto markets
  const customSections = (
    <div className="mt-8 space-y-6">
      {/* Price Analysis Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Price Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-white/90">24h High</span>
            </div>
            <div className="text-lg font-bold text-green-400">$42,850</div>
            <div className="text-xs text-white/60">+2.4% from open</div>
          </Card>
          
          <Card className="bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-red-400" />
              <span className="text-sm font-medium text-white/90">24h Low</span>
            </div>
            <div className="text-lg font-bold text-red-400">$41,200</div>
            <div className="text-xs text-white/60">-1.8% from open</div>
          </Card>
          
          <Card className="bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white/90">Current</span>
            </div>
            <div className="text-lg font-bold text-white">$42,150</div>
            <div className="text-xs text-white/60">Live price</div>
          </Card>
        </div>
      </div>

      {/* Market Sentiment */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Market Sentiment</h2>
        <Card className="bg-white/5 border border-white/10 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-white/70 mb-2">Fear & Greed Index</div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-3/5 h-full bg-orange-400 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-orange-400">62 - Greed</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-white/70 mb-2">Social Sentiment</div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-green-400 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-green-400">78 - Bullish</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Key Levels */}
      {betType.subtype === 'price-target' && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Key Levels</h2>
          <Card className="bg-white/5 border border-white/10 p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70">Resistance</span>
                <span className="text-sm font-medium text-red-400">$43,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70">Target</span>
                <span className="text-sm font-medium text-yellow-400">$42,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70">Support</span>
                <span className="text-sm font-medium text-green-400">$40,800</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )

  return (
    <BaseMarketLayout
      {...props}
      customSections={customSections}
    />
  )
}
