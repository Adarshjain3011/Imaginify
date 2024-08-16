import { NextResponse } from 'next/server'

import { NextRequest } from 'next/server';
export default function middleware(req:NextRequest) {
  console.log('Middleware triggered');
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}

