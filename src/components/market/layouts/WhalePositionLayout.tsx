'use client'

import { BaseMarketLayout } from './BaseMarketLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BetTypeConfig } from '@/types/betTypes'
import { Market } from '@/data/markets'
import { OrderBookData } from '@/components/ui/OrderBook'
import { AlertTriangle, Shield, TrendingUp, Users, ExternalLink } from 'lucide-react'

interface WhalePositionLayoutProps {
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

export function WhalePositionLayout(props: WhalePositionLayoutProps) {
  const { market, betType } = props

  // Mock whale position data
  const whalePosition = {
    address: '0x1234...5678',
    platform: 'Hyperliquid',
    symbol: 'BTC-USD',
    side: 'SHORT',
    size: 2.5,
    entryPrice: 43200,
    currentPrice: 42150,
    leverage: 10,
    marginRatio: 0.15,
    liquidationPrice: 44800,
    pnl: 2625,
    pnlPercentage: 6.08,
    openTime: '2h ago'
  }

  const liquidationRisk = ((whalePosition.currentPrice - whalePosition.liquidationPrice) / whalePosition.liquidationPrice) * 100

  // Custom sections for whale position markets
  const customSections = (
    <div className="mt-8 space-y-6">
      {/* Whale Position Details */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Whale Position Details</h2>
        <Card className="bg-white/5 border border-white/10 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-white/70 mb-1">Whale Address</div>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-white/90">{whalePosition.address}</code>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-white/70 mb-1">Platform</div>
                <div className="text-sm font-medium text-white/90">{whalePosition.platform}</div>
              </div>
              
              <div>
                <div className="text-sm text-white/70 mb-1">Position</div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    whalePosition.side === 'LONG' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {whalePosition.side}
                  </span>
                  <span className="text-sm font-medium text-white/90">
                    {whalePosition.size} {whalePosition.symbol}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-white/70 mb-1">Entry Price</div>
                <div className="text-sm font-medium text-white/90">${whalePosition.entryPrice.toLocaleString()}</div>
              </div>
              
              <div>
                <div className="text-sm text-white/70 mb-1">Current Price</div>
                <div className="text-sm font-medium text-white/90">${whalePosition.currentPrice.toLocaleString()}</div>
              </div>
              
              <div>
                <div className="text-sm text-white/70 mb-1">Leverage</div>
                <div className="text-sm font-medium text-white/90">{whalePosition.leverage}x</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Risk Metrics */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Risk Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-sm font-medium text-white/90">Liquidation Risk</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Liquidation Price</span>
                <span className="text-sm font-medium text-red-400">${whalePosition.liquidationPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Distance</span>
                <span className="text-sm font-medium text-red-400">{Math.abs(liquidationRisk).toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(Math.abs(liquidationRisk), 100)} className="h-2" />
            </div>
          </Card>
          
          <Card className="bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white/90">Margin Status</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Margin Ratio</span>
                <span className="text-sm font-medium text-blue-400">{(whalePosition.marginRatio * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Status</span>
                <span className={`text-sm font-medium ${
                  whalePosition.marginRatio > 0.1 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {whalePosition.marginRatio > 0.1 ? 'Safe' : 'At Risk'}
                </span>
              </div>
              <Progress value={whalePosition.marginRatio * 100} className="h-2" />
            </div>
          </Card>
        </div>
      </div>

      {/* P&L Analysis */}
      <div>
        <h2 className="text-lg font-semibold mb-4">P&L Analysis</h2>
        <Card className="bg-white/5 border border-white/10 p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-white/70 mb-1">Unrealized P&L</div>
              <div className={`text-lg font-bold ${whalePosition.pnl > 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${whalePosition.pnl > 0 ? '+' : ''}{whalePosition.pnl.toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/70 mb-1">P&L Percentage</div>
              <div className={`text-lg font-bold ${whalePosition.pnlPercentage > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {whalePosition.pnlPercentage > 0 ? '+' : ''}{whalePosition.pnlPercentage}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/70 mb-1">Open Time</div>
              <div className="text-lg font-bold text-white/90">{whalePosition.openTime}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Similar Positions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Similar Whale Positions</h2>
        <Card className="bg-white/5 border border-white/10 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <code className="text-xs font-mono text-white/70">0x9876...4321</code>
                <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400">SHORT</span>
                <span className="text-xs text-white/70">1.8 BTC-USD</span>
              </div>
              <span className="text-xs text-red-400">-$1,200</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <code className="text-xs font-mono text-white/70">0x5432...8765</code>
                <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400">LONG</span>
                <span className="text-xs text-white/70">3.2 BTC-USD</span>
              </div>
              <span className="text-xs text-green-400">+$2,800</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <code className="text-xs font-mono text-white/70">0x1357...9024</code>
                <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400">SHORT</span>
                <span className="text-xs text-white/70">0.9 BTC-USD</span>
              </div>
              <span className="text-xs text-green-400">+$450</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )

  // Custom trading panel for whale positions
  const customTradingPanel = (
    <Card className="bg-white/10 border border-white/20 p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-white" />
          </div>
        </div>
        <div>
          <div className="text-sm text-white/90">Whale Position Bet</div>
          <div className="text-xs text-white/60">Liquidation Risk</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
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
      
      {/* Position-specific info */}
      <div className="bg-white/5 rounded p-3 mb-4">
        <div className="text-xs text-white/70 mb-2">Position Details</div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-white/60">Size:</span>
            <span className="text-white/90">{whalePosition.size} BTC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Leverage:</span>
            <span className="text-white/90">{whalePosition.leverage}x</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Liq. Price:</span>
            <span className="text-red-400">${whalePosition.liquidationPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-white/60 mb-2">Amount</div>
      <input className="w-full mt-1 mb-4 rounded bg-white/10 border border-white/20 px-3 py-2 text-sm outline-none" placeholder="$0" />
      
      <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white mb-3">
        Connect Wallet to Trade
      </Button>
      
      <p className="text-xs text-white/70 text-center">
        By trading, you agree to the <a href="https://hypiq.finance/terms" target="_blank" rel="noopener noreferrer" className="font-semibold underline">Terms of Use</a>.
      </p>
    </Card>
  )

  return (
    <BaseMarketLayout
      {...props}
      customSections={customSections}
      customTradingPanel={customTradingPanel}
    />
  )
}
