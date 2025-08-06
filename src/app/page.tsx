import { headers } from 'next/headers'
import LandingPage from './landing/page'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { MarketGrid } from '@/components/sections/MarketGrid'
import { Hero } from '@/components/sections/Hero'
import { StatsSection } from '@/components/sections/StatsSection'

export default function HomePage() {
  const headersList = headers()
  const environment = headersList.get('x-environment') || 'waitlist'
  
  // If this is the production environment (prod.hypiq.finance), show the main app
  if (environment === 'production') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <Hero />
          <StatsSection />
          <div className="container mx-auto px-4 py-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Live Markets</h2>
              <p className="text-muted-foreground">
                Bet on whale trading outcomes in real-time. Will they close in profit or loss?
              </p>
            </div>
            <MarketGrid />
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  
  // For regular domains (hypiq.finance), show the waitlist
  return <LandingPage />
}