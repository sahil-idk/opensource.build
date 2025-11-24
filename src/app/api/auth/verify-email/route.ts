import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { emailVerificationTokensTable, usersTable } from '@/db/schema';
import { eq, and, gt } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Find token
    const [verificationToken] = await db
      .select()
      .from(emailVerificationTokensTable)
      .where(
        and(
          eq(emailVerificationTokensTable.token, token),
          gt(emailVerificationTokensTable.expiresAt, new Date())
        )
      )
      .limit(1);

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Update user
    await db
      .update(usersTable)
      .set({ emailVerified: true })
      .where(eq(usersTable.id, verificationToken.userId));

    // Delete verification token
    await db
      .delete(emailVerificationTokensTable)
      .where(eq(emailVerificationTokensTable.id, verificationToken.id));

    // Redirect to login page with success message
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/login?verified=true`
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
