import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware((auth, req) => {
  // Add your middleware checks
}, { debug: true })

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Matches all except files with dots and _next
    '/', 
    '/(api|trpc)(.*)',
    '/orgs/:path*' // Ensure orgs path is included
  ],
};