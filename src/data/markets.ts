export type MarketOption = {
  name: string
  percent: number
}

export type Market = {
  id: string
  title: string
  options: MarketOption[]
  volume: number
  imageUrl?: string
}

export const whaleMarkets: Market[] = [
  {
    id: 'w1',
    title: 'Will Bitcoin close today in the green or red?',
    options: [
      { name: 'Green', percent: 58 },
      { name: 'Red', percent: 42 },
    ],
    volume: 2100456,
    imageUrl: '/coin-logos/bitcoin.png',
  },
  {
    id: 'w2',
    title: 'What price will Ethereum hit in August?',
    options: [
      { name: '↑ 6200', percent: 4 },
      { name: '↑ 5800', percent: 8 },
      { name: '↑ 5400', percent: 18 },
      { name: '↑ 5000', percent: 38 },
      { name: '↑ 4600', percent: 71 },
      { name: '↑ 4400', percent: 100 },
      { name: '↓ 3300', percent: 6 },
    ],
    volume: 1750000,
    imageUrl: '/coin-logos/ethereum.png',
  },
  {
    id: 'w3',
    title: 'Will HYPE hit a new weekly high before the weekend?',
    options: [
      { name: 'Yes', percent: 51 },
      { name: 'No', percent: 49 },
    ],
    volume: 503450,
    imageUrl: '/coin-logos/hype.png',
  },
  {
    id: 'w4',
    title: 'Will BNB break above $600 today?',
    options: [
      { name: 'Yes', percent: 44 },
      { name: 'No', percent: 56 },
    ],
    volume: 980345,
    imageUrl: '/coin-logos/bnb.png',
  },
  {
    id: 'w5',
    title: 'Will Bitcoin\'s dominance increase today?',
    options: [
      { name: 'Yes', percent: 61 },
      { name: 'No', percent: 39 },
    ],
    volume: 2567890,
    imageUrl: '/coin-logos/bitcoin.png',
  },
  {
    id: 'w6',
    title: 'Does Hyperliquid Whale on short will be liquidated?',
    options: [
      { name: 'Yes', percent: 67 },
      { name: 'No', percent: 33 },
    ],
    volume: 302340,
    imageUrl: '/coin-logos/hype.png',
  },
  {
    id: 'w7',
    title: 'Will HYPE will hit 100$ by end of year?',
    options: [
      { name: 'Yes', percent: 22 },
      { name: 'No', percent: 78 },
    ],
    volume: 150234,
    imageUrl: '/coin-logos/hype.png',
  },
  {
    id: 'w8',
    title: 'Will Solana close this year in green or red against Ethereum (SOLETH)?',
    options: [
      { name: 'Yes', percent: 18 },
      { name: 'No', percent: 82 },
    ],
    volume: 843210,
    imageUrl: '/coin-logos/solana.png',
  },
  {
    id: 'w9',
    title: 'Will STRATEGY sell any BITCOIN this year?',
    options: [
      { name: 'Yes', percent: 29 },
      { name: 'No', percent: 71 },
    ],
    volume: 423890,
    imageUrl: '/coin-logos/bitcoin.png',
  },
]

export function findMarketBySlug(slug: string): Market | null {
  return whaleMarkets.find(market => {
    const marketSlug = market.title
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    return marketSlug === slug
  }) || null
}
