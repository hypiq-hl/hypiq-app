'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Target, Users, Search, Zap, Brain, Sparkles, Rocket, Eye } from 'lucide-react'

export function FeaturedSection() {
  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Featured Market */}
      <div className="mb-8 relative">
        <Card className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg border-white/10 overflow-hidden relative group hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500">
          {/* Wavy grid background */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="wavy-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 20c10-5 20-5 30 0s20 5 30 0" stroke="#acf3e1" strokeWidth="0.5" fill="none" opacity="0.3"/>
                  <path d="M0 0v40M20 0v40M40 0v40" stroke="#15221e" strokeWidth="0.3" fill="none" opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#wavy-grid)"/>
            </svg>
          </div>

          {/* Updated animated border glow with green gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#15221e]/30 via-[#acf3e1]/30 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          
          <CardContent className="p-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <Badge className="mb-4 bg-white backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  <Sparkles className="h-3 w-3 mr-1" />
                  🔥 Featured Position
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                  Whale #420 just opened a $50M Bitcoin long
                </h2>
                <p className="text-lg text-white/90 mb-2">
                  The biggest position of the week. Will this whale close in profit or get rekt?
                </p>
                <p className="text-lg text-white/90 mb-6">
                  <span className="text-[#acf3e1] font-semibold">Market sentiment is 67% bullish.</span>
                </p>
                <div className="flex items-center gap-6 text-sm text-white/80">
                  <div className="flex items-center gap-2 hover:text-[#acf3e1] transition-colors cursor-pointer">
                    <TrendingUp className="h-4 w-4" />
                    $2.1M Volume
                  </div>
                  <div className="flex items-center gap-2 hover:text-[#acf3e1] transition-colors cursor-pointer">
                    <Users className="h-4 w-4 animate-pulse" />
                    1,247 Bettors
                  </div>
                  <div className="flex items-center gap-2 hover:text-[#acf3e1] transition-colors cursor-pointer">
                    <div className="w-2 h-2 bg-[#acf3e1] rounded-full animate-ping"></div>
                    Live Now
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="text-center p-4 rounded-lg bg-green-500/20 border border-green-500/30 min-w-[120px] hover:scale-105 hover:border-[#acf3e1]/50 hover:bg-[#15221e]/30 transition-all duration-300 cursor-pointer group/profit">
                  <p className="text-sm text-green-200 mb-1 group-hover/profit:text-[#acf3e1]">Profit</p>
                  <p className="text-2xl font-bold text-green-400 group-hover/profit:text-[#acf3e1] transition-colors">67¢</p>
                  <div className="w-full bg-green-500/10 rounded-full h-1 mt-2">
                    <div className="bg-[#acf3e1] h-1 rounded-full w-[67%] animate-pulse"></div>
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-red-500/20 border border-red-500/30 min-w-[120px] hover:scale-105 hover:border-red-400/50 transition-transform duration-300 cursor-pointer group/loss">
                  <p className="text-sm text-red-200 mb-1 group-hover/loss:text-red-300">Loss</p>
                  <p className="text-2xl font-bold text-red-400 group-hover/loss:text-red-300 transition-colors">33¢</p>
                  <div className="w-full bg-red-500/10 rounded-full h-1 mt-2">
                    <div className="bg-red-500 h-1 rounded-full w-[33%] animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Section with Creative Layout */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 relative z-10">
          <div className="text-center p-6 group hover:scale-105 transition-all duration-300 cursor-pointer">
            <h3 className="font-semibold mb-1 text-white text-sm group-hover:text-[#acf3e1] transition-colors flex items-center justify-center gap-2">
              <Eye className="h-4 w-4 text-[#acf3e1]" />
              Track Crypto Whales
            </h3>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
              Monitor the biggest traders in real-time.
            </p>
          </div>
          
          <div className="text-center p-6 group hover:scale-105 transition-all duration-300 cursor-pointer">
            <h3 className="font-semibold mb-1 text-white text-sm group-hover:text-[#acf3e1] transition-colors flex items-center justify-center gap-2">
              <Target className="h-4 w-4 text-[#acf3e1]" />
              Bet on Outcomes
            </h3>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
              Follow their trades, counter their moves.
            </p>
          </div>
          
          <div className="text-center p-6 group hover:scale-105 transition-all duration-300 cursor-pointer">
            <h3 className="font-semibold mb-1 text-white text-sm group-hover:text-[#acf3e1] transition-colors flex items-center justify-center gap-2">
              <Brain className="h-4 w-4 text-[#acf3e1]" />
              Make Smart Decisions
            </h3>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
              Use whale intelligence to inform strategy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 