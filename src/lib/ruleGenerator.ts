export function generateMarketRules(title: string): string {
  const t = title.toLowerCase()
  
  // Bitcoin price rules
  if (t.includes('bitcoin') && (t.includes('green') || t.includes('red'))) {
    return `This market will resolve to "Green" if Bitcoin (BTC/USDT) closes higher than its opening price on the day specified, based on the Binance 1-day candle closing price in UTC timezone. The market will resolve to "Red" if Bitcoin closes lower than its opening price. Resolution will occur within 1 hour of the daily candle close.`
  }
  
  // Ethereum price target rules
  if (t.includes('ethereum') && t.includes('4000')) {
    return `This market will resolve to "Yes" if Ethereum (ETH/USDT) trades at or above $4,000 at any point during the specified day, based on Binance spot price data. The market will resolve to "No" if Ethereum fails to reach $4,000 during the specified timeframe. Resolution occurs at 11:59 PM UTC on the specified date.`
  }
  
  // BNB price target rules
  if (t.includes('bnb') && t.includes('600')) {
    return `This market will resolve to "Yes" if Binance Coin (BNB/USDT) reaches or exceeds $600 at any point during the specified day, based on Binance spot price data. The market will resolve to "No" if BNB fails to reach $600 during the timeframe. Resolution occurs at 11:59 PM UTC on the specified date.`
  }
  
  // HYPE weekly high rules
  if (t.includes('hype') && t.includes('weekly high')) {
    return `This market will resolve to "Yes" if HYPE token reaches a new 7-day high before the weekend (Saturday 12:00 AM UTC). The weekly high is calculated from the previous Saturday 12:00 AM UTC. Price data will be sourced from the primary DEX with highest liquidity. Resolution occurs on Saturday 12:00 AM UTC.`
  }
  
  // Bitcoin dominance rules
  if (t.includes('bitcoin') && t.includes('dominance')) {
    return `This market will resolve to "Yes" if Bitcoin's market capitalization dominance increases from the previous day's close, based on CoinMarketCap data. Bitcoin dominance is calculated as Bitcoin's market cap divided by total cryptocurrency market cap. Resolution occurs at 12:00 AM UTC using the daily snapshot.`
  }
  
  // Hyperliquid liquidation rules
  if (t.includes('hyperliquid') && t.includes('liquidated')) {
    return `This market will resolve to "Yes" if the specified Hyperliquid whale position gets liquidated during the specified timeframe. Liquidation data will be verified through Hyperliquid's public API and on-chain transaction data. The market resolves to "No" if the position remains active or is closed voluntarily.`
  }
  
  // HYPE price target rules
  if (t.includes('hype') && t.includes('100')) {
    return `This market will resolve to "Yes" if HYPE token reaches or exceeds $100 at any point before December 31, 2024, 11:59 PM UTC. Price data will be sourced from the primary DEX with highest liquidity for HYPE trading. The market will resolve to "No" if HYPE fails to reach $100 by the deadline.`
  }
  
  // Solana vs Ethereum rules
  if (t.includes('solana') && t.includes('ethereum') && t.includes('soleth')) {
    return `This market will resolve to "Yes" if the SOL/ETH trading pair closes higher at year-end compared to its opening price on January 1st. Price data will be sourced from major DEXs and CEXs with SOL/ETH pairs. Resolution occurs on December 31st, 11:59 PM UTC using the closing price of the SOL/ETH pair.`
  }
  
  // Bitcoin institutional selling rules
  if (t.includes('strategy') && t.includes('bitcoin')) {
    return `This market will resolve to "Yes" if Strategy (the specified institution) sells any portion of their Bitcoin holdings during the specified year, as verified through public disclosures, SEC filings, or confirmed on-chain transactions. The market resolves to "No" if no Bitcoin sales are detected or disclosed by the deadline.`
  }
  
  // Default rule for unmatched patterns
  return `This market will resolve based on objective, verifiable data sources. Resolution will occur within 24 hours of the specified event or deadline. Disputes will be resolved by consulting multiple reliable data sources and following standard market resolution procedures.`
}
