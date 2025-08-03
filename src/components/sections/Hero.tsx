'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Target, Users, DollarSign } from 'lucide-react'

export function Hero() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="whale" className="mb-6">
            <TrendingUp className="h-3 w-3 mr-1" />
            Now Live: Bet on Whale Trades
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-whale-dark via-whale to-whale-light bg-clip-text text-transparent">
            Hypen
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The first platform to bet on whale trading outcomes. 
            Will they close in profit or loss? Place your bets and ride the waves.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="whale" className="text-lg px-8 py-6">
              <Target className="h-5 w-5 mr-2" />
              Start Betting
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <TrendingUp className="h-5 w-5 mr-2" />
              Track Whales
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
              <div className="profit-gradient rounded-full p-3 mb-4">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">$2.4M</h3>
              <p className="text-sm text-muted-foreground">Total Volume</p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
              <div className="whale-gradient rounded-full p-3 mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">1,247</h3>
              <p className="text-sm text-muted-foreground">Active Bettors</p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
              <div className="loss-gradient rounded-full p-3 mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">89</h3>
              <p className="text-sm text-muted-foreground">Whale Positions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 