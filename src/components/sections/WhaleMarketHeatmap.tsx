'use client'

import { useMemo } from 'react'
import { ChartContainer } from '@/components/ui/chart'
import { Marquee } from '@/components/ui/Marquee'
import { LineChart, Line, XAxis, YAxis } from 'recharts'
import Image from 'next/image'

type HeatCategory = {
  key: string
  label: string
}

// Crypto coins for whale markets
const CATEGORIES: HeatCategory[] = [
  { key: 'bitcoin', label: 'Bitcoin' },
  { key: 'ethereum', label: 'Ethereum' },
  { key: 'xrp', label: 'XRP' },
  { key: 'bnb', label: 'BNB' },
  { key: 'solana', label: 'SOLANA' },
  { key: 'doge', label: 'DOGE' },
  { key: 'hype', label: 'HYPE' },
]

// Using shadcn/Recharts white line for mini trend inside each tile

// Function to get crypto-specific background styles with glassmorphism
const getCryptoBackground = (key: string) => {
  switch (key) {
    case 'ethereum':
      return {
        background: `rgba(98, 126, 235, 0.15)`,
        border: `rgba(98, 126, 235, 0.3)`,
        backdropFilter: 'blur(10px)'
      }
    case 'solana':
      return {
        background: `linear-gradient(135deg, rgba(133, 84, 241, 0.15), rgba(28, 246, 160, 0.15))`,
        border: `rgba(133, 84, 241, 0.3)`,
        backdropFilter: 'blur(10px)'
      }
    case 'bnb':
      return {
        background: `rgba(240, 185, 11, 0.15)`,
        border: `rgba(240, 185, 11, 0.3)`,
        backdropFilter: 'blur(10px)'
      }
    case 'doge':
      return {
        background: `rgba(186, 159, 51, 0.15)`,
        border: `rgba(186, 159, 51, 0.3)`,
        backdropFilter: 'blur(10px)'
      }
    case 'bitcoin':
      return {
        background: `rgba(247, 147, 26, 0.15)`,
        border: `rgba(247, 147, 26, 0.3)`,
        backdropFilter: 'blur(10px)'
      }
    case 'xrp':
      return {
        background: `rgba(0, 0, 0, 0.15)`,
        border: `rgba(255, 255, 255, 0.2)`,
        backdropFilter: 'blur(10px)'
      }
    case 'hype':
      return {
        background: `rgba(255, 255, 255, 0.15)`,
        border: `rgba(255, 255, 255, 0.3)`,
        backdropFilter: 'blur(10px)'
      }
    default:
      return {
        background: `rgba(255, 255, 255, 0.05)`,
        border: `rgba(255, 255, 255, 0.12)`,
        backdropFilter: 'blur(10px)'
      }
  }
}

export default function WhaleMarketHeatmap() {
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

  const getLogoSrc = (key: string) => `/coin-logos/${key}.png`

  return (
    <section className="bg-[#0e241f] text-white py-2">
      <div className="container mx-auto px-2 md:px-4">
        <Marquee className="py-1" pauseOnHover repeat={8}>
          {data.map((item) => {
            const cryptoStyle = getCryptoBackground(item.key)
            return (
              <button
                key={item.key}
                className="relative h-16 w-[160px] overflow-hidden rounded-lg px-3 py-2 text-left transition hover:scale-105 hover:shadow-lg"
                style={{
                  background: cryptoStyle.background,
                  border: `1px solid ${cryptoStyle.border}`,
                  backdropFilter: cryptoStyle.backdropFilter,
                  WebkitBackdropFilter: cryptoStyle.backdropFilter
                }}
              >
                <div className="relative flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Image
                      src={getLogoSrc(item.key)}
                      alt={item.label}
                      width={16}
                      height={16}
                      className={`h-4 w-4 rounded-sm object-contain ${item.key === 'xrp' ? 'invert' : ''}`}
                    />
                    <span className="text-[11px] font-medium tracking-wide truncate text-white">{item.label}</span>
                  </div>
                  <span className="text-[10px] text-white/80 tabular-nums">{Math.round(item.intensity)}%</span>
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


