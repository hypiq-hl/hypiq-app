// Bet Type System for HypiQ
export type BetCategory = 
  | 'whale-crypto'
  | 'whale-position'
  | 'price-prediction'
  | 'liquidation'
  | 'institutional'
  | 'market-dominance'
  | 'temporal'

export type BetSubtype = 
  // Whale crypto subtypes
  | 'daily-price-direction'
  | 'price-target'
  | 'weekly-high'
  | 'yearly-target'
  | 'pair-performance'
  
  // Whale position subtypes
  | 'liquidation-risk'
  | 'position-closure'
  | 'profit-loss'
  
  // Price prediction subtypes
  | 'support-resistance'
  | 'breakout'
  | 'trend-continuation'
  
  // Institutional subtypes
  | 'holdings-change'
  | 'disclosure-event'
  
  // Market dominance subtypes
  | 'dominance-shift'
  | 'market-cap-ranking'

export interface BetTypeConfig {
  category: BetCategory
  subtype: BetSubtype
  
  // Display configuration
  displayName: string
  description: string
  icon?: string
  color: {
    primary: string
    secondary: string
    accent: string
  }
  
  // Chart configuration
  chartConfig: {
    type: 'line' | 'candlestick' | 'volume' | 'heatmap'
    dataPoints: number
    timeframe: '1h' | '4h' | '1d' | '1w' | '1m'
    indicators?: string[]
  }
  
  // Trading panel configuration
  tradingPanel: {
    layout: 'standard' | 'advanced' | 'simplified'
    showOrderBook: boolean
    showPositionSize: boolean
    showLeverage: boolean
    customFields?: Array<{
      name: string
      type: 'input' | 'select' | 'checkbox'
      options?: string[]
    }>
  }
  
  // Rules and timeline configuration
  rulesConfig: {
    template: string
    customFields?: Record<string, any>
  }
  
  timelineConfig: {
    type: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom'
    customDuration?: number
    customUnit?: 'hours' | 'days' | 'weeks' | 'months'
  }
}

// Whale Crypto Bet Types
export const WHALE_CRYPTO_CONFIGS: Record<string, BetTypeConfig> = {
  'bitcoin-daily-direction': {
    category: 'whale-crypto',
    subtype: 'daily-price-direction',
    displayName: 'Bitcoin Daily Direction',
    description: 'Predict if Bitcoin will close green or red today',
    color: {
      primary: '#f7931a',
      secondary: '#ffb74d',
      accent: '#e65100'
    },
    chartConfig: {
      type: 'line',
      dataPoints: 120,
      timeframe: '1h',
      indicators: ['sma', 'volume']
    },
    tradingPanel: {
      layout: 'standard',
      showOrderBook: true,
      showPositionSize: false,
      showLeverage: false
    },
    rulesConfig: {
      template: 'daily-price-direction',
      customFields: {
        asset: 'Bitcoin',
        ticker: 'BTC/USDT',
        exchange: 'Binance'
      }
    },
    timelineConfig: {
      type: 'daily'
    }
  },
  
  'ethereum-price-target': {
    category: 'whale-crypto',
    subtype: 'price-target',
    displayName: 'Ethereum Price Target',
    description: 'Will Ethereum hit a specific price target?',
    color: {
      primary: '#627eea',
      secondary: '#9c88ff',
      accent: '#3f51b5'
    },
    chartConfig: {
      type: 'line',
      dataPoints: 120,
      timeframe: '1h',
      indicators: ['resistance', 'support']
    },
    tradingPanel: {
      layout: 'standard',
      showOrderBook: true,
      showPositionSize: false,
      showLeverage: false
    },
    rulesConfig: {
      template: 'price-target',
      customFields: {
        asset: 'Ethereum',
        ticker: 'ETH/USDT',
        target: 4000
      }
    },
    timelineConfig: {
      type: 'daily'
    }
  },
  
  'hype-weekly-high': {
    category: 'whale-crypto',
    subtype: 'weekly-high',
    displayName: 'HYPE Weekly High',
    description: 'Will HYPE hit a new weekly high?',
    color: {
      primary: '#00d4aa',
      secondary: '#4dd0e1',
      accent: '#00acc1'
    },
    chartConfig: {
      type: 'line',
      dataPoints: 168, // 7 days * 24 hours
      timeframe: '1h',
      indicators: ['weekly-high', 'volume']
    },
    tradingPanel: {
      layout: 'standard',
      showOrderBook: true,
      showPositionSize: false,
      showLeverage: false
    },
    rulesConfig: {
      template: 'weekly-high',
      customFields: {
        asset: 'HYPE',
        period: 'weekly'
      }
    },
    timelineConfig: {
      type: 'weekly'
    }
  },
  
  'hyperliquid-liquidation': {
    category: 'whale-position',
    subtype: 'liquidation-risk',
    displayName: 'Whale Liquidation Risk',
    description: 'Will this whale position get liquidated?',
    color: {
      primary: '#f44336',
      secondary: '#ff7043',
      accent: '#d32f2f'
    },
    chartConfig: {
      type: 'line',
      dataPoints: 120,
      timeframe: '1h',
      indicators: ['liquidation-price', 'margin-ratio']
    },
    tradingPanel: {
      layout: 'advanced',
      showOrderBook: true,
      showPositionSize: true,
      showLeverage: true,
      customFields: [
        {
          name: 'whale-address',
          type: 'input'
        },
        {
          name: 'platform',
          type: 'select',
          options: ['Hyperliquid', 'dYdX', 'GMX', 'Gains Network']
        }
      ]
    },
    rulesConfig: {
      template: 'liquidation-risk',
      customFields: {
        platform: 'Hyperliquid'
      }
    },
    timelineConfig: {
      type: 'custom',
      customDuration: 24,
      customUnit: 'hours'
    }
  },
  
  'bitcoin-dominance': {
    category: 'market-dominance',
    subtype: 'dominance-shift',
    displayName: 'Bitcoin Dominance',
    description: 'Will Bitcoin dominance increase today?',
    color: {
      primary: '#ff9800',
      secondary: '#ffb74d',
      accent: '#f57c00'
    },
    chartConfig: {
      type: 'line',
      dataPoints: 120,
      timeframe: '1h',
      indicators: ['dominance-trend']
    },
    tradingPanel: {
      layout: 'standard',
      showOrderBook: true,
      showPositionSize: false,
      showLeverage: false
    },
    rulesConfig: {
      template: 'dominance-shift',
      customFields: {
        asset: 'Bitcoin',
        metric: 'market-cap-dominance'
      }
    },
    timelineConfig: {
      type: 'daily'
    }
  },
  
  'institutional-bitcoin-sale': {
    category: 'institutional',
    subtype: 'holdings-change',
    displayName: 'Institutional Bitcoin Sale',
    description: 'Will this institution sell Bitcoin this year?',
    color: {
      primary: '#9c27b0',
      secondary: '#ba68c8',
      accent: '#7b1fa2'
    },
    chartConfig: {
      type: 'line',
      dataPoints: 365,
      timeframe: '1d',
      indicators: ['institutional-flow']
    },
    tradingPanel: {
      layout: 'simplified',
      showOrderBook: false,
      showPositionSize: false,
      showLeverage: false,
      customFields: [
        {
          name: 'institution',
          type: 'select',
          options: ['MicroStrategy', 'Tesla', 'Block', 'Coinbase', 'Marathon Digital']
        }
      ]
    },
    rulesConfig: {
      template: 'institutional-holdings',
      customFields: {
        institution: 'Strategy',
        asset: 'Bitcoin',
        action: 'sell'
      }
    },
    timelineConfig: {
      type: 'yearly'
    }
  }
}

// Helper function to detect bet type from market title
export function detectBetType(title: string): BetTypeConfig | null {
  const t = title.toLowerCase()
  
  // Bitcoin daily direction
  if (t.includes('bitcoin') && (t.includes('green') || t.includes('red')) && t.includes('today')) {
    return WHALE_CRYPTO_CONFIGS['bitcoin-daily-direction']
  }
  
  // Ethereum price target
  if (t.includes('ethereum') && t.includes('4000')) {
    return WHALE_CRYPTO_CONFIGS['ethereum-price-target']
  }
  
  // HYPE weekly high
  if (t.includes('hype') && t.includes('weekly high')) {
    return WHALE_CRYPTO_CONFIGS['hype-weekly-high']
  }
  
  // Hyperliquid liquidation
  if (t.includes('hyperliquid') && t.includes('liquidated')) {
    return WHALE_CRYPTO_CONFIGS['hyperliquid-liquidation']
  }
  
  // Bitcoin dominance
  if (t.includes('bitcoin') && t.includes('dominance')) {
    return WHALE_CRYPTO_CONFIGS['bitcoin-dominance']
  }
  
  // Institutional Bitcoin sale
  if (t.includes('strategy') && t.includes('bitcoin')) {
    return WHALE_CRYPTO_CONFIGS['institutional-bitcoin-sale']
  }
  
  // Default to bitcoin daily direction for unmatched crypto bets
  if (t.includes('bitcoin') || t.includes('btc') || t.includes('ethereum') || t.includes('eth')) {
    return WHALE_CRYPTO_CONFIGS['bitcoin-daily-direction']
  }
  
  return null
}

// Generate market rules based on bet type
export function generateRulesFromBetType(betType: BetTypeConfig, customData?: Record<string, any>): string {
  const template = betType.rulesConfig.template
  const fields = { ...betType.rulesConfig.customFields, ...customData }
  
  switch (template) {
    case 'daily-price-direction':
      return `This market will resolve to "Green" if ${fields.asset} (${fields.ticker}) closes higher than its opening price on the day specified, based on the ${fields.exchange} 1-day candle closing price in UTC timezone. The market will resolve to "Red" if ${fields.asset} closes lower than its opening price. Resolution will occur within 1 hour of the daily candle close.`
    
    case 'price-target':
      return `This market will resolve to "Yes" if ${fields.asset} (${fields.ticker}) trades at or above $${fields.target} at any point during the specified day, based on ${fields.exchange || 'major exchange'} spot price data. The market will resolve to "No" if ${fields.asset} fails to reach $${fields.target} during the specified timeframe. Resolution occurs at 11:59 PM UTC on the specified date.`
    
    case 'weekly-high':
      return `This market will resolve to "Yes" if ${fields.asset} token reaches a new 7-day high before the weekend (Saturday 12:00 AM UTC). The weekly high is calculated from the previous Saturday 12:00 AM UTC. Price data will be sourced from the primary DEX with highest liquidity. Resolution occurs on Saturday 12:00 AM UTC.`
    
    case 'liquidation-risk':
      return `This market will resolve to "Yes" if the specified ${fields.platform} whale position gets liquidated during the specified timeframe. Liquidation data will be verified through ${fields.platform}'s public API and on-chain transaction data. The market resolves to "No" if the position remains active or is closed voluntarily.`
    
    case 'dominance-shift':
      return `This market will resolve to "Yes" if ${fields.asset}'s ${fields.metric} increases from the previous day's close, based on CoinMarketCap data. ${fields.asset} dominance is calculated as ${fields.asset}'s market cap divided by total cryptocurrency market cap. Resolution occurs at 12:00 AM UTC using the daily snapshot.`
    
    case 'institutional-holdings':
      return `This market will resolve to "Yes" if ${fields.institution} ${fields.action}s any portion of their ${fields.asset} holdings during the specified year, as verified through public disclosures, SEC filings, or confirmed on-chain transactions. The market resolves to "No" if no ${fields.asset} ${fields.action}s are detected or disclosed by the deadline.`
    
    default:
      return `This market will resolve based on objective, verifiable data sources. Resolution will occur within 24 hours of the specified event or deadline. Disputes will be resolved by consulting multiple reliable data sources and following standard market resolution procedures.`
  }
}
