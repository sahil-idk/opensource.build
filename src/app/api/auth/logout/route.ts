import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { sessionsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (refreshToken) {
      // Delete session from database
      await db
        .delete(sessionsTable)
        .where(eq(sessionsTable.refreshToken, refreshToken));
    }

    // Clear refresh token cookie
    cookieStore.delete('refreshToken');

    return NextResponse.json({
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
