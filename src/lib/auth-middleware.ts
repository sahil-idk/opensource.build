import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { usersTable, sessionsTable } from '@/db/schema';
import { verifyAccessToken } from './auth';
import { eq, and, gt } from 'drizzle-orm';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  username: string | null;
  avatar: string | null;
  githubUsername: string | null;
  emailVerified: boolean;
}

/**
 * Get current user from access token (for API routes)
 */
export async function getCurrentUserFromToken(
  request: NextRequest
): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const payload = verifyAccessToken(token);

    if (!payload) {
      return null;
    }

    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
        username: usersTable.username,
        avatar: usersTable.avatar,
        githubUsername: usersTable.githubUsername,
        emailVerified: usersTable.emailVerified,
      })
      .from(usersTable)
      .where(eq(usersTable.id, payload.userId))
      .limit(1);

    return user || null;
  } catch (error) {
    console.error('Get current user from token error:', error);
    return null;
  }
}

/**
 * Get current user from session cookie (for server components)
 */
export async function getCurrentUserFromSession(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return null;
    }

    const [session] = await db
      .select({
        user: {
          id: usersTable.id,
          email: usersTable.email,
          name: usersTable.name,
          username: usersTable.username,
          avatar: usersTable.avatar,
          githubUsername: usersTable.githubUsername,
          emailVerified: usersTable.emailVerified,
        },
      })
      .from(sessionsTable)
      .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
      .where(
        and(
          eq(sessionsTable.refreshToken, refreshToken),
          gt(sessionsTable.expiresAt, new Date())
        )
      )
      .limit(1);

    return session?.user || null;
  } catch (error) {
    console.error('Get current user from session error:', error);
    return null;
  }
}

/**
 * Require authentication for server components
 * Throws error if user is not authenticated
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUserFromSession();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

/**
 * Check if user is authenticated (for conditional rendering)
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUserFromSession();
  return user !== null;
}
