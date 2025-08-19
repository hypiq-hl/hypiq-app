import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WalletProvider } from '@/contexts/WalletContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HYPIQ - Prediction Markets',
  description: 'Advanced prediction markets platform. Trade on whale positions and crypto outcomes. predict/earn.',
  icons: {
    icon: '/HYPIQ-logo-white-vector.svg',
    apple: '/HYPIQ-logo-white-vector.svg',
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
        <title>HYPIQ - Prediction Markets</title>
        <meta name="description" content="Advanced prediction markets platform. Trade on whale positions and crypto outcomes. predict/earn." />
        <link rel="icon" href="/HYPIQ-logo-white-vector.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/HYPIQ-logo-white-vector.svg" />
      </head>
      <body className={inter.className}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  )
} 