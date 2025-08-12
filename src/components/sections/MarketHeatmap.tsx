'use client'

import { useMemo } from 'react'
import { ChartContainer } from '@/components/ui/chart'
import { Marquee } from '@/components/ui/Marquee'
import { LineChart, Line, XAxis, YAxis } from 'recharts'

type HeatCategory = {
  key: string
  label: string
}

// New list (Trending handled at the top nav, not here)
const CATEGORIES: HeatCategory[] = [
  { key: 'politics', label: 'Politics' },
  { key: 'economics', label: 'Economics' },
  { key: 'sports', label: 'Sports' },
  { key: 'crypto', label: 'Crypto' },
  { key: 'tech', label: 'Tech' },
  { key: 'health', label: 'Health' },
  { key: 'science', label: 'Science' },
  { key: 'music', label: 'Music' },
  { key: 'esports', label: 'Esports' },
  { key: 'art', label: 'Art' },
  { key: 'world', label: 'World' },
]

// Using shadcn/Recharts white line for mini trend inside each tile

export default function MarketHeatmap() {
  const data = useMemo(() => {
    // Deterministic PRNG to avoid hydration mismatches
    const prng = (() => {
      let seed = 0x12345678 >>> 0
      return () => {
        seed ^= seed << 13
        seed ^= seed >>> 17
        seed ^= seed << 5
        return ((seed >>> 0) % 1_000_000) / 1_000_000
      }
    })()

    return CATEGORIES.map((c, idx) => {
      const base = 30 + (idx * 11) % 50
      const values = Array.from({ length: 16 }, (_, i) =>
        Math.min(100, Math.max(0, base + Math.sin(i / 2 + idx) * 15 + (prng() * 12 - 6)))
      )
      const series = values.map((v, i) => ({ x: i, y: v }))
      const last = values[values.length - 1]
      return { key: c.key, label: c.label, intensity: last, series }
    })
  }, [])

  return (
    <section className="bg-[#0e241f] text-white py-2">
      <div className="container mx-auto px-2 md:px-4">
        <Marquee className="py-1" pauseOnHover repeat={8}>
          {data.map((item) => {
            const hue = 140 - (item.intensity / 100) * 140
            return (
              <button
                key={item.key}
                className="relative h-16 w-[160px] overflow-hidden rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-left transition hover:bg-white/10"
              >
                <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(180deg, hsla(${hue},70%,45%,0.35), transparent)` }} />
                <div className="relative flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium tracking-wide truncate">{item.label}</span>
                  <span className="text-[10px] text-white/60 tabular-nums">{Math.round(item.intensity)}%</span>
                </div>
                <div className="relative mt-1 h-8">
                  <ChartContainer config={{ trend: { color: '#ffffff' } }} className="h-full w-full">
                    <LineChart data={item.series} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                      <XAxis dataKey="x" hide domain={[0, 15]} />
                      <YAxis hide domain={[0, 100]} />
                      <Line type="monotone" dataKey="y" stroke="#ffffff" strokeOpacity={0.9} strokeWidth={1.6} dot={false} />
                    </LineChart>
                  </ChartContainer>
                </div>
              </button>
            )
          })}
        </Marquee>
      </div>
    </section>
  )
}


