'use client'

import { useMemo, useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis } from 'recharts'
import { Button } from '@/components/ui/button'
import { OrderBook, OrderBookData } from '@/components/ui/OrderBook'
import { BetTypeConfig } from '@/types/betTypes'
import { Market } from '@/data/markets'
import { capitalizeTitle } from '@/lib/slug'
import { formatDateET } from '@/lib/timeline'
import { Calendar, ChevronDown, Book } from 'lucide-react'

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  icon?: React.ReactNode
}

function CollapsibleSection({ title, children, defaultOpen = false, icon }: CollapsibleSectionProps) {
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

interface BaseMarketLayoutProps {
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
  customSections?: React.ReactNode
  customTradingPanel?: React.ReactNode
}

export function BaseMarketLayout({
  market,
  betType,
  logoUrl,
  marketRules,
  timeline,
  orderBookData,
  chartData,
  customSections,
  customTradingPanel
}: BaseMarketLayoutProps) {
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

  return (
    <main className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      <section className="flex-1 lg:w-2/3">
        {/* Sticky Title Bar */}
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
            {/* Bet type indicator */}
            <div className="ml-auto">
              <div 
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${betType.color.primary}20`,
                  color: betType.color.primary,
                  border: `1px solid ${betType.color.primary}40`
                }}
              >
                {betType.displayName}
              </div>
            </div>
          </div>
        </div>
        
        {/* Chart Section */}
        <div className="mb-6">
          <Card className="relative bg-white/10 border border-white/20 p-4">
            <div className="h-64">
              <ChartContainer config={{ 
                option1: { color: betType.color.primary, label: market.options[0]?.name || 'Option 1' }, 
                option2: { color: betType.color.secondary, label: market.options[1]?.name || 'Option 2' } 
              }} className="h-full w-full">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="option1" stroke="var(--color-option1)" dot={false} strokeWidth={2} />
                  <Line type="monotone" dataKey="option2" stroke="var(--color-option2)" dot={false} strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            </div>
            {/* In-chart legend */}
            <div className="absolute top-2 right-3 flex items-center gap-4 text-[11px] md:text-xs text-white/80">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: betType.color.primary }}></span>
                <span>{market.options[0]?.name || 'Option 1'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: betType.color.secondary }}></span>
                <span>{market.options[1]?.name || 'Option 2'}</span>
              </div>
            </div>
            {/* Volume label */}
            <div className="absolute bottom-2 right-3 text-xs text-white/70">${market.volume.toLocaleString()} vol</div>
          </Card>
        </div>

        {/* Rules Summary */}
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

        {/* Order Book */}
        {betType.tradingPanel.showOrderBook && (
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
        )}

        {/* Timeline & Payout */}
        <div className="mt-4">
          <CollapsibleSection title="Timeline and payout" defaultOpen={false} icon={<Calendar className="h-4 w-4" />}>
            <Card className="bg-white/5 border border-white/10 p-4">
              <div className="relative pl-6">
                <div className="absolute left-[6px] top-2 bottom-2 w-px bg-white/15"></div>
                <div className="flex items-center gap-3 py-2">
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: betType.color.primary }}></span>
                    <span
                      className="absolute inset-0 rounded-full ring-2"
                      style={{ '--tw-ring-color': `${betType.color.primary}40` } as CSSProperties}
                    ></span>
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

        {/* Custom Sections */}
        {customSections}
      </section>

      {/* Sidebar */}
      <aside className="lg:w-1/3 lg:flex-shrink-0">
        <div className="space-y-4 lg:sticky lg:top-[200px] lg:self-start">
          {/* Custom Trading Panel or Default */}
          {customTradingPanel || (
            <Card className="bg-white/10 border border-white/20 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12">
                  <Image src={logoUrl} alt="market" width={48} height={48} className="w-12 h-12 object-contain" />
                </div>
                <div>
                  <div className="text-sm text-white/90">Selected Market</div>
                  <div className="text-xs text-white/60">Demo only</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {market.options.map((option, idx) => (
                  <Button 
                    key={option.name}
                    className={`${idx === 0 ? 'border' : 'border'} text-white`}
                    style={{
                      backgroundColor: `${idx === 0 ? betType.color.primary : betType.color.secondary}20`,
                      borderColor: `${idx === 0 ? betType.color.primary : betType.color.secondary}40`
                    }}
                  >
                    {option.name}
                  </Button>
                ))}
              </div>
              <div className="text-xs text-white/60">Amount</div>
              <input className="w-full mt-1 mb-4 rounded bg-white/10 border border-white/20 px-3 py-2 text-sm outline-none" placeholder="$0" />
              <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white">
                Connect Wallet to Trade
              </Button>
              <p className="text-xs text-white/70 text-center mt-3">
                By trading, you agree to the <a href="https://hypiq.finance/terms" target="_blank" rel="noopener noreferrer" className="font-semibold underline">Terms of Use</a>.
              </p>
            </Card>
          )}
        </div>
      </aside>
    </main>
  )
}
