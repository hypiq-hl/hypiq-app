import { headers } from 'next/headers'
import LandingPage from './landing/page'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import EventGrid from '@/components/sections/EventGrid'
import { Hero } from '@/components/sections/Hero'
import { StatsSection } from '@/components/sections/StatsSection'

function EventMarketsPlaceholder() {
  return <EventGrid />
}

export default function HomePage() {
  const headersList = headers()
  const environment = headersList.get('x-environment') || 'waitlist'
  
  if (environment === 'production') {
    return (
      <div className="min-h-screen bg-[#0e241f] text-white">
        <Navigation />
        <main>
          <Hero />
          <StatsSection />
          <EventMarketsPlaceholder />
        </main>
        <Footer />
      </div>
    )
  }
  
  return <LandingPage />
}