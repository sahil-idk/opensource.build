import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/reset-password',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
  '/api/auth/reset-password',
  '/api/auth/verify-email',
  '/api/github/search-orgs',
];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if user has refresh token (basic auth check)
  const hasRefreshToken = request.cookies.has('refreshToken');

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (hasRefreshToken && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If route requires auth and user is not authenticated, redirect to login
  if (!isPublicRoute && !hasRefreshToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Matches all except files with dots and _next
    '/',
    '/(api|trpc)(.*)',
    '/dashboard/:path*',
    '/orgs/:path*',
  ],
};