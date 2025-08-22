import Link from 'next/link'
import Image from 'next/image'
import { Github } from 'lucide-react'

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function TelegramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M22 3L3 10l6 2 2 6 3-4 5 4 3-15z" />
      <path d="M9 12l10-7" />
    </svg>
  )
}

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.222 0c1.406 0 2.54 1.137 2.607 2.475V24l-2.677-2.273-1.47-1.338-1.604-1.398.67 2.205H3.71c-1.402 0-2.54-1.065-2.54-2.476V2.48C1.17 1.142 2.31.003 3.715.003h16.5L20.222 0zm-6.118 5.683h-.03l-.202.2c2.073.6 3.076 1.537 3.076 1.537-1.336-.668-2.54-1.002-3.744-1.137-.87-.135-1.74-.064-2.475 0h-.2c-.47 0-1.47.2-2.81.735-.467.203-.735.336-.735.336s1.002-1.002 3.21-1.537l-.135-.135s-1.672-.064-3.477 1.27c0 0-1.805 3.144-1.805 7.02 0 0 1 1.74 3.743 1.806 0 0 .4-.533.805-1.002-1.54-.4-2.172-1.27-2.172-1.27s.135.066.335.2h.06c.03 0 .044.015.06.03v.006c.016.016.03.03.06.03.33.136.66.27.93.4.466.202 1.065.403 1.8.536.93.135 1.996.2 3.21 0 .6-.135 1.2-.267 1.8-.535.39-.2.87-.4 1.397-.737 0 0-.6.936-2.205 1.335.33.466.795 1 .795 1 2.744-.06 3.81-1.8 3.87-1.726 0-3.87-1.815-7.02-1.815-7.02-1.635-1.214-3.165-1.26-3.435-1.26l.056-.02zm.168 4.413c.703 0 1.27.6 1.27 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.34.002-.74.573-1.338 1.27-1.335zm-4.543 0c.7 0 1.266.6 1.266 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.34 0-.74.57-1.335 1.27-1.335z"/>
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-start">
          {/* Left: Resources */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h3 className="font-semibold mb-3 md:mb-4 text-gray-900 tracking-wide">Resources</h3>
            <ul className="space-y-1.5 md:space-y-2 text-base md:text-sm text-gray-600">
              <li><a href="https://docs.hypiq.finance" target="_blank" rel="noreferrer" className="block py-1 hover:text-gray-900 transition-colors">Documentation</a></li>
              <li><a href="https://faq.hypiq.finance" target="_blank" rel="noreferrer" className="block py-1 hover:text-gray-900 transition-colors">FAQ</a></li>
              <li><a href="mailto:support@hypiq.finance" className="block py-1 hover:text-gray-900 transition-colors">Contact</a></li>
              <li><a href="https://github.com/hypiq-hl" target="_blank" rel="noreferrer" className="block py-1 hover:text-gray-900 transition-colors">GitHub</a></li>
            </ul>
          </div>

          {/* Center: Minimal logo only */}
          <div className="flex flex-col items-center text-center order-1 md:order-2">
            <div className="w-20 h-20">
              <Image src="/whale-tail.png" alt="HYPIQ" width={80} height={80} className="object-contain" />
            </div>
          </div>

          {/* Right: Community - center aligned, plain icons */}
          <div className="text-center order-3">
            <h3 className="font-semibold text-gray-900 tracking-wide">Community</h3>
            <div className="flex justify-center items-center gap-6 mt-3 md:mt-4">
              <a href="https://x.com/hypiq_fi" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors" aria-label="X (formerly Twitter)">
                <XIcon className="h-5 w-5" />
              </a>
              <a href="https://t.me/hypiq_chat" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors" aria-label="Telegram">
                <TelegramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors" aria-label="Discord">
                <DiscordIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-500">
          <p>&copy; 2025 HYPIQ. All rights reserved. Trade responsibly.</p>
        </div>
      </div>
    </footer>
  )
} 