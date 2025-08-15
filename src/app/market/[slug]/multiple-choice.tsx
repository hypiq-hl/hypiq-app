'use client'

import { useMemo, useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { OrderBook, OrderBookData } from '@/components/ui/OrderBook'
import { useHyperliquidPrice } from '@/hooks/useHyperliquidPrice'
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

// Multiple choice options data structure
type PriceOption = {
  range: string
  price: number
  volume: string
  chance: number
  changePercent: number
  buyPrice: string
  sellPrice: string
}

export default function MultipleChoiceMarketPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug || ''
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [selectedSide, setSelectedSide] = useState<'yes' | 'no' | null>(null)
  const [expandedOption, setExpandedOption] = useState<number | null>(null)

  // Compute market without a hook; avoid conditional hooks by rendering a notFound view later
  const market = findMarketBySlug(slug)
  
  // Determine coin for live price
  const coinName = useMemo(() => {
    const t = (market?.title || '').toLowerCase()
    if (t.includes('bitcoin') || t.includes('btc')) return 'bitcoin'
    if (t.includes('ethereum') || t.includes('eth')) return 'ethereum'
    if (t.includes('hyperliquid') || t.includes('hype')) return 'hyperliquid'
    return 'bitcoin'
  }, [market?.title])

  const { priceData, isConnected, symbol } = useHyperliquidPrice(coinName)

  // Rules and timeline (used in header and details)
  const marketRules = useMemo(() => generateMarketRules(market?.title ?? ''), [market?.title])
  const timeline = useMemo(() => inferTimelineFromTitle(market?.title ?? ''), [market?.title])
  
  const notFoundView = (
    <div className="min-h-screen bg-[#0e241f] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Market Not Found</h1>
        <p className="text-white/60">The market you&rsquo;re looking for doesn&rsquo;t exist.</p>
      </div>
    </div>
  )

  // Mock multiple choice options data (like Ethereum price ranges)
  const priceOptions: PriceOption[] = useMemo(() => [
    { range: '↑ 6200', price: 6200, volume: '$46,961 Vol.', chance: 4, changePercent: 1, buyPrice: 'Buy Yes 3.6¢', sellPrice: 'Buy No 96.5¢' },
    { range: '↑ 5800', price: 5800, volume: '$65,504 Vol.', chance: 8, changePercent: 1, buyPrice: 'Buy Yes 9¢', sellPrice: 'Buy No 93¢' },
    { range: '↑ 5400', price: 5400, volume: '$128,243 Vol.', chance: 18, changePercent: 3, buyPrice: 'Buy Yes 18¢', sellPrice: 'Buy No 83¢' },
    { range: '↑ 5000', price: 5000, volume: '$481,976 Vol.', chance: 38, changePercent: 2, buyPrice: 'Buy Yes 38.8¢', sellPrice: 'Buy No 62.6¢' },
    { range: '↑ 4600', price: 4600, volume: '$956,569 Vol.', chance: 71, changePercent: 6, buyPrice: 'Buy Yes 71¢', sellPrice: 'Buy No 30¢' },
    { range: '↑ 4400', price: 4400, volume: '$694,262 Vol.', chance: 100, changePercent: 6, buyPrice: 'Buy Yes 100¢', sellPrice: 'Buy No 0.1¢' },
    { range: '↓ 3300', price: 3300, volume: '$364,758 Vol.', chance: 6, changePercent: -3, buyPrice: 'Buy Yes 7¢', sellPrice: 'Buy No 95¢' },
  ], [])

  // Mock order book data used per option when expanded
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

  const onSelectOption = (idx: number) => {
    setSelectedOption((prev) => (prev === idx ? null : idx))
    setExpandedOption((prev) => (prev === idx ? null : idx))
    // Do not auto-select Yes/No; user chooses explicitly
    setSelectedSide(null)
  }

  // (Removed duplicate global order book data; using per-option data defined above)

  // Coin logo detection
  const getLogoKeyFromTitle = (title: string): string | null => {
    const t = title.toLowerCase()
    if (/(ethereum|eth)\b/.test(t)) return 'ethereum'
    if (/(bitcoin|btc)\b/.test(t)) return 'bitcoin'
    if (/(hyperliquid|hype)\b/.test(t)) return 'hype'
    return null
  }
  const logoKey = useMemo(() => (market ? getLogoKeyFromTitle(market.title) : null), [market])
  const logoUrl = logoKey ? `/coin-logos/${logoKey}.png` : (market?.imageUrl || '/hypiq-logo.jpeg')

  // Sticky title bar behavior
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
          
          {/* Market Info Header - Restored original layout (left volume, right closes) */}
          <div className="mb-6">
            <Card className="bg-white/10 border border-white/20 p-4">
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/70">Total Volume</div>
                    <div className="text-2xl font-bold text-white">${market.volume.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/70">Closes</div>
                    <div className="text-lg font-semibold text-white">{timeline.closesAtText}</div>
                  </div>
                </div>
                {/* Centered live price - subtle frosted glass pill */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg shadow-white/5 px-4 py-3 text-center">
                    <div className="text-xs text-white/80 mb-1">{symbol || 'ETH'} Price</div>
                    <div className="text-3xl font-bold text-white">
                      ${((priceData?.price) ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="mt-1 flex items-center justify-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-red-400' : 'bg-white/30'} animate-pulse`}></span>
                      <span className="text-[9px] uppercase tracking-wide text-white/70">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Multiple Choice Options */}
          <div className="mb-6">
            <div className="grid gap-2">
              <div className="grid grid-cols-4 gap-4 px-4 py-2 text-xs font-semibold text-white/60 border-b border-white/10">
                <div>OUTCOME</div>
                <div className="text-center">% CHANCE</div>
                <div></div>
                <div></div>
              </div>
              
              {priceOptions.map((option, idx) => (
                <div key={idx} className="">
                  <Card 
                    className={`bg-white/5 border border-white/10 p-4 cursor-pointer transition-all hover:bg-white/10 ${
                      selectedOption === idx ? 'ring-2 ring-blue-400/50 bg-blue-500/10' : ''
                    }`}
                    onClick={() => onSelectOption(idx)}
                  >
                    <div className="grid grid-cols-4 gap-4 items-center">
                      {/* Outcome */}
                      <div>
                        <div className="font-semibold text-white">{option.range}</div>
                        <div className="text-xs text-white/60">{option.volume}</div>
                      </div>
                      
                      {/* Chance */}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{option.chance}%</div>
                        <div className={`text-xs flex items-center justify-center gap-1 ${
                          option.changePercent > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {option.changePercent > 0 ? '▲' : '▼'} {Math.abs(option.changePercent)}%
                        </div>
                      </div>
                      
                      {/* Buy Button */}
                      <div>
                        <Button 
                          size="sm" 
                          className={`w-full text-xs border rounded-md transition-all ${
                            selectedOption === idx && selectedSide === 'yes'
                              ? 'bg-emerald-500/30 border-emerald-400/60 text-emerald-200 shadow-[0_0_0_1px_rgba(16,185,129,0.35)_inset]'
                              : selectedOption === idx && selectedSide === 'no'
                                ? 'bg-white/5 border-white/10 text-emerald-300/40'
                                : 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400/40 text-emerald-400'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedOption(idx)
                            setExpandedOption(idx)
                            setTradeType('buy')
                            setSelectedSide('yes')
                          }}
                        >
                          {option.buyPrice}
                        </Button>
                      </div>
                      
                      {/* Sell Button */}
                      <div>
                        <Button 
                          size="sm" 
                          className={`w-full text-xs border rounded-md transition-all ${
                            selectedOption === idx && selectedSide === 'no'
                              ? 'bg-rose-500/30 border-rose-400/60 text-rose-200 shadow-[0_0_0_1px_rgba(244,63,94,0.35)_inset]'
                              : selectedOption === idx && selectedSide === 'yes'
                                ? 'bg-white/5 border-white/10 text-rose-300/40'
                                : 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-400/40 text-rose-400'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedOption(idx)
                            setExpandedOption(idx)
                            setTradeType('buy') // Buy No
                            setSelectedSide('no')
                          }}
                        >
                          {option.sellPrice}
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Per-option expandable OrderBook */}
                  {expandedOption === idx && (
                    <div className="px-2 pb-2">
                      <Card className="bg-white/5 border border-white/10 p-0 mt-2">
                        <OrderBook 
                          data={orderBookData} 
                          option1Label="Yes"
                          option2Label="No"
                          selectedOptionIndex={0}
                          onToggleOption={(i)=>console.log('toggle to', i)}
                          onPriceClick={(price, side) => console.log(`Clicked ${side} at ${price}¢`)}
                          hideTitle
                          unstyled
                        />
                      </Card>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Rules summary */}
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

          {/* Removed global Order Book; each option shows its own expandable orderbook */}

          {/* Timeline & payout */}
          <div className="mt-4">
            <CollapsibleSection title="Timeline and payout" defaultOpen={false} icon={<Calendar className="h-4 w-4" /> }>
              <Card className="bg-white/5 border border-white/10 p-4">
                <div className="relative pl-6">
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
            {/* Trading Panel */}
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
              
              {/* Big Yes / No buttons synced with left selection */}
              {selectedOption === null ? (
                <div className="text-sm text-white/60 text-center py-6">Select an option from the list to trade</div>
              ) : (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    onClick={() => {
                      setTradeType('buy')
                      setExpandedOption(selectedOption)
                      setSelectedSide('yes')
                    }}
                    className={`h-14 rounded-md border text-left px-4 transition-all font-semibold ${
                      selectedSide === 'yes'
                        ? 'bg-emerald-500/25 border-emerald-400/60 text-emerald-200 shadow-[0_0_0_1px_rgba(16,185,129,0.35)_inset]'
                        : 'bg-white/10 border-white/20 text-emerald-300 hover:bg-white/15'
                    }`}
                  >
                    <div className="text-xs uppercase tracking-wide">Yes</div>
                    <div className="text-lg md:text-xl leading-tight">
                      {priceOptions[selectedOption].chance}%
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setTradeType('buy')
                      setExpandedOption(selectedOption)
                      setSelectedSide('no')
                    }}
                    className={`h-14 rounded-md border text-left px-4 transition-all font-semibold ${
                      selectedSide === 'no'
                        ? 'bg-rose-500/25 border-rose-400/60 text-rose-200 shadow-[0_0_0_1px_rgba(244,63,94,0.35)_inset]'
                        : 'bg-white/10 border-white/20 text-rose-300 hover:bg-white/15'
                    }`}
                  >
                    <div className="text-xs uppercase tracking-wide">No</div>
                    <div className="text-lg md:text-xl leading-tight">
                      {Math.max(0, 100 - priceOptions[selectedOption].chance)}%
                    </div>
                  </button>
                </div>
              )}

              <div className="text-xs text-white/60">Amount</div>
              <input 
                className="w-full mt-1 mb-4 rounded bg-white/10 border border-white/20 px-3 py-2 text-sm outline-none" 
                placeholder="$0"
                disabled={selectedOption === null}
              />
              <Button 
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white disabled:opacity-50"
                disabled={selectedOption === null}
              >
                Connect Wallet to Trade
              </Button>

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
