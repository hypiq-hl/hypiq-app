import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { WhaleMarketFeaturedCard } from '@/components/sections/WhaleMarketFeaturedCard'
import WhaleMarketHeatmap from '@/components/sections/WhaleMarketHeatmap'
import WhaleMarketGrid from '@/components/sections/WhaleMarketGrid'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0e241f] text-white brightness-110 contrast-110">
      <Navigation />
      <main>
        {/* Featured Whale Market */}
        <section className="py-10 md:py-12 bg-[#0e241f]">
          <div className="container mx-auto px-4">
            <WhaleMarketFeaturedCard />
          </div>
        </section>
        
        {/* Whale Market Heatmap */}
        <WhaleMarketHeatmap />
        
        {/* Whale Markets Grid */}
        <WhaleMarketGrid />
        
      </main>
      <Footer />
    </div>
  )
}