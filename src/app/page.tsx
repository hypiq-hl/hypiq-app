'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MarketCardsSlider } from '@/components/market/MarketCardsSlider'


import { StarBorder } from '@/components/ui/star-border'
import { Mail, ChevronRight, Star, Github } from 'lucide-react'

interface WaitlistFormData {
  email: string
}

const SocialLinks: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex items-center justify-center space-x-4 ${className}`}>
    <a 
      href="https://x.com/hypiq_fi" 
      target="_blank" 
      rel="noopener noreferrer"
      className="group w-10 h-10 bg-[#12191d] border border-[#1a2125] rounded-lg flex items-center justify-center hover:bg-[#1a2125] hover:border-white/20 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
      aria-label="Follow us on X (Twitter)"
    >
      <span className="text-lg font-bold text-gray-400 group-hover:text-white transition-colors duration-300">𝕏</span>
    </a>
    <a 
      href="https://github.com/hypiq-hl" 
      target="_blank" 
      rel="noopener noreferrer"
      className="group w-10 h-10 bg-[#12191d] border border-[#1a2125] rounded-lg flex items-center justify-center hover:bg-[#1a2125] hover:border-white/20 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
      aria-label="View our GitHub repository"
    >
      <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
    </a>
    <a 
      href="https://discord.gg/7gkZDasMAr" 
      target="_blank" 
      rel="noopener noreferrer"
      className="group w-10 h-10 bg-[#12191d] border border-[#1a2125] rounded-lg flex items-center justify-center hover:bg-[#1a2125] hover:border-white/20 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
      aria-label="Join our Discord community"
    >
      <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    </a>
  </div>
)

export default function HomePage() {
  const [email, setEmail] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null)

  // Fetch waitlist count
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const response = await fetch('/api/waitlist/')
        const data = await response.json()
        if (response.ok && data.count !== undefined) {
          setWaitlistCount(data.count)
        }
      } catch (error) {
        console.error('Failed to fetch waitlist count:', error)
      }
    }

    fetchWaitlistCount()
  }, [])

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    
    if (email) {
      setIsSubmitting(true)
      
      try {
        const response = await fetch('/api/waitlist/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
        
        const data = await response.json()

        if (response.ok) {
          setIsSubmitted(true)
          // Update waitlist count
          if (waitlistCount !== null) {
            setWaitlistCount(waitlistCount + 1)
          }
        } else {
          alert(data.error || 'Failed to join waitlist')
        }
      } catch (error) {
        alert('Failed to join waitlist. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="min-h-screen w-full rounded-md bg-hypiq-background bg-texture relative flex flex-col antialiased overflow-hidden">
      {/* Top Market Cards Slider */}
      <div className="absolute top-0 left-0 right-0 z-0 opacity-25">
        <MarketCardsSlider reverse={false} speed="35s" />
      </div>

      {/* Middle Market Cards Slider */}
      <div className="absolute top-1/2 left-0 right-0 z-0 opacity-20 -translate-y-1/2">
        <MarketCardsSlider reverse={true} speed="40s" />
      </div>

      {/* Bottom Market Cards Slider */}
      <div className="absolute bottom-0 left-0 right-0 z-0 opacity-25">
        <MarketCardsSlider reverse={false} speed="30s" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-0">
        <div className="max-w-2xl w-full mx-auto p-8 sm:p-12 relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl">
                {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-extralight text-white leading-none mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            HYPIQ
          </h1>
        </motion.div>



        {/* Cool Decorative Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
          className="flex justify-center items-center mb-6"
        >
          <div className="relative">
            <div className="w-80 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
            <div className="absolute inset-0 w-80 h-px bg-gradient-to-r from-transparent via-white to-transparent blur-sm opacity-40"></div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-lg md:text-7xl text-white text-center font-sans font-bold mb-8"
        >
          {isSubmitted ? "Connect with us" : "Join the waitlist"}
        </motion.h1>
        
        {/* Form or Success State */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 relative z-10"
          >
            <div>
              <h4 className="text-2xl font-semibold text-white mb-2">You&apos;re In!</h4>
              <p className="text-gray-400 text-base">We&apos;ll notify you when HYPIQ launches</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <SocialLinks className="relative z-10" />
            </motion.div>


          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onSubmit={handleSubmit} 
            className="space-y-4 relative z-10"
          >
            <div className="flex gap-3 items-center">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-20 transition-colors duration-300" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-base bg-hypiq-card/50 border border-hypiq-accent/30 text-white placeholder-gray-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] focus:outline-none hover:border-hypiq-accent/50 transition-all duration-300 rounded-xl backdrop-blur-sm relative z-10 focus:pl-12"
                  disabled={isSubmitting}
                  required
                  aria-label="Email address"
                  autoComplete="email"
                />
              </div>
              
              {/* Waitlist Counter - Inline */}
              {waitlistCount !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex-shrink-0"
                >
                  <div className="inline-flex items-center gap-1.5 bg-white/8 border border-white/15 rounded-full px-2.5 py-2 backdrop-blur-sm">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-white/70 font-medium whitespace-nowrap">
                      <span className="text-white">{waitlistCount.toLocaleString()}</span> joined
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
            
            <StarBorder
              as="button"
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full relative z-10 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
              color="#1a2125"
              speed="4s"
              aria-label={isSubmitting ? "Joining waitlist..." : "Join waitlist"}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Joining...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Join Waitlist</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </StarBorder>
            
            {/* Terms Text */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xs text-gray-500 text-center mt-3 relative z-10"
            >
              By joining, you agree to receive updates about HYPIQ. 
              <br className="hidden sm:inline" />
              We respect your privacy and you can unsubscribe anytime.
            </motion.p>
            
            {/* Social Media Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6"
            >
              <SocialLinks className="relative z-10" />
            </motion.div>


          </motion.form>
        )}
        </div>
      </div>
    </div>
  )
}