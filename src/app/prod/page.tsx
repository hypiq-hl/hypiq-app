import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import EventGrid from '@/components/sections/EventGrid'
import { Hero } from '@/components/sections/Hero'
import { StatsSection } from '@/components/sections/StatsSection'
import MarketHeatmap from '@/components/sections/MarketHeatmap'

export default function ProdPage() {
  return (
    <div className="min-h-screen bg-[#0e241f] text-white brightness-110 contrast-110">
      <Navigation />
      <main>
        <Hero />
        <MarketHeatmap />
        <EventGrid />
      </main>
      <Footer />
    </div>
  )
}
