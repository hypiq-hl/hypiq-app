'use client'

import { useState } from 'react'
import { bettingApi } from '@/services/api'
import type { Bet } from '@/types'

export function useBetting() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const placeBet = async (
    marketId: string,
    userId: string,
    amount: number,
    side: 'profit' | 'loss',
    odds: number
  ): Promise<Bet | null> => {
    try {
      setLoading(true)
      setError(null)

      const betData = {
        marketId,
        userId,
        amount,
        side,
        odds,
        potentialPayout: amount * odds,
      }

      const response = await bettingApi.placeBet(betData)
      
      if (response.success && response.data) {
        return response.data
      } else {
        setError(response.error || 'Failed to place bet')
        return null
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getUserBets = async (userId: string): Promise<Bet[]> => {
    try {
      setError(null)
      const response = await bettingApi.getUserBets(userId)
      
      if (response.success && response.data) {
        return response.data
      } else {
        setError(response.error || 'Failed to fetch user bets')
        return []
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      return []
    }
  }

  const getMarketBets = async (marketId: string): Promise<Bet[]> => {
    try {
      setError(null)
      const response = await bettingApi.getBetsByMarket(marketId)
      
      if (response.success && response.data) {
        return response.data
      } else {
        setError(response.error || 'Failed to fetch market bets')
        return []
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      return []
    }
  }

  return {
    placeBet,
    getUserBets,
    getMarketBets,
    loading,
    error,
    clearError: () => setError(null),
  }
}

export function useBetCalculator() {
  const calculatePayout = (amount: number, odds: number): number => {
    return amount * odds
  }

  const calculateProfit = (amount: number, odds: number): number => {
    return calculatePayout(amount, odds) - amount
  }

  const calculateImpliedProbability = (odds: number): number => {
    return (1 / odds) * 100
  }

  const calculateOptimalBetSize = (
    bankroll: number,
    odds: number,
    winProbability: number,
    maxBetPercentage: number = 0.05 // 5% max
  ): number => {
    // Kelly Criterion: f = (bp - q) / b
    // where: f = fraction of bankroll to bet
    //        b = odds - 1
    //        p = probability of winning
    //        q = probability of losing (1 - p)
    
    const b = odds - 1
    const p = winProbability
    const q = 1 - p
    
    const kellyCriterion = (b * p - q) / b
    const optimalFraction = Math.max(0, Math.min(kellyCriterion, maxBetPercentage))
    
    return bankroll * optimalFraction
  }

  return {
    calculatePayout,
    calculateProfit,
    calculateImpliedProbability,
    calculateOptimalBetSize,
  }
} 