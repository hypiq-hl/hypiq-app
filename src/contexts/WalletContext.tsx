'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Position {
  id: string
  marketId: string
  marketTitle: string
  side: 'profit' | 'loss'
  amount: number
  odds: number
  potentialPayout: number
  timestamp: Date
  status: 'active' | 'won' | 'lost'
  currentPnl?: number
}

interface WalletContextType {
  // Wallet connection
  isConnected: boolean
  address: string | null
  balance: number
  connect: () => Promise<void>
  disconnect: () => void
  
  // Trading
  positions: Position[]
  placeBet: (marketId: string, marketTitle: string, side: 'profit' | 'loss', amount: number, odds: number) => void
  
  // Balance management
  deductBalance: (amount: number) => boolean
  addBalance: (amount: number) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(382.35) // Mock starting balance
  const [positions, setPositions] = useState<Position[]>([])

  // Load saved data from localStorage
  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet')
    const savedPositions = localStorage.getItem('positions')
    const savedBalance = localStorage.getItem('balance')

    if (savedWallet) {
      const wallet = JSON.parse(savedWallet)
      setIsConnected(wallet.isConnected)
      setAddress(wallet.address)
    }

    if (savedPositions) {
      const parsedPositions = JSON.parse(savedPositions).map((p: any) => ({
        ...p,
        timestamp: new Date(p.timestamp)
      }))
      setPositions(parsedPositions)
    }

    if (savedBalance) {
      setBalance(parseFloat(savedBalance))
    }
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('wallet', JSON.stringify({ isConnected, address }))
  }, [isConnected, address])

  useEffect(() => {
    localStorage.setItem('positions', JSON.stringify(positions))
  }, [positions])

  useEffect(() => {
    localStorage.setItem('balance', balance.toString())
  }, [balance])

  const connect = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        
        // Get the connected account
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        
        if (accounts.length > 0) {
          setAddress(accounts[0])
          setIsConnected(true)
        }
      } else {
        // Fallback for demo purposes - simulate connection
        const mockAddress = '0x742d35Cc6Ba1f23e8976543dcF1234567890abcd'
        setAddress(mockAddress)
        setIsConnected(true)
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
    localStorage.removeItem('wallet')
  }

  const deductBalance = (amount: number): boolean => {
    if (balance >= amount) {
      setBalance(prev => prev - amount)
      return true
    }
    return false
  }

  const addBalance = (amount: number) => {
    setBalance(prev => prev + amount)
  }

  const placeBet = (marketId: string, marketTitle: string, side: 'profit' | 'loss', amount: number, odds: number) => {
    if (!deductBalance(amount)) {
      throw new Error('Insufficient balance')
    }

    const newPosition: Position = {
      id: `pos_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      marketId,
      marketTitle,
      side,
      amount,
      odds,
      potentialPayout: amount * odds,
      timestamp: new Date(),
      status: 'active',
      currentPnl: 0
    }

    setPositions(prev => [newPosition, ...prev])
  }

  const value: WalletContextType = {
    isConnected,
    address,
    balance,
    connect,
    disconnect,
    positions,
    placeBet,
    deductBalance,
    addBalance
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

// Add MetaMask type definitions
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
    }
  }
} 