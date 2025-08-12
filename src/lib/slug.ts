export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function buildSlug(title: string): string {
  return slugify(title)
}

export function capitalizeTitle(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export function extractIdFromSlug(slug: string): string | null {
  const match = slug.match(/-(\w+)$/)
  return match ? match[1] : null
}

