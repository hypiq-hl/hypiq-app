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
  const isWhaleMarkets = pathname === '/' || pathname?.startsWith('/market/')

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatBalance = (bal: number) => {
    return `$${bal.toFixed(2)}`
  }

  return (
    <nav className="bg-gray-50 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo and main nav */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center">
                <Image src="/HYPIQ-logo-black.png" alt="HYPIQ" width={64} height={64} className="object-contain" />
              </div>
              <span className="text-xl font-bold text-gray-900">HYPIQ</span>
            </Link>


          </div>

          {/* Center - (Search removed per spec) */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8" />

          {/* Right side - Actions and account */}
            <div className="flex items-center space-x-4 mt-1">
            {isConnected ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-kalshi-accent rounded-full"></div>
                </Button>

                {/* Balance Display */}
                <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                  <DollarSign className="h-4 w-4 text-kalshi-accent" />
                  <span className="text-sm font-medium text-gray-900">{formatBalance(balance)}</span>
                </div>

                {/* Account Menu */}
                <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                  <div className="w-6 h-6 bg-kalshi-accent rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-900">{formatAddress(address!)}</span>
                </div>

                {/* Disconnect Button */}
                <Button 
                  onClick={disconnect}
                  variant="outline" 
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                {/* Connect Wallet Button */}
                <Button 
                  onClick={connect}
                  className="bg-black/60 hover:bg-black/40 border border-white/20 backdrop-blur-sm text-white shadow-lg"
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
                    const path = '/'
                    const url = `${path}?${params.toString()}`
                    window.location.assign(url)
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-[#0e241f] border border-[#0e241f] text-white font-semibold'
                      : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'
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
            <span className="px-3 py-1 rounded-full bg-[#0e241f] border border-[#0e241f] text-white text-xs font-semibold flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3" />
              TRENDING
            </span>
            {['POLITICS','ECONOMICS','SPORTS','CRYPTO','TECH','HEALTH','WORLD'].map((label) => (
              <span key={label} className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium">
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
} 