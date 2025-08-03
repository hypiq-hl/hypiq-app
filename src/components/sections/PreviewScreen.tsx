'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GooeyText } from '@/components/ui/gooey-text-morphing'
import { HypiqLogo } from '@/components/ui/hypiq-logo'

interface PreviewScreenProps {
  onComplete: () => void
}

const PreviewScreen: React.FC<PreviewScreenProps> = ({ onComplete }) => {
  const [showLogo, setShowLogo] = useState<boolean>(false)
  const [showText, setShowText] = useState<boolean>(false)

  useEffect(() => {
    // Show logo first
    const logoTimer = setTimeout(() => {
      setShowLogo(true)
    }, 500)

    // Show text after logo
    const textTimer = setTimeout(() => {
      setShowText(true)
    }, 1000)

    // Complete the preview after a total duration
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 15000) // 15 seconds total to show all words

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(textTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="min-h-screen bg-hypiq-background text-hypiq-text flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-500/3 to-pink-500/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-12">


        {/* Gooey Text Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showText ? 1 : 0, 
            y: showText ? 0 : 20 
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut",
            delay: 0.3
          }}
          className="h-[120px] flex items-center justify-center"
        >
          {showText && (
            <GooeyText
              texts={["hyperliquid", "market", "prediction", "is", "coming", "Hypiq"]}
              morphTime={1.0}
              cooldownTime={1.5}
              className="font-bold"
              textClassName="text-hypiq-text bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            />
          )}
        </motion.div>




      </div>
    </div>
  )
}

export default PreviewScreen
