'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts'

// Deterministic PRNG for consistent data
function xorshift32(seed: number) {
  let state = seed;
  return function() {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return ((state >>> 0) / 0x100000000);
  };
}

const rng = xorshift32(42);

// Generate deterministic chart data for whale trading outcomes
const generateWhaleChartData = () => {
  const timeLabels = ['1h', '6h', '12h', '24h', '48h', '72h', '1w'];
  
  return timeLabels.map((time) => ({
    time,
    profit: Math.round(35 + rng() * 30), // 35-65% range for profit probability
    loss: Math.round(25 + rng() * 25),   // 25-50% range for loss probability
  }));
};

const whaleChartData = generateWhaleChartData();

const whaleMarkets = [
  {
    id: 1,
    whale: "0x742d35Cc6734Aa5b6b8b4",
    avatar: "/api/placeholder/40/40",
    position: "$2.3M BTC Long",
    description: "Major whale opened massive Bitcoin position at $98,200. Will they close in profit?",
    profitOdds: 67,
    lossOdds: 33,
    volume: "$890K",
    traders: 234,
  },
  {
    id: 2,
    whale: "0x8f3e21A4b9c7d6e5",
    avatar: "/api/placeholder/40/40", 
    position: "$1.8M ETH Short",
    description: "Whale betting against Ethereum at $3,420. Smart money or risky play?",
    profitOdds: 42,
    lossOdds: 58,
    volume: "$567K",
    traders: 189,
  },
  {
    id: 3,
    whale: "0x6a9b8c7d5e4f3a2b",
    avatar: "/api/placeholder/40/40",
    position: "$950K SOL Long", 
    description: "Solana whale accumulating heavily. Will their conviction pay off?",
    profitOdds: 74,
    lossOdds: 26,
    volume: "$423K",
    traders: 156,
  }
];

export default function WhaleFeatureBet() {
  const [currentMarket, setCurrentMarket] = useState(0);
  const market = whaleMarkets[currentMarket];

  const nextMarket = () => {
    setCurrentMarket((prev) => (prev + 1) % whaleMarkets.length);
  };

  const prevMarket = () => {
    setCurrentMarket((prev) => (prev - 1 + whaleMarkets.length) % whaleMarkets.length);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <Card className="bg-white/10 border border-white/20 backdrop-blur-sm overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Market Info */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            {/* Header with whale avatar */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                🐋
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">
                  {market.whale}
                </h2>
                <p className="text-sm sm:text-base text-white/70 truncate">
                  {market.position}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-16 sm:w-20 h-px bg-white/20 mx-auto lg:mx-0"></div>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              {market.description}
            </p>

            {/* Odds with Progress Bars */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base text-white/90">Will Close in Profit</span>
                <span className="text-sm sm:text-base font-semibold text-white">{market.profitOdds}%</span>
              </div>
              <Progress value={market.profitOdds} className="h-2 bg-white/10">
                <div 
                  className="h-full bg-green-500 transition-all duration-300 ease-out rounded-full" 
                  style={{ width: `${market.profitOdds}%` }}
                />
              </Progress>

              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base text-white/90">Will Close in Loss</span>
                <span className="text-sm sm:text-base font-semibold text-white">{market.lossOdds}%</span>
              </div>
              <Progress value={market.lossOdds} className="h-2 bg-white/10">
                <div 
                  className="h-full bg-red-500 transition-all duration-300 ease-out rounded-full" 
                  style={{ width: `${market.lossOdds}%` }}
                />
              </Progress>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <Button 
                className="flex-1 bg-green-600/20 border border-green-500/50 text-green-400 hover:bg-green-600/30 hover:border-green-400 transition-all duration-200"
              >
                <Check className="w-4 h-4 mr-1.5 sm:mr-2" />
                <span className="text-sm sm:text-base">Profit</span>
              </Button>
              <Button 
                className="flex-1 bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600/30 hover:border-red-400 transition-all duration-200"
              >
                <X className="w-4 h-4 mr-1.5 sm:mr-2" />
                <span className="text-sm sm:text-base">Loss</span>
              </Button>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px bg-white/20"></div>

          {/* Right Side - Chart */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* Chart Legend */}
            <div className="flex justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs sm:text-sm text-white/80">Profit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs sm:text-sm text-white/80">Loss</span>
              </div>
            </div>

            {/* Chart */}
            <div className="h-48 sm:h-56 lg:h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={whaleChartData} margin={{ top: 5, right: 40, left: 0, bottom: 5 }}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                    className="mt-2"
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    orientation="right"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, stroke: '#10b981', strokeWidth: 2, fill: '#10b981' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="loss" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, stroke: '#ef4444', strokeWidth: 2, fill: '#ef4444' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Time frame label */}
            <div className="text-center mt-2 sm:mt-3">
              <span className="text-xs sm:text-sm text-white/50">Prediction Timeline</span>
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-white/20"></div>

        {/* Bottom Stats */}
        <div className="p-4 sm:p-6 lg:px-8 lg:py-4">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <div className="flex gap-4 sm:gap-6 text-white/70">
              <span>Volume: <span className="text-white font-medium">{market.volume}</span></span>
              <span>Traders: <span className="text-white font-medium">{market.traders}</span></span>
            </div>
            <div className="text-white/50 text-xs sm:text-sm">
              {currentMarket + 1} / {whaleMarkets.length}
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation Arrows */}
      <div className="flex justify-center gap-4 mt-4 sm:mt-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevMarket}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 text-white"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextMarket}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 text-white"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </div>
  );
}

