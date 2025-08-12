export type TimelineInfo = {
  openAt: Date
  closesAtText: string
  payoutText: string
}

function endOfDayUTC(date: Date): Date {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59))
  return d
}

function endOfYearUTC(year: number): Date {
  return new Date(Date.UTC(year, 11, 31, 23, 59, 59))
}

function upcomingSaturdayUTC(from: Date): Date {
  const d = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()))
  const day = d.getUTCDay() // 0 Sun - 6 Sat
  const delta = (6 - day + 7) % 7
  d.setUTCDate(d.getUTCDate() + delta)
  d.setUTCHours(0, 0, 0, 0)
  return d
}

export function formatDateET(date: Date): string {
  // Format in America/New_York to avoid server/client tz mismatch
  const fmt = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York',
  })
  return fmt.format(date) + ' ET'
}

export function inferTimelineFromTitle(title: string, now: Date = new Date()): TimelineInfo {
  const t = title.toLowerCase()
  let closesAt: Date | null = null
  let closesAtText: string
  let payoutText = 'Projected payout 1 hour after closing'

  // Daily markets
  if (t.includes('today') || t.includes('end of the day') || t.includes('by the end of the day')) {
    closesAt = endOfDayUTC(now)
    closesAtText = `${formatDateET(closesAt)} (end of day)`
  } else if (t.includes('before the weekend') || t.includes('weekly')) {
    // Weekly deadline (Saturday 12:00 AM UTC)
    const sat = upcomingSaturdayUTC(now)
    closesAt = sat
    closesAtText = `${formatDateET(closesAt)} (week close)`
  } else if (t.includes('this year') || t.includes('by end of year') || t.includes('year end')) {
    const yearEnd = endOfYearUTC(now.getUTCFullYear())
    closesAt = yearEnd
    closesAtText = `${formatDateET(closesAt)} (year end)`
  } else {
    // Default: close at end of day
    closesAt = endOfDayUTC(now)
    closesAtText = `${formatDateET(closesAt)}`
  }

  return {
    openAt: now,
    closesAtText,
    payoutText,
  }
}


