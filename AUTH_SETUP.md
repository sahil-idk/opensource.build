# Custom Authentication System - Setup Guide

## Overview

This project has been migrated from Clerk to a custom authentication system built with:
- **JWT tokens** for access control
- **Refresh token rotation** for security
- **Session management** with PostgreSQL
- **Email verification** workflow
- **Password reset** functionality
- **Node.js built-in crypto** (zero external dependencies for auth)

## Architecture

### Database Schema

The authentication system uses the following tables:

1. **users_table** - Enhanced user data with auth fields
   - UUID primary key
   - Email + password hash
   - Email verification status
   - GitHub OAuth integration fields
   - Profile data (username, avatar, bio)

2. **sessions_table** - Refresh token storage
   - Links to users
   - Stores refresh tokens with expiry
   - Tracks user agent and IP for security

3. **oauth_accounts_table** - OAuth provider data
   - Supports multiple OAuth providers (GitHub, etc.)
   - Stores provider tokens

4. **password_reset_tokens_table** - Password reset workflow
   - One-time use tokens
   - 1-hour expiry

5. **email_verification_tokens_table** - Email verification
   - 24-hour expiry tokens

### API Routes

All auth endpoints are in `/api/auth/`:

- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Sign in with email/password
- `POST /api/auth/logout` - End session
- `POST /api/auth/refresh` - Get new access token
- `GET /api/auth/me` - Get current user
- `GET /api/auth/verify-email?token=...` - Verify email
- `POST /api/auth/reset-password` - Request password reset
- `PUT /api/auth/reset-password` - Reset password with token

### Security Features

- ✅ Password hashing with scrypt (Node.js built-in)
- ✅ JWT with HMAC-SHA256 signing
- ✅ Refresh token rotation (security best practice)
- ✅ Rate limiting on login/register
- ✅ Email verification required
- ✅ Strong password validation
- ✅ httpOnly cookies for refresh tokens
- ✅ CSRF protection via SameSite cookies

## Setup Instructions

### 1. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
# Database (from Vercel Postgres)
POSTGRES_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NO_SSL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
POSTGRES_USER=...
POSTGRES_HOST=...
POSTGRES_PASSWORD=...
POSTGRES_DATABASE=...

# Authentication - CRITICAL: Generate strong secrets!
# Generate with: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-CHANGE-THIS
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-nextauth-key-CHANGE-THIS

# GitHub OAuth (create at https://github.com/settings/developers)
GITHUB_CLIENT_ID=your-github-oauth-app-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-app-secret
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/callback/github

# GitHub API Token (for fetching repos/issues)
NEXT_PUBLIC_GITHUB_TOKEN=ghp_your_personal_access_token

# Email (optional, for production)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
SMTP_FROM=noreply@opensource.build
```

### 2. Generate Database Migrations

```bash
npm run db:generate
```

This will create migration files in `/migrations` based on the schema.

### 3. Apply Migrations

```bash
npm run db:push
# or
npm run db:migrate
```

### 4. Install Dependencies

The authentication system uses only Node.js built-in crypto, but you may need to install other dependencies:

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Navigate to:
- `http://localhost:3000/register` - Create account
- `http://localhost:3000/login` - Sign in
- `http://localhost:3000/dashboard` - Protected area

## Migration from Clerk

### What Changed

| Before (Clerk) | After (Custom Auth) |
|---|---|
| `auth()` from Clerk | `requireAuth()` or `getCurrentUserFromSession()` |
| `currentUser()` | `getCurrentUserFromSession()` |
| `useAuth()` from Clerk | `useAuth()` from our provider |
| `<ClerkProvider>` | `<AuthProvider>` |
| `<SignInButton>` | Custom login page |
| User ID: Clerk's string | User ID: UUID |

### Files Modified

1. **Layouts**
   - `src/app/(content)/layout.tsx` - Removed ClerkProvider
   - `src/app/(dashboard)/layout.tsx` - Added requireAuth()

2. **Middleware**
   - `src/middleware.ts` - Custom auth middleware

3. **New Files Created**
   - `src/lib/auth.ts` - Core auth utilities
   - `src/lib/auth-middleware.ts` - Server-side auth helpers
   - `src/components/providers/auth-provider.tsx` - Client auth context
   - `src/app/api/auth/*` - All auth API routes
   - `src/app/(content)/login/page.tsx` - Login UI
   - `src/app/(content)/register/page.tsx` - Register UI

### Components That Need Updating

You'll need to update components that use Clerk:

**Before:**
```tsx
import { useAuth } from "@clerk/nextjs";

function MyComponent() {
  const { userId } = useAuth();
  // ...
}
```

**After:**
```tsx
import { useAuth } from "@/components/providers/auth-provider";

function MyComponent() {
  const { user } = useAuth();
  const userId = user?.id;
  // ...
}
```

**Server Components - Before:**
```tsx
import { auth } from "@clerk/nextjs/server";

async function ServerComponent() {
  const { userId } = auth();
  // ...
}
```

**Server Components - After:**
```tsx
import { getCurrentUserFromSession } from "@/lib/auth-middleware";

async function ServerComponent() {
  const user = await getCurrentUserFromSession();
  const userId = user?.id;
  // ...
}
```

## Usage Examples

### Client Components

```tsx
'use client';

import { useAuth } from '@/components/providers/auth-provider';

export function MyComponent() {
  const { user, logout, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not authenticated</div>;

  return (
    <div>
      <p>Welcome {user.name || user.email}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Server Components

```tsx
import { getCurrentUserFromSession, requireAuth } from '@/lib/auth-middleware';

// Option 1: Optional auth (can be null)
export default async function MyPage() {
  const user = await getCurrentUserFromSession();

  if (!user) {
    return <div>Please log in</div>;
  }

  return <div>Hello {user.name}</div>;
}

// Option 2: Required auth (throws if not authenticated)
export default async function ProtectedPage() {
  const user = await requireAuth();

  return <div>Hello {user.name}</div>;
}
```

### API Routes

```tsx
import { getCurrentUserFromToken } from '@/lib/auth-middleware';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const user = await getCurrentUserFromToken(request);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ data: 'secret data' });
}
```

## Next Steps

### Immediate (Required)

1. ✅ Remove Clerk package from dependencies
2. ⚠️ Update all components that use Clerk auth
3. ⚠️ Test authentication flow thoroughly
4. ⚠️ Set up production secrets (JWT_SECRET)
5. ⚠️ Configure email service for verification/reset emails

### Near Term (Recommended)

1. Implement GitHub OAuth (routes created, needs GitHub app setup)
2. Add 2FA/TOTP support
3. Add Redis for session storage (currently in-memory)
4. Set up email templates for verification/reset
5. Add rate limiting with Redis (currently in-memory)
6. Add user profile management pages

### Long Term (Optional)

1. Add more OAuth providers (Google, etc.)
2. Implement magic link authentication
3. Add session management UI (view/revoke sessions)
4. Add audit logs for security events
5. Implement account deletion workflow

## Troubleshooting

### "Unauthorized" errors

- Check that JWT_SECRET is set in .env.local
- Verify refresh token cookie is being set
- Check browser console for CORS issues

### Email verification not working

- Email sending is not implemented yet (TODO)
- For development, check API response for verification URL
- Manually set `emailVerified = true` in database for testing

### Database errors

- Run migrations: `npm run db:push`
- Check POSTGRES_URL in .env.local
- Verify database is accessible

## Security Considerations

### Production Checklist

- [ ] Change default JWT_SECRET to strong random value
- [ ] Enable HTTPS (JWT tokens only over secure connections)
- [ ] Set up proper email service (not console.log)
- [ ] Implement Redis for rate limiting (not in-memory)
- [ ] Add Redis for session storage
- [ ] Enable database connection pooling
- [ ] Set up monitoring/alerting for auth failures
- [ ] Implement CAPTCHA on registration/login
- [ ] Add CSP headers
- [ ] Set up automated security scanning

### Token Expiry

- Access Token: 15 minutes (short-lived, stored in memory)
- Refresh Token: 7 days (long-lived, httpOnly cookie)
- Password Reset: 1 hour
- Email Verification: 24 hours

### Rate Limits

- Login: 5 attempts per 15 minutes per IP
- Register: 3 attempts per hour per IP
- Password Reset: 3 attempts per hour per email

## Support

For issues or questions about the authentication system:
1. Check this guide thoroughly
2. Review the code in `src/lib/auth.ts` and `src/lib/auth-middleware.ts`
3. Check environment variables are set correctly
4. Review browser console and server logs for errors

---

**Built with ❤️ using Node.js built-in crypto, zero third-party auth dependencies!**
