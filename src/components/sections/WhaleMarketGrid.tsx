'use client'

import { useMemo, useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { buildSlug } from '@/lib/slug'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { whaleMarkets as dataWhaleMarkets } from '@/data/markets'

type EventOption = {
  name: string
  percent: number
}

type EventMarket = {
  id: string
  title: string
  options: EventOption[]
  volume: number
  imageUrl?: string
}

// Helper to infer coin logo from a market title
const getLogoKeyFromTitle = (title: string): string | null => {
  const t = title.toLowerCase()
  if (/(hyperliquid|hype)\b/.test(t)) return 'hype'
  if (/(bitcoin|btc)\b/.test(t)) return 'bitcoin'
  if (/(ethereum|eth)\b/.test(t)) return 'ethereum'
  if (/\bxrp\b/.test(t)) return 'xrp'
  if (/(binance|bnb)\b/.test(t)) return 'bnb'
  if (/(solana|sol)\b/.test(t)) return 'solana'
  if (/\bdoge\b/.test(t)) return 'doge'
  return null
}

// Use real data from data/markets
const mockEvents: EventMarket[] = dataWhaleMarkets as unknown as EventMarket[]

export function WhaleMarketCard({ market }: { market: EventMarket }) {
  const slug = buildSlug(market.title)
  
  // Extract position info from title
  const getPositionInfo = (title: string) => {
    const isLong = /LONG/i.test(title)
    const isShort = /SHORT/i.test(title)
    const amount = title.match(/(\d+M\$)/)?.[1] || ''
    const coin = title.match(/(BITCOIN|ETH|HYPE|BTC)/i)?.[1]?.toUpperCase() || ''
    
    return { isLong, isShort, amount, coin }
  }
  
  const positionInfo = getPositionInfo(market.title)
  const topTwo = useMemo(() => {
    const sorted = [...market.options].sort((a,b) => b.percent - a.percent)
    return sorted.slice(0, 2)
  }, [market.options])
  
  return (
    <Link href={`/market/${slug}`} className="block">
      <Card className="relative overflow-hidden bg-white border border-gray-200 rounded-lg p-4 text-gray-900 hover:bg-gray-50 hover:border-[#0e241f]/20 transition h-full shadow-sm hover:shadow-md">
        {/* Header with coin and position type */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Image 
              src={market.imageUrl || (getLogoKeyFromTitle(market.title) ? `/coin-logos/${getLogoKeyFromTitle(market.title)}.png` : 'https://picsum.photos/seed/placeholder/96/96')} 
              alt="coin" 
              width={40} 
              height={40} 
              className="w-10 h-10 rounded-md object-cover" 
            />
            <div>
              <div className="text-base font-bold">{positionInfo.coin} {positionInfo.amount}</div>
              <div className="text-xs text-gray-500">Whale Position</div>
            </div>
          </div>
          <div className={`px-2 py-1 rounded text-xs font-bold ${
            positionInfo.isLong 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {positionInfo.isLong ? 'LONG' : 'SHORT'}
          </div>
        </div>

        {/* Will Profit/Will Lose options */}
        <div className="space-y-3">
          {topTwo.map((opt, idx) => {
            const isProfit = opt.name.includes('Profit')
            return (
              <div key={opt.name} className="flex items-center gap-3">
                <div className="flex items-center gap-2 w-20 shrink-0">
                  <span className={`text-lg font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                    {isProfit ? '+' : '-'}
                  </span>
                  <span className="text-sm text-gray-700">{isProfit ? 'Profit' : 'Lose'}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Progress
                      value={opt.percent}
                      className={`h-2 bg-gray-200 ${isProfit ? ' [&>div]:from-emerald-500 [&>div]:to-emerald-400' : ' [&>div]:from-red-500 [&>div]:to-rose-400'}`}
                    />
                    <span className="text-sm font-semibold tabular-nums w-10 text-right text-gray-900">{opt.percent}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="sm" className="h-7 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700">Yes</Button>
                  <Button size="sm" className="h-7 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700">No</Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 text-xs text-gray-500">
          ${market.volume.toLocaleString()}
        </div>

        {/* Frosted overlay with SOON ribbon for cards 4–9 (index >= 3 in grid) */}
        {/* We cannot access the index here directly, so we add a data attribute from parent map below. */}
      </Card>
    </Link>
  )
}

export default function WhaleMarketGrid() {
  const events: EventMarket[] = mockEvents

  const [activeCategory, setActiveCategory] = useState<string>('all')

  // Avoid hydration mismatch by reading query on client after mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const c = params.get('category') || 'all'
    setActiveCategory(c)
  }, [])

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return events
    if (activeCategory === 'options') return events // placeholder; future: show options-only when we add that tag
    return events.filter((e) => getLogoKeyFromTitle(e.title) === activeCategory)
  }, [activeCategory, events])

  // Only these three markets are currently active; others are frosted "SOON"
  const ACTIVE_IDS = useMemo(() => new Set(['w1', 'w2', 'w3']), [])

  return (
    <section className="py-8 bg-gray-50">
      {/* Section Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-[#0e241f] rounded-full"></div>
            <span className="text-sm font-bold tracking-[2px] text-gray-900 uppercase">WHALE MARKETS</span>
            <div className="w-2 h-2 bg-[#0e241f] rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 bg-gray-50">
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-600 text-lg">No bets available for this category</div>
          <div className="text-gray-500 text-sm mt-2">Try selecting a different category</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-0">
          {filtered.map((m) => {
            const isActive = ACTIVE_IDS.has(m.id)
            return (
            <div key={m.id} className="relative">
              <div className={isActive ? '' : 'pointer-events-none'}>
                <WhaleMarketCard market={m} />
              </div>
              {!isActive && (
                <div className="pointer-events-auto absolute inset-0 rounded-lg overflow-hidden cursor-not-allowed z-0">
                  <div className="absolute inset-0 rounded-lg bg-gray-100/80 backdrop-blur-md" />
                  <div className="relative h-full flex items-center justify-center">
                    <div className="rotate-[-12deg] translate-x-2">
                      <span className="px-4 py-1 rounded-md border border-[#0e241f]/20 bg-[#0e241f]/10 text-black/70 text-2xl md:text-3xl font-extrabold tracking-[0.3em] shadow-lg">
                        SOON
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )})}
        </div>
      )}
      </div>
    </section>
  )
}


