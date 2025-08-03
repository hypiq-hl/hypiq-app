'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, DollarSign, User, LogOut } from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext'

export function Navigation() {
  const { isConnected, address, balance, connect, disconnect } = useWallet()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatBalance = (bal: number) => {
    return `$${bal.toFixed(2)}`
  }

  return (
    <nav className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">HypurrMarket</span>
            </Link>
            {isConnected && (
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Markets
                </Link>
                <Link href="/positions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Positions
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <>
                {/* Balance Display */}
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-white">{formatBalance(balance)}</span>
                </div>

                {/* Connected Account */}
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
                  <User className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-white">{formatAddress(address!)}</span>
                </div>

                {/* Disconnect Button */}
                <Button 
                  onClick={disconnect}
                  className="bg-red-500/10 backdrop-blur-sm border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all duration-300" 
                  size="sm"
                  variant="outline"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              </>
            ) : (
              <Button 
                onClick={connect}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300" 
                size="sm"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 