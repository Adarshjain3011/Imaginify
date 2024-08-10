import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Custom middleware
export default async function middleware(req: NextRequest) {
  const publicRoutes = ['/api/webhooks/clerk'];
  const { userId } = getAuth(req);

  // Allow access to public routes
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the sign-in page
  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  // Continue to the next middleware or request handler
  return NextResponse.next();
}

// Clerk's middleware function
export const config = {
  matcher: [
    '/((?!.*\\..*|_next|api/webhooks/.*).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};
