'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, DollarSign, User, LogOut, Bell, TrendingUp } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useWallet } from '@/contexts/WalletContext'

export function Navigation() {
  const { isConnected, address, balance, connect, disconnect } = useWallet()
  const pathname = usePathname()
  const isWhaleMarkets = pathname?.startsWith('/whale-markets') || pathname?.startsWith('/market/')

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatBalance = (bal: number) => {
    return `$${bal.toFixed(2)}`
  }

  return (
    <nav className="bg-[#0e241f] border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo and main nav */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center">
                <Image src="/HYPIQ-logo-white.png" alt="HYPIQ" width={64} height={64} className="object-contain" />
              </div>
              <span className="text-xl font-bold text-white">HYPIQ</span>
            </Link>

            {/* Thin vertical separator between brand and nav */}
            <div className="hidden md:block h-8 w-px bg-white/30 rounded" />

            <div className="hidden md:flex items-center space-x-5">
              <Link href="/prod" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
                Event Markets
              </Link>
              <Link href="/whale-markets" className="text-sm text-white/90 hover:text-white transition-colors">
                <span className="relative shimmer inline-block px-1 rounded">🐋 Whale Markets</span>
              </Link>
            </div>
          </div>

          {/* Center - (Search removed per spec) */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8" />

          {/* Right side - Actions and account */}
            <div className="flex items-center space-x-4 mt-1">
            {isConnected ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4 text-white/70" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-kalshi-accent rounded-full"></div>
                </Button>

                {/* Balance Display */}
                <div className="flex items-center space-x-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2">
                  <DollarSign className="h-4 w-4 text-kalshi-accent" />
                  <span className="text-sm font-medium text-white">{formatBalance(balance)}</span>
                </div>

                {/* Account Menu */}
                <div className="flex items-center space-x-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2">
                  <div className="w-6 h-6 bg-kalshi-accent rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm text-white">{formatAddress(address!)}</span>
                </div>

                {/* Disconnect Button */}
                <Button 
                  onClick={disconnect}
                  variant="outline" 
                  size="sm"
                  className="border-red-400/30 text-red-400 hover:bg-red-500/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                {/* Connect Wallet Button with glassmorphism */}
                <Button 
                  onClick={connect}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white shadow-lg"
                  size="sm"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              </>
            )}
          </div>
        </div>
        {/* Secondary category bar */}
        {isWhaleMarkets ? (
          <div className="flex items-center gap-3 py-2 overflow-x-auto hide-scrollbar">
            {[
              { label: 'TRENDING', key: 'all', icon: true },
              { label: 'BITCOIN', key: 'bitcoin' },
              { label: 'ETHEREUM', key: 'ethereum' },
              { label: 'HYPE', key: 'hype' },
              { label: 'XRP', key: 'xrp' },
              { label: 'BNB', key: 'bnb' },
              { label: 'SOLANA', key: 'solana' },
              { label: 'DOGE', key: 'doge' },
              { label: 'OPTIONS', key: 'options' }
            ].map(({ label, key, icon }) => {
              let isActive = false
              if (typeof window !== 'undefined') {
                const params = new URLSearchParams(window.location.search)
                const currentCategory = params.get('category') || 'all'
                isActive = currentCategory === key
              }
              
              return (
                <button
                  key={label}
                  onClick={() => {
                    const params = new URLSearchParams(window.location.search)
                    params.set('category', key)
                    const path = '/whale-markets'
                    const url = `${path}?${params.toString()}`
                    window.location.assign(url)
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-white/20 border border-white/30 text-white font-semibold ring-1 ring-white/30'
                      : 'bg-white/10 border border-white/20 text-white/80 hover:bg-white/15'
                  } ${icon ? 'flex items-center gap-1.5' : ''}`}
                >
                  {icon && <TrendingUp className="h-3 w-3" />}
                  {label}
                </button>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center gap-3 py-2 overflow-x-auto hide-scrollbar">
            <span className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold ring-1 ring-white/30 flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3" />
              TRENDING
            </span>
            {['POLITICS','ECONOMICS','SPORTS','CRYPTO','TECH','HEALTH','WORLD'].map((label) => (
              <span key={label} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
} 