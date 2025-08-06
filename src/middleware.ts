import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  
  // Add a header to identify the environment for the application
  const response = NextResponse.next()
  
  if (hostname === 'prod.hypiq.finance') {
    response.headers.set('x-environment', 'production')
  } else {
    response.headers.set('x-environment', 'waitlist')
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}