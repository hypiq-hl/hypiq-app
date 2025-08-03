'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { BettingModal } from '@/components/modals/BettingModal'
import { useWallet } from '@/contexts/WalletContext'
import { formatCurrency, formatLargeNumber } from '@/lib/utils'
import { TrendingUp, Users, DollarSign, Zap, Timer, Wallet } from 'lucide-react'

interface MarketCardProps {
  market: {
    id: string
    title: string
    description: string
    creator: {
      name: string
      avatar: string
      address: string
    }
    position: {
      type: string
      amount: string
      currency: string
    }
    yesPrice: number
    noPrice: number
    yesVolume: number
    noVolume: number
    totalVolume: number
    endTime: Date
    category: string
    participants: number
    timeLeft: string
    status: 'active' | 'ending-soon' | 'ended'
  }
}

export function MarketCard({ market }: MarketCardProps) {
  const { isConnected, connect } = useWallet()
  const [showBettingModal, setShowBettingModal] = useState(false)
  const [selectedSide, setSelectedSide] = useState<'yes' | 'no'>('yes')

  const yesPercentage = (market.yesPrice * 100)
  const noPercentage = (market.noPrice * 100)

  const handleBet = async (side: 'yes' | 'no') => {
    if (!isConnected) {
      await connect()
      return
    }
    
    setSelectedSide(side)
    setShowBettingModal(true)
  }

  // Dynamic card styling based on position type
  const isLong = market.position.type === 'longed'
  const cardHoverColor = isLong ? 'hover:shadow-green-500/20' : 'hover:shadow-red-500/20'

  return (
    <>
      <Card className={`p-4 hover:border-accent-foreground/30 transition-all duration-500 cursor-pointer group bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:scale-[1.02] hover:shadow-xl ${cardHoverColor} relative overflow-hidden`}>
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Position type indicator */}
        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${isLong ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>

        {/* Wallet connection indicator */}
        {!isConnected && (
          <div className="absolute top-2 left-2">
            <Wallet className="h-4 w-4 text-yellow-400 animate-pulse" />
          </div>
        )}

        {/* Header with whale info */}
        <div className="flex items-start justify-between mb-3 relative z-10">
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="h-8 w-8 group-hover:scale-110 transition-transform duration-300 ring-2 ring-white/20 group-hover:ring-white/40">
              <AvatarFallback className="text-lg group-hover:scale-110 transition-transform">{market.creator.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p 
                className="text-sm font-medium truncate cursor-pointer hover:text-accent-foreground transition-colors group-hover:text-white" 
                title={market.creator.address}
              >
                {market.creator.name}
              </p>
              <p className="text-xs text-muted-foreground group-hover:text-white/70 transition-colors flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {market.position.type} {market.position.amount}${market.position.currency}
              </p>
            </div>
          </div>
        </div>

        {/* Question */}
        <h3 className="text-sm font-medium mb-3 group-hover:text-white transition-colors flex items-center gap-1">
          <Timer className="h-3 w-3 animate-pulse" />
          Position outcome {market.timeLeft}
        </h3>

        {/* Betting Options */}
        <div className="grid grid-cols-2 gap-2 mb-4 relative z-10">
          <Button
            variant="outline"
            onClick={() => handleBet('yes')}
            className="h-auto p-3 flex flex-col items-center gap-1 bg-green-500/10 border-green-500/20 hover:bg-green-500/30 hover:border-green-500/40 hover:scale-105 transition-all duration-300 group/profit"
          >
            <span className="text-xs text-muted-foreground group-hover/profit:text-green-200">
              {!isConnected ? (
                <div className="flex items-center gap-1">
                  <Wallet className="h-3 w-3" />
                  Connect
                </div>
              ) : (
                'Profit'
              )}
            </span>
            <span className="text-lg font-bold text-green-400 group-hover/profit:text-green-300 group-hover/profit:scale-110 transition-all">{yesPercentage.toFixed(0)}¢</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleBet('no')}
            className="h-auto p-3 flex flex-col items-center gap-1 bg-red-500/10 border-red-500/20 hover:bg-red-500/30 hover:border-red-500/40 hover:scale-105 transition-all duration-300 group/loss"
          >
            <span className="text-xs text-muted-foreground group-hover/loss:text-red-200">
              {!isConnected ? (
                <div className="flex items-center gap-1">
                  <Wallet className="h-3 w-3" />
                  Connect
                </div>
              ) : (
                'Loss'
              )}
            </span>
            <span className="text-lg font-bold text-red-400 group-hover/loss:text-red-300 group-hover/loss:scale-110 transition-all">{noPercentage.toFixed(0)}¢</span>
          </Button>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="relative mb-3 group-hover:scale-105 transition-transform duration-300">
          <Progress value={yesPercentage} className="h-4 bg-white/10" />
          <div className="absolute inset-0 flex items-center justify-between px-2">
            <span className="text-sm font-bold text-white drop-shadow-sm animate-pulse">{yesPercentage.toFixed(0)}%</span>
            <span className="text-sm font-bold text-red-400 drop-shadow-sm animate-pulse">{noPercentage.toFixed(0)}%</span>
          </div>
          {/* Animated progress glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-red-500/20 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        </div>

        {/* Enhanced Footer Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground group-hover:text-white/80 transition-colors relative z-10">
          <div className="flex items-center gap-1 hover:text-blue-400 transition-colors cursor-pointer">
            <DollarSign className="h-3 w-3 animate-bounce" />
            {formatLargeNumber(market.totalVolume)}
          </div>
          <div className="flex items-center gap-1 hover:text-green-400 transition-colors cursor-pointer">
            <Users className="h-3 w-3 animate-pulse" />
            {market.participants}
          </div>
          <div className="flex items-center gap-1 hover:text-purple-400 transition-colors cursor-pointer">
            <TrendingUp className="h-3 w-3 animate-pulse" />
            Vol
          </div>
        </div>

        {/* Subtle hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </Card>

      <BettingModal
        isOpen={showBettingModal}
        onClose={() => setShowBettingModal(false)}
        position={{
          id: market.id,
          symbol: market.title,
          whaleAddress: market.creator.address,
          positionType: market.position.type,
          positionSize: market.totalVolume,
          currentPnl: yesPercentage - 50,
          profitOdds: selectedSide === 'yes' ? market.yesPrice : market.noPrice,
          lossOdds: selectedSide === 'yes' ? market.noPrice : market.yesPrice,
        }}
        side={selectedSide === 'yes' ? 'profit' : 'loss'}
      />
    </>
  )
} 