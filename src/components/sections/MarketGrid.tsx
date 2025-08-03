'use client'

import { useState, useEffect } from 'react'
import { MarketCard } from '@/components/market/MarketCard'
import { MarketCardSkeleton } from '@/components/market/MarketCardSkeleton'
import { WhaleNotification } from '@/components/ui/notification'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Filter, TrendingUp, Clock, Flame } from 'lucide-react'

// Mock data for trader positions
const mockMarkets = [
  {
    id: '1',
    title: 'Will close in profit',
    description: 'Position tracking',
    creator: {
      name: 'Whale #33',
      avatar: '🐋',
      address: '0x742d35Cc6Ba1f23e8976543'
    },
    position: {
      type: 'longed',
      amount: '25M',
      currency: 'USD'
    },
    yesPrice: 0.67,
    noPrice: 0.33,
    yesVolume: 89000,
    noVolume: 45000,
    totalVolume: 134000,
    endTime: new Date('2025-01-31'),
    category: 'Crypto',
    participants: 234,
    timeLeft: '?',
    status: 'active' as const
  },
  {
    id: '2',
    title: 'Will close in profit',
    description: 'Position tracking',
    creator: {
      name: 'Shark #127',
      avatar: '🦈',
      address: '0x8ba1f109ea7d42c8e36f5'
    },
    position: {
      type: 'shorted',
      amount: '2.5M',
      currency: 'USD'
    },
    yesPrice: 0.73,
    noPrice: 0.27,
    yesVolume: 156000,
    noVolume: 58000,
    totalVolume: 214000,
    endTime: new Date('2025-03-15'),
    category: 'Crypto',
    participants: 567,
    timeLeft: '?',
    status: 'active' as const
  },
  {
    id: '3',
    title: 'Will close in profit',
    description: 'Position tracking',
    creator: {
      name: 'Dolphin #89',
      avatar: '🐬',
      address: '0x123abc456d9f8e7c2b1a'
    },
    position: {
      type: 'longed',
      amount: '750K',
      currency: 'USD'
    },
    yesPrice: 0.58,
    noPrice: 0.42,
    yesVolume: 98000,
    noVolume: 71000,
    totalVolume: 169000,
    endTime: new Date('2025-12-31'),
    category: 'Tech',
    participants: 189,
    timeLeft: '?',
    status: 'active' as const
  },
  {
    id: '4',
    title: 'Will close in profit',
    description: 'Position tracking',
    creator: {
      name: 'Fish #245',
      avatar: '🐟',
      address: '0x456def789a3c5e8f1b9d'
    },
    position: {
      type: 'longed',
      amount: '50K',
      currency: 'USD'
    },
    yesPrice: 0.81,
    noPrice: 0.19,
    yesVolume: 234000,
    noVolume: 54000,
    totalVolume: 288000,
    endTime: new Date('2026-01-01'),
    category: 'Tech',
    participants: 892,
    timeLeft: '?',
    status: 'active' as const
  },
  {
    id: '5',
    title: 'Will close in profit',
    description: 'Position tracking',
    creator: {
      name: 'Shrimp #156',
      avatar: '🦐',
      address: '0x789ghi012b4f6a8c3e5d'
    },
    position: {
      type: 'shorted',
      amount: '5.2K',
      currency: 'USD'
    },
    yesPrice: 0.34,
    noPrice: 0.66,
    yesVolume: 67000,
    noVolume: 129000,
    totalVolume: 196000,
    endTime: new Date('2025-12-31'),
    category: 'Politics',
    participants: 445,
    timeLeft: '?',
    status: 'active' as const
  },
  {
    id: '6',
    title: 'Will close in profit',
    description: 'Position tracking',
    creator: {
      name: 'Whale #78',
      avatar: '🐋',
      address: '0xabc123def4e9a7b5c8f2'
    },
    position: {
      type: 'longed',
      amount: '18M',
      currency: 'USD'
    },
    yesPrice: 0.45,
    noPrice: 0.55,
    yesVolume: 123000,
    noVolume: 156000,
    totalVolume: 279000,
    endTime: new Date('2025-12-31'),
    category: 'Crypto',
    participants: 678,
    timeLeft: '?',
    status: 'active' as const
  },
  // Add 6 more mock positions
  {
    id: '7',
    title: 'Will close in profit',
    description: 'Position tracking',
    creator: {
      name: 'Shark #301',
      avatar: '🦈',
      address: '0xdef456ghi789jkl012mn'
    },
    position: {
      type: 'longed',
      amount: '3.2M',
      currency: 'USD'
    },
    yesPrice: 0.58,
    noPrice: 0.42,
    yesVolume: 98000,
    noVolume: 71000,
    totalVolume: 169000,
    endTime: new Date('2025-12-31'),
    category: 'Crypto',
    participants: 189,
    timeLeft: '?',
    status: 'active' as const
  },
  {
    id: '8',
    title: 'Will close in profit',
    description: 'Position tracking',
    creator: {
      name: 'Dolphin #402',
      avatar: '🐬',
      address: '0x123def456ghi789abc012'
    },
    position: {
      type: 'shorted',
      amount: '890K',
      currency: 'USD'
    },
    yesPrice: 0.34,
    noPrice: 0.66,
    yesVolume: 67000,
    noVolume: 129000,
    totalVolume: 196000,
    endTime: new Date('2025-12-31'),
    category: 'Crypto',
    participants: 445,
    timeLeft: '?',
    status: 'active' as const
  },
  {
    id: '9',
    title: 'Will close in profit',
    description: 'Position tracking',
    creator: {
      name: 'Fish #503',
      avatar: '🐟',
      address: '0x789abc123def456ghi012'
    },
    position: {
      type: 'longed',
      amount: '125K',
      currency: 'USD'
    },
    yesPrice: 0.72,
    noPrice: 0.28,
    yesVolume: 234000,
    noVolume: 54000,
    totalVolume: 288000,
    endTime: new Date('2026-01-01'),
    category: 'Crypto',
    participants: 892,
    timeLeft: '?',
    status: 'active' as const
  },
  {
    id: '10',
    title: 'Will close in profit',
    description: 'Position tracking',
    creator: {
      name: 'Shrimp #604',
      avatar: '🦐',
      address: '0xabc789def123ghi456jkl'
    },
    position: {
      type: 'shorted',
      amount: '8.5K',
      currency: 'USD'
    },
    yesPrice: 0.41,
    noPrice: 0.59,
    yesVolume: 123000,
    noVolume: 156000,
    totalVolume: 279000,
    endTime: new Date('2025-12-31'),
    category: 'Crypto',
    participants: 678,
    timeLeft: '?',
    status: 'active' as const
  },
  {
    id: '11',
    title: 'Will close in profit',
    description: 'Position tracking',
    creator: {
      name: 'Whale #705',
      avatar: '🐋',
      address: '0x456jkl789abc012def345'
    },
    position: {
      type: 'longed',
      amount: '42M',
      currency: 'USD'
    },
    yesPrice: 0.69,
    noPrice: 0.31,
    yesVolume: 345000,
    noVolume: 155000,
    totalVolume: 500000,
    endTime: new Date('2025-12-31'),
    category: 'Crypto',
    participants: 1234,
    timeLeft: '?',
    status: 'active' as const
  },
  {
    id: '12',
    title: 'Will close in profit',
    description: 'Position tracking',
    creator: {
      name: 'Shark #806',
      avatar: '🦈',
      address: '0x789ghi012jkl345abc678'
    },
    position: {
      type: 'shorted',
      amount: '6.8M',
      currency: 'USD'
    },
    yesPrice: 0.33,
    noPrice: 0.67,
    yesVolume: 87000,
    noVolume: 176000,
    totalVolume: 263000,
    endTime: new Date('2025-12-31'),
    category: 'Crypto',
    participants: 567,
    timeLeft: '?',
    status: 'active' as const
  }
]

export function MarketGrid() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('trending')
  const [displayedMarkets, setDisplayedMarkets] = useState<typeof mockMarkets>([])
  const [nextWhaleId, setNextWhaleId] = useState(1000)
  const [notification, setNotification] = useState<any>(null)

  // Generate random whale/fish position
  const generateRandomPosition = () => {
    const types = ['longed', 'shorted']
    const amounts = ['1.2K', '5.8K', '15.3K', '50.2K', '120K', '380K', '750K', '1.2M', '3.5M', '8.7M', '15.2M', '25.8M', '50.1M', '100M']
    const prices = [
      { yes: Math.random() * 0.4 + 0.3, no: Math.random() * 0.4 + 0.3 },
    ]
    const volumes = Math.floor(Math.random() * 200000) + 50000
    const participants = Math.floor(Math.random() * 500) + 100

    // Determine creature type based on amount
    const amount = amounts[Math.floor(Math.random() * amounts.length)]
    const amountValue = parseFloat(amount.replace(/[KM]/g, '')) * (amount.includes('M') ? 1000000 : amount.includes('K') ? 1000 : 1)
    
    let creatureType, emoji
    if (amountValue >= 10000000) { // 10M+
      creatureType = 'Whale'
      emoji = '🐋'
    } else if (amountValue >= 1000000) { // 1M+
      creatureType = 'Shark' 
      emoji = '🦈'
    } else if (amountValue >= 100000) { // 100K+
      creatureType = 'Dolphin'
      emoji = '🐬'
    } else if (amountValue >= 10000) { // 10K+
      creatureType = 'Fish'
      emoji = '🐟'
    } else {
      creatureType = 'Shrimp'
      emoji = '🦐'
    }

    const price = prices[0]
    return {
      id: `trader-${nextWhaleId}`,
      title: 'Will close in profit',
      description: 'Position tracking',
      creator: {
        name: `${creatureType} #${nextWhaleId}`,
        avatar: emoji,
        address: `0x${Math.random().toString(16).substr(2, 18)}`
      },
      position: {
        type: types[Math.floor(Math.random() * types.length)],
        amount: amount,
        currency: 'USD'
      },
      yesPrice: price.yes,
      noPrice: 1 - price.yes,
      yesVolume: Math.floor(volumes * price.yes),
      noVolume: Math.floor(volumes * (1 - price.yes)),
      totalVolume: volumes,
      endTime: new Date(Date.now() + Math.random() * 86400000),
      category: 'Crypto',
      participants,
      timeLeft: '?',
      status: 'active' as const
    }
  }

  useEffect(() => {
    // Initial load
    const timer = setTimeout(() => {
      setDisplayedMarkets(mockMarkets)
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Add new whale every 5 seconds
    if (!loading) {
      const interval = setInterval(() => {
        const newPosition = generateRandomPosition()
        setDisplayedMarkets(prev => [newPosition, ...prev.slice(0, 11)]) // Keep only 12 markets
        setNextWhaleId(prev => prev + 1)
        
        // Show notification
        setNotification({
          name: newPosition.creator.name,
          position: newPosition.position
        })
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [loading, nextWhaleId])

  return (
    <>
      {notification && (
        <WhaleNotification 
          whale={notification} 
          onClose={() => setNotification(null)} 
        />
      )}
      
      <div className="container mx-auto px-4 py-6 relative">
        {/* Animated background grid */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-blue-500/20 to-transparent animate-pulse"></div>
          <div className="absolute top-20 right-1/3 w-px h-40 bg-gradient-to-b from-purple-500/20 to-transparent animate-pulse delay-500"></div>
          <div className="absolute bottom-0 left-1/2 w-px h-28 bg-gradient-to-t from-green-500/20 to-transparent animate-pulse delay-1000"></div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="group">
              <h1 className="text-2xl font-bold mb-2 text-white">
                Markets
              </h1>
              <p className="text-muted-foreground group-hover:text-white/70 transition-colors">
                Bet on real-world events
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="backdrop-blur-sm bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                <Filter className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                Filter
              </Button>
              
              {/* Enhanced Tabs */}
              <TabsList className="grid grid-cols-3 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <TabsTrigger value="trending" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/20 data-[state=active]:to-red-500/20 data-[state=active]:text-orange-300 data-[state=active]:shadow-lg data-[state=active]:shadow-orange-500/20 transition-all duration-300 hover:scale-105">
                  <Flame className="h-4 w-4 data-[state=active]:animate-bounce" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="new" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:text-blue-300 data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/20 transition-all duration-300 hover:scale-105">
                  <Clock className="h-4 w-4 data-[state=active]:animate-spin" />
                  New
                </TabsTrigger>
                <TabsTrigger value="ending" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/20 data-[state=active]:to-emerald-500/20 data-[state=active]:text-green-300 data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/20 transition-all duration-300 hover:scale-105">
                  <TrendingUp className="h-4 w-4 data-[state=active]:animate-pulse" />
                  Ending Soon
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="trending" className="space-y-6 relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 rounded-lg pointer-events-none"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
              {loading
                ? Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="animate-pulse delay-[${i * 100}ms]">
                      <MarketCardSkeleton />
                    </div>
                  ))
                : displayedMarkets.map((market, index) => (
                    <div 
                      key={market.id} 
                      className="hover:scale-[1.02] transition-all duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <MarketCard market={market} />
                    </div>
                  ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 rounded-lg pointer-events-none"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
              {loading
                ? Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="animate-pulse delay-[${i * 100}ms]">
                      <MarketCardSkeleton />
                    </div>
                  ))
                : displayedMarkets
                    .slice()
                    .reverse()
                    .map((market, index) => (
                      <div 
                        key={market.id} 
                        className="hover:scale-[1.02] transition-all duration-300"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <MarketCard market={market} />
                      </div>
                    ))}
            </div>
          </TabsContent>

          <TabsContent value="ending" className="space-y-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 rounded-lg pointer-events-none"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
              {loading
                ? Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="animate-pulse delay-[${i * 100}ms]">
                      <MarketCardSkeleton />
                    </div>
                  ))
                : displayedMarkets
                    .filter(market => Math.random() > 0.3) // Simulate some ending soon
                    .map((market, index) => (
                      <div 
                        key={market.id} 
                        className="hover:scale-[1.02] transition-all duration-300"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <MarketCard market={market} />
                      </div>
                    ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
} 