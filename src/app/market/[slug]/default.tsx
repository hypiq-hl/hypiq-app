'use client'

import { useMemo, useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis } from 'recharts'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { OrderBook, OrderBookData } from '@/components/ui/OrderBook'
import { findMarketBySlug } from '@/data/markets'
import { capitalizeTitle } from '@/lib/slug'
import { generateMarketRules } from '@/lib/ruleGenerator'
import { inferTimelineFromTitle, formatDateET } from '@/lib/timeline'
import { Calendar, ChevronDown, Book } from 'lucide-react'

function CollapsibleSection({ title, children, defaultOpen = false, icon }: { title: string, children: React.ReactNode, defaultOpen?: boolean, icon?: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white/5 border border-white/10 rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-semibold text-white/90">{title}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-white/70 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-[grid-template-rows,opacity] duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0' } grid`}>
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}

CollapsibleSection.InjectStyles = function InjectStyles() { return null }

export default function MarketDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug || ''
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')

  // Compute market without a hook to allow safe early return before any hooks
  const market = findMarketBySlug(slug)
  
  const notFoundView = (
    <div className="min-h-screen bg-[#0e241f] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Market Not Found</h1>
        <p className="text-white/60">The market you&rsquo;re looking for doesn&rsquo;t exist.</p>
      </div>
    </div>
  )

  const chartData = useMemo(() => {
    if (!market) return []
    
    const [option1, option2] = market.options
    const prng = (() => {
      let seed = 0x9e3779b1 >>> 0
      return () => {
        seed ^= seed << 13
        seed ^= seed >>> 17
        seed ^= seed << 5
        return ((seed >>> 0) % 1_000_000) / 1_000_000
      }
    })()
    
    // Generate realistic price movement that converges to actual percentages
    return Array.from({ length: 120 }, (_, i) => {
      const timeProgress = i / 120
      const convergence = Math.pow(timeProgress, 1.5) // Stronger convergence toward end
      
      // Start with some variation and converge to actual percentages
      const startVariation1 = option1.percent + (prng() - 0.5) * 20
      const startVariation2 = option2.percent + (prng() - 0.5) * 20
      
      // Add some realistic market movement
      const marketMovement1 = Math.sin(timeProgress * Math.PI * 3) * 8 * (1 - convergence)
      const marketMovement2 = Math.cos(timeProgress * Math.PI * 2.5) * 8 * (1 - convergence)
      
      // Noise decreases over time to show convergence
      const noise1 = (prng() - 0.5) * 6 * (1 - convergence * 0.8)
      const noise2 = (prng() - 0.5) * 6 * (1 - convergence * 0.8)
      
      // Interpolate between start variation and actual percentage
      const value1 = startVariation1 * (1 - convergence) + option1.percent * convergence + marketMovement1 + noise1
      const value2 = startVariation2 * (1 - convergence) + option2.percent * convergence + marketMovement2 + noise2
      
      return {
        t: i,
        option1: Math.max(5, Math.min(95, value1)),
        option2: Math.max(5, Math.min(95, value2)),
      }
    })
  }, [market])

  // Mock order book data - will be replaced with real API data
  const orderBookData: OrderBookData = useMemo(() => ({
    asks: [
      { price: 28, contracts: 382, total: 770.05 },
      { price: 27, contracts: 2087, total: 663.09 },
      { price: 26, contracts: 12, total: 99.60 },
      { price: 24, contracts: 402, total: 96.48 },
    ],
    bids: [
      { price: 23, contracts: 324, total: 74.52 },
      { price: 22, contracts: 505, total: 185.62 },
      { price: 21, contracts: 1336, total: 466.18 },
      { price: 20, contracts: 308, total: 527.78 },
    ],
    lastTrade: { price: 24, direction: 'up' }
  }), [])

  const marketTitle = market?.title ?? ''
  const marketRules = useMemo(() => generateMarketRules(marketTitle), [marketTitle])
  const timeline = useMemo(() => inferTimelineFromTitle(marketTitle), [marketTitle])

  // Coin logo detection based on market title (same logic as cards)
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
  const logoKey = useMemo(() => getLogoKeyFromTitle(marketTitle), [marketTitle])
  const logoUrl = logoKey ? `/coin-logos/${logoKey}.png` : (market?.imageUrl || '/hypiq-logo.jpeg')

  // Sticky title bar behavior: shrink on scroll and align sidebar start to chart
  const HEADER_OFFSET = 104
  const titleBarRef = useRef<HTMLDivElement | null>(null)
  const titleInnerRef = useRef<HTMLDivElement | null>(null)
  const [isCondensed, setIsCondensed] = useState(false)
  const [titleHeight, setTitleHeight] = useState(0)


  useEffect(() => {
    const measure = () => {
      if (titleInnerRef.current) {
        setTitleHeight(titleInnerRef.current.offsetHeight)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const top = titleBarRef.current?.getBoundingClientRect().top ?? Infinity
      setIsCondensed(top <= HEADER_OFFSET + 1)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (titleInnerRef.current) {
      setTitleHeight(titleInnerRef.current.offsetHeight)
    }
  }, [isCondensed])

  return !market ? (
    notFoundView
  ) : (
    <div className="min-h-screen bg-[#0e241f] text-white">
      <Navigation />
      <main className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Collapsible helper */}
        <CollapsibleSection.InjectStyles />
        <section className="flex-1 lg:w-2/3">
          <div ref={titleBarRef} className="sticky top-[104px] z-30 bg-[#0e241f]/95 backdrop-blur-sm mb-2 -mx-4 px-4">
            <div
              ref={titleInnerRef}
              className={`flex items-center gap-3 ${isCondensed ? 'py-2' : 'py-3'}`}
            >
              <div className={`flex items-center justify-center ${isCondensed ? 'w-8 h-8' : 'w-10 h-10'}`}>
                <Image src={logoUrl} alt="coin" width={40} height={40} className={`${isCondensed ? 'w-8 h-8' : 'w-10 h-10'} object-contain`} />
              </div>
              <h1 className={`${isCondensed ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-bold`}>
                {capitalizeTitle(market.title)}
              </h1>
            </div>
          </div>
          
          <div className="mb-6">
            <Card className="relative bg-white/10 border border-white/20 p-4">
              <div className="h-64">
              <ChartContainer config={{ 
                option1: { color: '#34d399', label: market.options[0]?.name || 'Option 1' }, 
                option2: { color: '#ef4444', label: market.options[1]?.name || 'Option 2' } 
              }} className="h-full w-full">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={[0, 100]} />
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
                  <Line type="monotone" dataKey="option1" stroke="var(--color-option1)" dot={false} strokeWidth={2} />
                  <Line type="monotone" dataKey="option2" stroke="var(--color-option2)" dot={false} strokeWidth={2} />
                </LineChart>
              </ChartContainer>
              </div>
              {/* In-chart legend with current percentages (top-right) */}
              <div className="absolute top-2 right-3 flex items-center gap-4 text-[11px] md:text-xs text-white/80">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span>{market.options[0]?.name || 'Option 1'}</span>
                  <span className="font-bold text-emerald-400">{market.options[0]?.percent}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span>{market.options[1]?.name || 'Option 2'}</span>
                  <span className="font-bold text-red-400">{market.options[1]?.percent}%</span>
                </div>
              </div>
              {/* Volume label bottom-right inside chart card */}
              <div className="absolute bottom-2 right-3 text-xs text-white/70">${market.volume.toLocaleString()} vol</div>
            </Card>
          </div>


          {/* Rules summary above Order Book */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Rules summary</h2>
            <Card className="bg-white/5 border border-white/10 p-4">
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                {marketRules}
              </p>
              <div className="flex gap-2">
                <button className="text-xs text-green-400 hover:text-green-300 transition">
                  View full rules
                </button>
                <button className="text-xs text-blue-400 hover:text-blue-300 transition">
                  Help center
                </button>
              </div>
            </Card>
          </div>

          {/* Order Book - now below Rules */}
          <div className="mt-8">
            <CollapsibleSection title="Order book" defaultOpen={false} icon={<Book className="h-4 w-4" />}>
              <Card className="bg-white/5 border border-white/10 p-0">
                <OrderBook 
                  data={orderBookData} 
                  option1Label={market.options[0]?.name || 'Option 1'}
                  option2Label={market.options[1]?.name || 'Option 2'}
                  selectedOptionIndex={0}
                  onToggleOption={(i)=>console.log('toggle to', i)}
                  onPriceClick={(price, side) => console.log(`Clicked ${side} at ${price}¢`)}
                  hideTitle
                  unstyled
                />
              </Card>
            </CollapsibleSection>
          </div>

          {/* Timeline & payout */}
          <div className="mt-4">
            <CollapsibleSection title="Timeline and payout" defaultOpen={false} icon={<Calendar className="h-4 w-4" /> }>
              <Card className="bg-white/5 border border-white/10 p-4">
                <div className="relative pl-6">
                {/* Vertical rail */}
                  <div className="absolute left-[6px] top-2 bottom-2 w-px bg-white/15"></div>
                  <div className="flex items-center gap-3 py-2">
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="h-3 w-3 rounded-full bg-emerald-400"></span>
                    <span className="absolute inset-0 rounded-full ring-2 ring-emerald-300/40"></span>
                  </span>
                  <div>
                    <div className="text-sm font-medium text-white leading-tight">Market open</div>
                    <div className="text-xs text-white/70 leading-tight">{formatDateET(timeline.openAt)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="h-3 w-3 rounded-full bg-white/30"></span>
                    <span className="absolute inset-0 rounded-full ring-2 ring-white/30"></span>
                  </span>
                  <div>
                    <div className="text-sm font-medium text-white leading-tight">Market closes</div>
                    <div className="text-xs text-white/70 leading-tight">{timeline.closesAtText}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="h-3 w-3 rounded-full bg-white/30"></span>
                    <span className="absolute inset-0 rounded-full ring-2 ring-white/30"></span>
                  </span>
                  <div>
                    <div className="text-sm font-medium text-white leading-tight">Projected payout</div>
                    <div className="text-xs text-white/70 leading-tight">1 hour after closing</div>
                  </div>
                </div>
                </div>
              </Card>
            </CollapsibleSection>
          </div>
          
        </section>

        <aside className="lg:w-1/3 lg:flex-shrink-0">
          <div className="space-y-4 lg:sticky lg:top-[200px] lg:self-start">
            {/* Trading Panel - directly above Order Book */}
            <Card className="bg-white/10 border border-white/20 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12">
                    <Image src={logoUrl} alt="market" width={48} height={48} className="w-12 h-12 object-contain" />
                  </div>
                  <div>
                    <div className="text-sm text-white/90">Selected Market</div>
                    <div className="text-xs text-white/60">Demo only</div>
                  </div>
                </div>
                
                {/* Buy/Sell Switch */}
                <div className="flex relative">
                  <button 
                    onClick={() => setTradeType('buy')}
                    className={`relative z-10 px-4 py-2 text-xs font-semibold transition-all duration-300 ease-out rounded-md ${
                      tradeType === 'buy' 
                        ? 'bg-white/20 text-emerald-500 backdrop-blur-md border border-white/30 shadow-lg shadow-white/10' 
                        : 'text-emerald-400/40 hover:text-emerald-400/60'
                    }`}
                  >
                    Buy
                  </button>
                  <button 
                    onClick={() => setTradeType('sell')}
                    className={`relative z-10 px-4 py-2 text-xs font-semibold transition-all duration-300 ease-out rounded-md ${
                      tradeType === 'sell' 
                        ? 'bg-white/20 text-red-400 backdrop-blur-md border border-white/30 shadow-lg shadow-white/10' 
                        : 'text-red-400 hover:text-red-400/80'
                    }`}
                  >
                    Sell
                  </button>
                </div>
              </div>
              
              {/* Market Options without title */}
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {market.options.map((option, idx) => (
                    <button 
                      key={option.name} 
                      className={`${idx === 0 ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40' : 'bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40'} rounded-md p-3 text-center transition-colors cursor-pointer`}
                    >
                      <div className="text-white font-medium text-sm">{option.name}</div>
                      <div className={`${idx === 0 ? 'text-emerald-400' : 'text-rose-400'} font-bold text-lg`}>{option.percent}%</div>
                    </button>
                  ))}
                </div>
              </div>


              <div className="text-xs text-white/60">Amount</div>
              <input className="w-full mt-1 mb-4 rounded bg-white/10 border border-white/20 px-3 py-2 text-sm outline-none" placeholder="$0" />
              <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white">Connect Wallet to Trade</Button>

              <p className="text-xs text-white/70 text-center mt-3">
                By trading, you agree to the <a href="https://hypiq.finance/terms" target="_blank" rel="noopener noreferrer" className="font-semibold underline">Terms of Use</a>.
              </p>
            </Card>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  )
}


