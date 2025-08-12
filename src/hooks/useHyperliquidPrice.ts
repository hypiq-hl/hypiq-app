import { useState, useEffect, useCallback } from 'react'

interface PriceData {
  coin: string
  price: number
  timestamp: number
  change24h?: number
}

interface AllMids {
  mids: Record<string, string>
}

interface WebSocketMessage {
  channel: string
  data: AllMids
}

export function useHyperliquidPrice(coin: string) {
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Map common coin names to Hyperliquid symbols
  const getCoinSymbol = useCallback((coinName: string): string => {
    const normalizedCoin = coinName.toLowerCase()
    
    const coinMap: Record<string, string> = {
      'bitcoin': 'BTC',
      'btc': 'BTC',
      'ethereum': 'ETH', 
      'eth': 'ETH',
      'hyperliquid': 'HYPE',
      'hype': 'HYPE',
      'solana': 'SOL',
      'sol': 'SOL',
      'bnb': 'BNB',
      'binance': 'BNB',
      'xrp': 'XRP',
      'doge': 'DOGE',
      'dogecoin': 'DOGE'
    }
    
    return coinMap[normalizedCoin] || coinName.toUpperCase()
  }, [])

  useEffect(() => {
    if (!coin) return

    const symbol = getCoinSymbol(coin)
    let ws: WebSocket | null = null
    let reconnectTimeout: NodeJS.Timeout | null = null
    let isComponentMounted = true

    const connect = () => {
      if (!isComponentMounted) return

      try {
        // Hyperliquid WebSocket endpoint
        ws = new WebSocket('wss://api.hyperliquid.xyz/ws')

        ws.onopen = () => {
          if (!isComponentMounted) return
          
          console.log(`Connected to Hyperliquid WebSocket for ${symbol}`)
          setIsConnected(true)
          setError(null)

          // Subscribe to all mids (mid prices)
          const subscribeMessage = {
            method: 'subscribe',
            subscription: {
              type: 'allMids'
            }
          }

          ws?.send(JSON.stringify(subscribeMessage))
        }

        ws.onmessage = (event) => {
          if (!isComponentMounted) return

          try {
            const message: WebSocketMessage = JSON.parse(event.data)
            
            if (message.channel === 'allMids' && message.data?.mids) {
              const mids = message.data.mids
              const price = mids[symbol]
              
              if (price) {
                const numericPrice = parseFloat(price)
                if (!isNaN(numericPrice)) {
                  setPriceData(prev => ({
                    coin: symbol,
                    price: numericPrice,
                    timestamp: Date.now(),
                    change24h: prev?.change24h // Keep previous change data if available
                  }))
                }
              }
            }
          } catch (err) {
            console.error('Error parsing WebSocket message:', err)
          }
        }

        ws.onclose = (event) => {
          if (!isComponentMounted) return

          console.log(`WebSocket closed for ${symbol}:`, event.code, event.reason)
          setIsConnected(false)

          // Reconnect after 3 seconds if not a manual close
          if (event.code !== 1000) {
            reconnectTimeout = setTimeout(() => {
              if (isComponentMounted) {
                console.log(`Attempting to reconnect to ${symbol}...`)
                connect()
              }
            }, 3000)
          }
        }

        ws.onerror = (error) => {
          if (!isComponentMounted) return
          
          console.error(`WebSocket error for ${symbol}:`, error)
          setError(`Connection error for ${symbol}`)
          setIsConnected(false)
        }

      } catch (err) {
        if (!isComponentMounted) return
        
        console.error(`Failed to connect WebSocket for ${symbol}:`, err)
        setError(`Failed to connect for ${symbol}`)
      }
    }

    // Initial connection
    connect()

    // Cleanup function
    return () => {
      isComponentMounted = false
      
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
      }
      
      if (ws) {
        ws.close(1000, 'Component unmounted')
      }
    }
  }, [coin, getCoinSymbol])

  return {
    priceData,
    isConnected,
    error,
    symbol: getCoinSymbol(coin)
  }
}
