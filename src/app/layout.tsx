import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WalletProvider } from '@/contexts/WalletContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Whale Prediction Markets',
  description: 'Advanced prediction markets platform. Trade on whale positions and crypto outcomes. predict/earn.',
  icons: {
    icon: '/whale-tail.png',
    apple: '/whale-tail.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Whale Prediction Markets</title>
        <meta name="description" content="Advanced prediction markets platform. Trade on whale positions and crypto outcomes. predict/earn." />
        <link rel="icon" href="/whale-tail.png" type="image/png" />
        <link rel="apple-touch-icon" href="/whale-tail.png" />
      </head>
      <body className={inter.className}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  )
} 