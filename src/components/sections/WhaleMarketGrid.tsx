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
  const topTwo = useMemo(() => {
    const sorted = [...market.options].sort((a,b) => b.percent - a.percent)
    return sorted.slice(0, 2)
  }, [market.options])
  return (
    <Link href={`/market/${slug}`} className="block">
      <Card className="relative overflow-hidden bg-white/10 border border-white/20 rounded-lg p-4 text-white hover:bg-white/15 transition h-full">
      <div className="flex items-center gap-3 mb-3">
        <Image src={market.imageUrl || (getLogoKeyFromTitle(market.title) ? `/coin-logos/${getLogoKeyFromTitle(market.title)}.png` : 'https://picsum.photos/seed/placeholder/96/96')} alt="event" width={40} height={40} className="w-10 h-10 rounded-md object-cover" />
        <h3 className="text-base font-semibold line-clamp-2 min-h-[2.75rem] leading-snug">{market.title}</h3>
      </div>

      <div className="space-y-3">
        {topTwo.map((opt, idx) => {
          const isPrimary = idx === 0
          return (
            <div key={opt.name} className="flex items-center gap-3">
              <span className="text-sm text-white/90 w-28 shrink-0 truncate">{opt.name}</span>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Progress
                    value={opt.percent}
                    className={`h-2 bg-white/10 ${isPrimary ? ' [&>div]:from-emerald-500 [&>div]:to-emerald-400' : ' [&>div]:from-red-500 [&>div]:to-rose-400'}`}
                  />
                  <span className="text-sm font-semibold tabular-nums w-10 text-right">{opt.percent}%</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button size="sm" className="h-7 px-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300">Yes</Button>
                <Button size="sm" className="h-7 px-3 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-300">No</Button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 text-xs text-white/60">
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
    <div className="container mx-auto px-4 py-8 bg-[#0e241f]">
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-white/60 text-lg">No bets available for this category</div>
          <div className="text-white/40 text-sm mt-2">Try selecting a different category</div>
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
                  <div className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-md" />
                  <div className="relative h-full flex items-center justify-center">
                    <div className="rotate-[-12deg] translate-x-2">
                      <span className="px-4 py-1 rounded-md border border-white/20 bg-white/10 text-white/80 text-2xl md:text-3xl font-extrabold tracking-[0.3em] shadow-white/10 shadow-md">
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
  )
}


