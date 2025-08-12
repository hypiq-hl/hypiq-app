'use client'

import { Card } from '@/components/ui/card'

export type OrderBookEntry = {
  price: number // 1-99 cents
  contracts: number
  total: number
}

export type OrderBookData = {
  asks: OrderBookEntry[]
  bids: OrderBookEntry[]
  lastTrade?: {
    price: number
    direction: 'up' | 'down'
  }
}

interface OrderBookProps {
  data: OrderBookData
  onPriceClick?: (price: number, side: 'buy' | 'sell') => void
  option1Label?: string
  option2Label?: string
  selectedOptionIndex?: number
  onToggleOption?: (index: number) => void
  hideTitle?: boolean
  unstyled?: boolean
}

export function OrderBook({ data, onPriceClick, option1Label = 'Trade Yes', option2Label = 'Trade No', selectedOptionIndex = 0, onToggleOption, hideTitle = false, unstyled = false }: OrderBookProps) {
  const formatPrice = (price: number) => `${price}¢`
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`
  const isSecond = selectedOptionIndex === 1

  const Content = (
    <>
      <div className="flex items-center justify-between mb-4">
        {!hideTitle && <h3 className="text-sm font-semibold text-white">Order book</h3>}
        {/* Segmented control showing both options */}
        <div className="relative inline-flex rounded-full border border-white/20 bg-white/5 p-1 text-xs">
          <span className={`pointer-events-none absolute inset-y-1 w-1/2 rounded-full transition-transform duration-300 ${selectedOptionIndex === 0 ? 'translate-x-0 bg-emerald-500/20' : 'translate-x-full bg-rose-500/20'}`}></span>
          <button
            type="button"
            onClick={() => onToggleOption?.(0)}
            className={`relative z-10 px-3 py-1.5 rounded-full transition-colors ${selectedOptionIndex === 0 ? 'text-emerald-100' : 'text-emerald-400 hover:text-emerald-300'}`}
          >
            {option1Label}
          </button>
          <button
            type="button"
            onClick={() => onToggleOption?.(1)}
            className={`relative z-10 px-3 py-1.5 rounded-full transition-colors ${selectedOptionIndex === 1 ? 'text-rose-100' : 'text-rose-400 hover:text-rose-300'}`}
          >
            {option2Label}
          </button>
        </div>
      </div>

      <div className="space-y-1">
        {/* Header */}
        <div className="grid grid-cols-3 gap-2 text-xs text-white/60 pb-2 border-b border-white/10">
          <span>Price</span>
          <span className="text-right">Contracts</span>
          <span className="text-right">Total</span>
        </div>

        {/* Asks (Sell orders) */}
        <div className="space-y-0.5">
          {data.asks.slice(0, 4).map((ask, idx) => (
            <div 
              key={`ask-${idx}`}
              className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-red-500/10 cursor-pointer transition rounded"
              onClick={() => onPriceClick?.(ask.price, 'sell')}
            >
              <span className="text-red-400 font-medium">{formatPrice(ask.price)}</span>
              <span className="text-white/80 text-right">{ask.contracts.toLocaleString()}</span>
              <span className="text-white/60 text-right">{formatCurrency(ask.total)}</span>
            </div>
          ))}
        </div>

        {/* Last trade indicator */}
        {data.lastTrade && (
          <div className="flex items-center justify-center py-2 border-y border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-medium">
                {formatPrice(data.lastTrade.price)}
              </span>
              <span className="text-xs text-white/60">Last 24h</span>
            </div>
          </div>
        )}

        {/* Bids (Buy orders) */}
        <div className="space-y-0.5">
          {data.bids.slice(0, 4).map((bid, idx) => (
            <div 
              key={`bid-${idx}`}
              className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-green-500/10 cursor-pointer transition rounded"
              onClick={() => onPriceClick?.(bid.price, 'buy')}
            >
              <span className="text-green-400 font-medium">{formatPrice(bid.price)}</span>
              <span className="text-white/80 text-right">{bid.contracts.toLocaleString()}</span>
              <span className="text-white/60 text-right">{formatCurrency(bid.total)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )

  if (unstyled) {
    return <div className="p-4">{Content}</div>
  }

  return (
    <Card className="bg-white/10 border border-white/20 p-4">
      {Content}
    </Card>
  )
}
