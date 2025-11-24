import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { sessionsTable, usersTable } from '@/db/schema';
import {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpiry,
} from '@/lib/auth';
import { eq, and, gt } from 'drizzle-orm';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token not found' },
        { status: 401 }
      );
    }

    // Find session
    const [session] = await db
      .select({
        session: sessionsTable,
        user: usersTable,
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

    if (!session) {
      // Clear invalid cookie
      cookieStore.delete('refreshToken');
      return NextResponse.json(
        { error: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(
      session.user.id,
      session.user.email
    );
    const newRefreshToken = generateRefreshToken();

    // Delete old session and create new one (refresh token rotation)
    await db
      .delete(sessionsTable)
      .where(eq(sessionsTable.refreshToken, refreshToken));

    await db.insert(sessionsTable).values({
      userId: session.user.id,
      refreshToken: newRefreshToken,
      expiresAt: getRefreshTokenExpiry(),
      userAgent: request.headers.get('user-agent') || undefined,
      ipAddress:
        request.headers.get('x-forwarded-for') || undefined,
    });

    // Update refresh token cookie
    cookieStore.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return NextResponse.json({
      accessToken: newAccessToken,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        username: session.user.username,
        avatar: session.user.avatar,
        githubUsername: session.user.githubUsername,
      },
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
