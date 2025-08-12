'use client'

import { FeaturedBets } from './FeaturedBets'

export function Hero() {
  return (
    <section className="py-10 md:py-12 bg-[#0e241f]">
      <div className="container mx-auto px-4">
        <FeaturedBets />
      </div>
    </section>
  )
} 