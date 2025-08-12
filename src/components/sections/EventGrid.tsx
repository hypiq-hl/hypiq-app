'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

type EventOption = {
  name: string
  percent: number
}

type EventMarket = {
  id: string
  title: string
  options: EventOption[]
  volume: number
  imageUrl?: string
}

const mockEvents: EventMarket[] = [
  {
    id: 'e1',
    title: 'Next US Presidential Election Winner?',
    options: [
      { name: 'J.D. Vance', percent: 27 },
      { name: 'Gavin Newsom', percent: 13 },
    ],
    volume: 1262355,
    imageUrl: 'https://picsum.photos/seed/e1/96/96',
  },
  {
    id: 'e2',
    title: 'New York City Mayor Election',
    options: [
      { name: 'Zohran Mamdani', percent: 80 },
      { name: 'Andrew Cuomo', percent: 10 },
    ],
    volume: 16901170,
    imageUrl: 'https://picsum.photos/seed/e2/96/96',
  },
  {
    id: 'e3',
    title: 'CPI in July 2025 above 0.2%?',
    options: [
      { name: 'Above 0.2%', percent: 54 },
      { name: 'Above 0.1%', percent: 89 },
    ],
    volume: 12551160,
    imageUrl: 'https://picsum.photos/seed/e3/96/96',
  },
  {
    id: 'e4',
    title: 'Will ETH be above $4k by year end?',
    options: [
      { name: 'Yes', percent: 37 },
      { name: 'No', percent: 63 },
    ],
    volume: 5300000,
    imageUrl: 'https://picsum.photos/seed/e4/96/96',
  },
  {
    id: 'e5',
    title: 'Trump, Putin, and Zelenskyy meet before year end?',
    options: [
      { name: 'Yes', percent: 8 },
      { name: 'No', percent: 92 },
    ],
    volume: 82503,
    imageUrl: 'https://picsum.photos/seed/e5/96/96',
  },
  {
    id: 'e6',
    title: 'Who will win the Nobel Peace Prize?',
    options: [
      { name: 'Yulia Navalnaya', percent: 19 },
      { name: 'Donald Trump', percent: 12 },
    ],
    volume: 2729187,
    imageUrl: 'https://picsum.photos/seed/e6/96/96',
  },
  {
    id: 'e7',
    title: 'Will Bitcoin reach $150k before 2026?',
    options: [
      { name: 'Yes', percent: 48 },
      { name: 'No', percent: 52 },
    ],
    volume: 254539,
    imageUrl: 'https://picsum.photos/seed/e7/96/96',
  },
  {
    id: 'e8',
    title: 'Fed funds rate in September?',
    options: [
      { name: 'Above 4.25%', percent: 17 },
      { name: 'Above 4.00%', percent: 94 },
    ],
    volume: 36642739,
    imageUrl: 'https://picsum.photos/seed/e8/96/96',
  },
  {
    id: 'e9',
    title: 'Will Taylor Swift and Travis Kelce be engaged this year?',
    options: [
      { name: 'Yes', percent: 51 },
      { name: 'No', percent: 45 },
    ],
    volume: 99877,
    imageUrl: 'https://picsum.photos/seed/e9/96/96',
  },
]

export function EventCard({ market }: { market: EventMarket }) {
  return (
    <Card className="bg-white/10 border border-white/20 rounded-lg p-4 text-white">
      <div className="flex items-center gap-3 mb-3">
        <Image src={market.imageUrl || 'https://picsum.photos/seed/placeholder/96/96'} alt="event" width={40} height={40} className="w-10 h-10 rounded-md object-cover border border-white/10" />
        <h3 className="text-base font-semibold">{market.title}</h3>
      </div>

      <div className="space-y-3">
        {market.options.map((opt, idx) => {
          const isPrimary = idx === 0
          return (
            <div key={opt.name} className="flex items-center gap-3">
              <span className="text-sm text-white/90 w-28 shrink-0 truncate">{opt.name}</span>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Progress
                    value={opt.percent}
                    className={`h-2 bg-white/10 ${isPrimary ? ' [&>div]:from-emerald-500 [&>div]:to-emerald-400' : ' [&>div]:from-red-500 [&>div]:to-rose-400'}`}
                  />
                  <span className="text-sm font-semibold tabular-nums w-10 text-right">{opt.percent}%</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button size="sm" variant="outline" className="h-7 px-3 border-white/20 text-white hover:bg-white/10">Yes</Button>
                <Button size="sm" variant="outline" className="h-7 px-3 border-white/20 text-white hover:bg-white/10">No</Button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 text-xs text-white/60">
        ${market.volume.toLocaleString()}
      </div>
    </Card>
  )
}

export default function EventGrid() {
  const [events] = useState<EventMarket[]>(mockEvents)

  return (
    <div className="container mx-auto px-4 py-8 bg-[#0e241f]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((m) => (
          <EventCard key={m.id} market={m} />
        ))}
      </div>
    </div>
  )
}


