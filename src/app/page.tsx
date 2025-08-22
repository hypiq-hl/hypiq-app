import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { WhaleMarketFeaturedCard } from '@/components/sections/WhaleMarketFeaturedCard'
import WhaleMarketHeatmap from '@/components/sections/WhaleMarketHeatmap'
import WhaleMarketGrid from '@/components/sections/WhaleMarketGrid'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      <main>
        {/* Featured Whale Market */}
        <section className="py-10 md:py-12 bg-gray-50">
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