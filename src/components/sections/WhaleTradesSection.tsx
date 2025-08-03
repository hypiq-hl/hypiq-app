'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Clock, ExternalLink, Target } from 'lucide-react'
import { formatCurrency, formatLargeNumber, formatPercentage } from '@/lib/utils'

// Mock data for demonstration
const mockWhalePositions = [
  {
    id: '1',
    whaleAddress: '0x742d35Cc6Ba...',
    symbol: 'BTC',
    positionType: 'long' as const,
    entryPrice: 43250,
    currentPrice: 44100,
    positionSize: 12500000,
    platform: 'Binance',
    timeOpen: '2h 34m',
    pnlPercentage: 1.96,
    totalBetsProfit: 125000,
    totalBetsLoss: 87500,
    profitOdds: 1.65,
    lossOdds: 2.35,
  },
  {
    id: '2',
    whaleAddress: '0x8ba1f109ea...',
    symbol: 'ETH',
    positionType: 'short' as const,
    entryPrice: 2650,
    currentPrice: 2598,
    positionSize: 8900000,
    platform: 'Coinbase',
    timeOpen: '4h 12m',
    pnlPercentage: -1.96,
    totalBetsProfit: 45000,
    totalBetsLoss: 78000,
    profitOdds: 2.1,
    lossOdds: 1.8,
  },
  {
    id: '3',
    whaleAddress: '0x123abc456d...',
    symbol: 'SOL',
    positionType: 'long' as const,
    entryPrice: 98.5,
    currentPrice: 101.2,
    positionSize: 5600000,
    platform: 'Bybit',
    timeOpen: '1h 45m',
    pnlPercentage: 2.74,
    totalBetsProfit: 67000,
    totalBetsLoss: 34000,
    profitOdds: 1.4,
    lossOdds: 2.8,
  },
]

export function WhaleTradesSection() {
  return (
    <section className="py-16 px-4 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Active Whale Positions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Live whale positions available for betting. Choose your side and place your bets.
          </p>
        </div>
        
        <div className="grid gap-6">
          {mockWhalePositions.map((position) => (
            <Card key={position.id} className="trading-card">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="whale-gradient rounded-lg p-2">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{position.symbol} Whale Position</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {position.whaleAddress} • {position.platform}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={position.positionType === 'long' ? 'long' : 'short'}>
                      {position.positionType.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {position.timeOpen}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Position Size</p>
                    <p className="text-lg font-semibold">{formatCurrency(position.positionSize)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Entry Price</p>
                    <p className="text-lg font-semibold">{formatCurrency(position.entryPrice)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Price</p>
                    <p className="text-lg font-semibold">{formatCurrency(position.currentPrice)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Unrealized P&L</p>
                    <p className={`text-lg font-semibold ${position.pnlPercentage > 0 ? 'text-profit' : 'text-loss'}`}>
                      {position.pnlPercentage > 0 ? '+' : ''}{formatPercentage(position.pnlPercentage)}
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="grid grid-cols-2 gap-6 flex-1">
                      <div className="text-center p-4 rounded-lg bg-profit/10 border border-profit/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-profit" />
                          <span className="font-medium">Will Close in Profit</span>
                        </div>
                        <p className="text-2xl font-bold text-profit">{position.profitOdds}x</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(position.totalBetsProfit)} wagered
                        </p>
                      </div>
                      
                      <div className="text-center p-4 rounded-lg bg-loss/10 border border-loss/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <TrendingDown className="h-4 w-4 text-loss" />
                          <span className="font-medium">Will Close in Loss</span>
                        </div>
                        <p className="text-2xl font-bold text-loss">{position.lossOdds}x</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(position.totalBetsLoss)} wagered
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                      <Button variant="profit" className="flex-1 lg:flex-none">
                        <Target className="h-4 w-4 mr-2" />
                        Bet Profit
                      </Button>
                      <Button variant="loss" className="flex-1 lg:flex-none">
                        <Target className="h-4 w-4 mr-2" />
                        Bet Loss
                      </Button>
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All Markets
          </Button>
        </div>
      </div>
    </section>
  )
} 