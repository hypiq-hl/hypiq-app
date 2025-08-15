"use client"

import { InfiniteSlider } from '@/components/core/infinite-slider'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'
import Image from 'next/image'

interface MarketCardData {
  id: string
  title: string
  yesPrice: number
  noPrice: number
  volume: number
  participants: number
  timeLeft: string
  category: string
  trend: 'up' | 'down' | 'stable'
  creator: {
    name: string
    avatar: string
  }
  status: 'hot' | 'trending' | 'ending-soon'
  positionSize: string
  positionType: 'long' | 'short'
}

const mockMarkets: MarketCardData[] = [
  {
    id: '1',
    title: 'bitcoin',
    yesPrice: 68,
    noPrice: 32,
    volume: 12551160,
    participants: 1250,
    timeLeft: '5d 12h',
    category: 'Whale Position',
    trend: 'up',
    creator: { name: '0x7...2f5A', avatar: '🐋' },
    status: 'hot',
    positionSize: '$25M',
    positionType: 'long'
  },
  {
    id: '2', 
    title: 'ethereum',
    yesPrice: 43,
    noPrice: 57,
    volume: 15670000,
    participants: 734,
    timeLeft: '18h 45m',
    category: 'Whale Position',
    trend: 'down',
    creator: { name: '0x1...d7aB', avatar: '🐋' },
    status: 'ending-soon',
    positionSize: '$32M',
    positionType: 'short'
  },
  {
    id: '3',
    title: 'solana',
    yesPrice: 73,
    noPrice: 27,
    volume: 8901000,
    participants: 654,
    timeLeft: '6d 9h',
    category: 'Whale Position',
    trend: 'up',
    creator: { name: '0x4...c5aF', avatar: '🐋' },
    status: 'hot',
    positionSize: '$35M',
    positionType: 'long'
  },
  {
    id: '4',
    title: 'doge',
    yesPrice: 29,
    noPrice: 71,
    volume: 4567000,
    participants: 321,
    timeLeft: '1d 18h',
    category: 'Whale Position',
    trend: 'down',
    creator: { name: '0x8...a9bD', avatar: '🐋' },
    status: 'ending-soon',
    positionSize: '$8M',
    positionType: 'short'
  },
  {
    id: '5',
    title: 'xrp',
    yesPrice: 52,
    noPrice: 48,
    volume: 9876000,
    participants: 1876,
    timeLeft: '45d 12h',
    category: 'Whale Position',
    trend: 'down',
    creator: { name: '0x5...c9aD', avatar: '🐋' },
    status: 'trending',
    positionSize: '$45M',
    positionType: 'short'
  },
  {
    id: '6',
    title: 'bnb',
    yesPrice: 81,
    noPrice: 19,
    volume: 11234000,
    participants: 654,
    timeLeft: '7d 3h',
    category: 'Whale Position',
    trend: 'up',
    creator: { name: '0x3...b2aC', avatar: '🐋' },
    status: 'hot',
    positionSize: '$67M',
    positionType: 'long'
  },
  {
    id: '7',
    title: 'bitcoin',
    yesPrice: 66,
    noPrice: 34,
    volume: 9543000,
    participants: 789,
    timeLeft: '8h 22m',
    category: 'Whale Position',
    trend: 'up',
    creator: { name: '0x2...e3bA', avatar: '🐋' },
    status: 'ending-soon',
    positionSize: '$28M',
    positionType: 'long'
  },
  {
    id: '8',
    title: 'ethereum',
    yesPrice: 45,
    noPrice: 55,
    volume: 6789000,
    participants: 432,
    timeLeft: '12d 6h',
    category: 'Whale Position',
    trend: 'stable',
    creator: { name: '0xa...d6aC', avatar: '🐋' },
    status: 'hot',
    positionSize: '$22M',
    positionType: 'short'
  },
  {
    id: '9',
    title: 'solana',
    yesPrice: 59,
    noPrice: 41,
    volume: 6234000,
    participants: 2100,
    timeLeft: '15d 6h',
    category: 'Whale Position',
    trend: 'stable',
    creator: { name: '0x9...a8bF', avatar: '🐋' },
    status: 'hot',
    positionSize: '$12M',
    positionType: 'long'
  },
  {
    id: '10',
    title: 'doge',
    yesPrice: 74,
    noPrice: 26,
    volume: 8945000,
    participants: 892,
    timeLeft: '2d 8h',
    category: 'Whale Position',
    trend: 'up',
    creator: { name: '0x8...c1aE', avatar: '🐋' },
    status: 'trending',
    positionSize: '$18M',
    positionType: 'long'
  },
  {
    id: '11',
    title: 'xrp',
    yesPrice: 37,
    noPrice: 63,
    volume: 7892000,
    participants: 543,
    timeLeft: '3d 14h',
    category: 'Whale Position',
    trend: 'down',
    creator: { name: '0x6...f1aB', avatar: '🐋' },
    status: 'trending',
    positionSize: '$15M',
    positionType: 'short'
  },
  {
    id: '12',
    title: 'bnb',
    yesPrice: 38,
    noPrice: 62,
    volume: 5432000,
    participants: 876,
    timeLeft: '4d 11h',
    category: 'Whale Position',
    trend: 'down',
    creator: { name: '0x7...f8aE', avatar: '🐋' },
    status: 'trending',
    positionSize: '$19M',
    positionType: 'short'
  }
]

interface MarketCardSliderProps {
  reverse?: boolean
  speed?: string
  className?: string
}

function CompactMarketCard({ market }: { market: MarketCardData }) {
  return (
    <Card className="w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-br from-[#0a0f14] to-[#12191d] border border-white/10 p-4 sm:p-5 hover:border-white/20 transition-all duration-300 group cursor-pointer flex flex-col rounded-2xl">
      {/* Header with Position Size Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
            <AvatarFallback className="text-xs bg-white/10 text-white">
              {market.creator.avatar}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-white/70 truncate">{market.creator.name}</span>
        </div>
        <Badge className={`text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 flex items-center gap-1 ${
          market.positionType === 'long' 
            ? 'bg-green-500/20 text-green-400 border-green-500/30' 
            : 'bg-red-500/20 text-red-400 border-red-500/30'
        }`}>
          {market.positionType === 'long' ? <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
          <span className="hidden sm:inline">{market.positionSize}</span>
          <span className="sm:hidden">{market.positionSize.replace('$', '').replace('M', 'M')}</span>
        </Badge>
      </div>

      {/* Asset Logo */}
      <div className="flex justify-center mb-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
          <Image 
            src={`/coin-logos/${market.title}.png`} 
            alt={market.title} 
            width={32} 
            height={32} 
            className={`w-6 h-6 sm:w-8 sm:h-8 object-contain ${market.title === 'xrp' ? 'invert' : ''}`} 
          />
        </div>
      </div>

      {/* Question */}
      <p className="text-xs sm:text-sm text-white/70 mb-4 sm:mb-5 text-center flex-1 leading-tight">
        This whale will close position in profit/loss?
      </p>

      {/* Horizontal Prices with Background Fill */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="relative border border-green-500/20 rounded-xl p-2.5 sm:p-3 text-center hover:border-green-500/30 transition-colors overflow-hidden">
          {/* Background fill based on percentage - vertical */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-green-500/20 transition-all duration-500 rounded-xl"
            style={{ height: `${market.yesPrice}%` }}
          />
          <div className="relative z-10">
            <div className="text-xs text-white/70 mb-1">Profit</div>
            <div className="text-lg sm:text-xl font-bold text-green-400">{market.yesPrice}%</div>
            <div className="text-xs text-white/50 mt-1">Yes</div>
          </div>
        </div>
        <div className="relative border border-red-500/20 rounded-xl p-2.5 sm:p-3 text-center hover:border-red-500/30 transition-colors overflow-hidden">
          {/* Background fill based on percentage - vertical */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-red-500/20 transition-all duration-500 rounded-xl"
            style={{ height: `${market.noPrice}%` }}
          />
          <div className="relative z-10">
            <div className="text-xs text-white/70 mb-1">Loss</div>
            <div className="text-lg sm:text-xl font-bold text-red-400">{market.noPrice}%</div>
            <div className="text-xs text-white/50 mt-1">No</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function MarketCardsSlider({ reverse = false, speed = "30s", className }: MarketCardSliderProps) {
  return (
    <div className={className}>
      <InfiniteSlider
        gap={16}
        reverse={reverse}
        speed={speed}
        pauseOnHover={true}
        repeat={3}
        className="py-3 sm:py-4"
      >
        {mockMarkets.map((market) => (
          <CompactMarketCard key={market.id} market={market} />
        ))}
      </InfiniteSlider>
    </div>
  )
}
