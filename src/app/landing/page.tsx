'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BackgroundBeams } from '@/components/ui/background-beams'
import Image from 'next/image'
import { StarBorder } from '@/components/ui/star-border'
import { Mail, ChevronRight, Star, Github, Twitter, MessageCircle } from 'lucide-react'

interface WaitlistFormData {
  email: string
}

const SocialLinks: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex items-center justify-center space-x-4 ${className}`}>
    <a 
      href="https://twitter.com/hypiq" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 bg-[#12191d] border border-[#1a2125] rounded-lg flex items-center justify-center hover:bg-[#1a2125] transition-colors duration-300"
    >
      <Twitter className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-300" />
    </a>
    <a 
      href="https://github.com/hypiq" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 bg-[#12191d] border border-[#1a2125] rounded-lg flex items-center justify-center hover:bg-[#1a2125] transition-colors duration-300"
    >
      <Github className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-300" />
    </a>
    <a 
      href="https://discord.gg/hypiq" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 bg-[#12191d] border border-[#1a2125] rounded-lg flex items-center justify-center hover:bg-[#1a2125] transition-colors duration-300"
    >
      <MessageCircle className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-300" />
    </a>
  </div>
)

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

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
    <div className="h-screen w-full rounded-md bg-hypiq-background relative flex flex-col items-center justify-center antialiased overflow-hidden">
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        {/* Logo & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-14 h-14 bg-[#12191d] border border-[#1a2125] rounded-xl flex items-center justify-center shadow-2xl overflow-hidden">
              <Image 
                src="/hypiq-logo.jpeg" 
                alt="HYPIQ Logo" 
                width={56} 
                height={56} 
                className="object-cover rounded-xl"
              />
            </div>
            <h1 className="text-5xl font-bold text-white">
              HYPIQ
            </h1>
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
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-20" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-base bg-hypiq-card/50 border border-hypiq-accent/30 text-white placeholder-gray-400 focus:border-blue-400/30 focus:ring-0 focus:shadow-[0_0_0_1px_rgba(59,130,246,0.15)] focus:outline-none transition-all duration-500 rounded-lg backdrop-blur-sm relative z-10"
                disabled={isSubmitting}
                required
              />
            </div>
            
            <StarBorder
              as="button"
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full relative z-10 disabled:opacity-50"
              color="#1a2125"
              speed="4s"
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
      <BackgroundBeams />
    </div>
  )
}

export default LandingPage
