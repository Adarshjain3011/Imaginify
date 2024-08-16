import { NextResponse } from 'next/server'
import { clerkMiddleware } from '@clerk/nextjs/server'

// Define which routes are considered protected
const isProtectedRoute = (pathname: string) => pathname.startsWith('/protected')

export default clerkMiddleware((auth, req) => {

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
