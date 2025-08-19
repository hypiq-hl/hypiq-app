import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import EventGrid from '@/components/sections/EventGrid'
import { Hero } from '@/components/sections/Hero'

import MarketHeatmap from '@/components/sections/MarketHeatmap'

export default function EventMarketsPage() {
  return (
    <div className="min-h-screen bg-[#0e241f] text-white brightness-110 contrast-110">
      <Navigation />
      <main>
        {/* Event Markets Hero */}
        <section className="py-16 md:py-24 bg-[#0e241f]">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-green-400">Event Markets</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Predict crypto events, price movements, and market outcomes. 
              Trade on everything from token launches to regulatory announcements.
            </p>
          </div>
        </section>

        {/* Market Heatmap */}
        <MarketHeatmap />
        
        {/* Event Markets Grid */}
        <EventGrid />
        

      </main>
      <Footer />
    </div>
  )
}
