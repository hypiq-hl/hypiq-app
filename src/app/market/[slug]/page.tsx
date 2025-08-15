'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { findMarketBySlug } from '@/data/markets'
import dynamic from 'next/dynamic'

// Dynamically import the different page layouts
const DefaultMarketPage = dynamic(() => import('./default'), { ssr: false })
const UpDownMarketPage = dynamic(() => import('./up-down'), { ssr: false })
const MultipleChoiceMarketPage = dynamic(() => import('./multiple-choice'), { ssr: false })

// Determine market type based on title patterns
function getMarketType(title: string): 'up-down' | 'multiple-choice' | 'default' {
  const lowerTitle = title.toLowerCase()
  
  // Check for up/down or green/red patterns
  if (/(up or down|green or red|bull or bear|rise or fall|increase or decrease|higher or lower)/i.test(lowerTitle)) {
    console.log('🎯 Detected up-down market:', title)
    return 'up-down'
  }
  
  // Check for multiple choice patterns
  if (/(what price|which price|price range|between.*and|above.*below|multiple.*options)/i.test(lowerTitle)) {
    console.log('🎯 Detected multiple-choice market:', title)
    return 'multiple-choice'
  }
  
  // Default to binary yes/no layout
  console.log('🎯 Using default market layout:', title)
  return 'default'
}

export default function MarketRouter() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug || ''
  
  const market = useMemo(() => findMarketBySlug(slug), [slug])
  
  if (!market) {
    return (
      <div className="min-h-screen bg-[#0e241f] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Market Not Found</h1>
          <p className="text-white/60">The market you&rsquo;re looking for doesn&rsquo;t exist.</p>
        </div>
      </div>
    )
  }

  const marketType = getMarketType(market.title)
  
  console.log('📊 Market Router:', { slug, title: market.title, type: marketType })
  
  switch (marketType) {
    case 'up-down':
      return <UpDownMarketPage />
    case 'multiple-choice':
      return <MultipleChoiceMarketPage />
    default:
      return <DefaultMarketPage />
  }
}