import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { usersTable, emailVerificationTokensTable } from '@/db/schema';
import {
  hashPassword,
  validateEmail,
  validatePassword,
  validateUsername,
  generateSecureToken,
  getEmailVerificationTokenExpiry,
  checkRateLimit,
} from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = checkRateLimit(`register:${ip}`, 3, 60 * 60 * 1000); // 3 attempts per hour

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password, username, name } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: 'Invalid password', details: passwordValidation.errors },
        { status: 400 }
      );
    }

    if (username) {
      const usernameValidation = validateUsername(username);
      if (!usernameValidation.valid) {
        return NextResponse.json(
          { error: 'Invalid username', details: usernameValidation.errors },
          { status: 400 }
        );
      }
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.toLowerCase()))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Check if username is taken
    if (username) {
      const existingUsername = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, username.toLowerCase()))
        .limit(1);

      if (existingUsername.length > 0) {
        return NextResponse.json(
          { error: 'Username is already taken' },
          { status: 409 }
        );
      }
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const [newUser] = await db
      .insert(usersTable)
      .values({
        email: email.toLowerCase(),
        passwordHash,
        username: username?.toLowerCase(),
        name,
        emailVerified: false,
      })
      .returning();

    // Generate email verification token
    const verificationToken = generateSecureToken();
    await db.insert(emailVerificationTokensTable).values({
      userId: newUser.id,
      token: verificationToken,
      expiresAt: getEmailVerificationTokenExpiry(),
    });

    // TODO: Send verification email
    // For now, return the token in response (in production, send via email)
    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${verificationToken}`;

    return NextResponse.json(
      {
        message: 'User registered successfully. Please verify your email.',
        userId: newUser.id,
        // Remove in production - only for development
        verificationUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
