export interface WhalePosition {
  id: string
  whaleAddress: string
  symbol: string
  positionType: 'long' | 'short'
  entryPrice: number
  currentPrice: number
  positionSize: number
  entryTime: Date
  platform: string
  status: 'open' | 'closed'
  pnl?: number
  pnlPercentage?: number
}

export interface BettingMarket {
  id: string
  whalePositionId: string
  title: string
  description: string
  profitOdds: number
  lossOdds: number
  totalBetsProfit: number
  totalBetsLoss: number
  totalVolume: number
  endTime: Date
  status: 'active' | 'ended' | 'settled'
  result?: 'profit' | 'loss'
  minBet: number
  maxBet: number
}

export interface Bet {
  id: string
  marketId: string
  userId: string
  amount: number
  side: 'profit' | 'loss'
  odds: number
  potentialPayout: number
  placedAt: Date
  status: 'pending' | 'won' | 'lost' | 'refunded'
}

export interface User {
  id: string
  address: string
  totalBets: number
  totalWagered: number
  totalWon: number
  winRate: number
  joinedAt: Date
}

export interface MarketStats {
  totalMarkets: number
  activeMarkets: number
  totalVolume: number
  totalBets: number
  averageOdds: {
    profit: number
    loss: number
  }
}

export interface WhaleStats {
  address: string
  totalPositions: number
  openPositions: number
  totalVolume: number
  winRate: number
  averagePositionSize: number
  platforms: string[]
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Blockchain related types (for future integration)
export interface BlockchainConfig {
  chainId: number
  rpcUrl: string
  contractAddresses: {
    bettingContract: string
    tokenContract: string
  }
}

export interface TransactionStatus {
  hash: string
  status: 'pending' | 'confirmed' | 'failed'
  blockNumber?: number
  gasUsed?: number
}

export interface WalletConnection {
  address: string
  isConnected: boolean
  balance: number
  provider?: any
} 