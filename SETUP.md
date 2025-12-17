# 🚀 Production Setup Guide

## Quick Fix for Registration Error

Your registration is failing because the database tables don't exist yet. Follow these steps:

---

## Step 1: Set Environment Variables in Vercel

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

Add these variables:

```bash
# CRITICAL - Use the generated secrets below
JWT_SECRET=5zM+B56lZ1C8YKyyRh7/HDPK5mvj+19+qpX8zb04czY=
NEXTAUTH_SECRET=YTTR6YQsKvBiTB8Ki6BCWjdZwIC9SML062B4ruQpRic=

# Your Vercel deployment URL
NEXTAUTH_URL=https://your-deployment-url.vercel.app

# Postgres credentials (get from Vercel Postgres dashboard)
POSTGRES_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NO_SSL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
POSTGRES_USER=...
POSTGRES_HOST=...
POSTGRES_PASSWORD=...
POSTGRES_DATABASE=...

# GitHub Personal Access Token
NEXT_PUBLIC_GITHUB_TOKEN=ghp_your_token_here
```

**Important:** Click **"Regenerate"** or trigger a new deployment after adding env vars!

---

## Step 2: Run Database Migration

### Option A: Via Vercel Postgres Dashboard (Easiest)

1. Go to **Vercel Postgres** → Your Database → **Query** tab
2. Copy the content from `migrations/001_auth_system.sql`
3. Paste and run the SQL

### Option B: Locally (Recommended)

```bash
# 1. Create .env.local with your database credentials
cp .env.local.example .env.local

# 2. Edit .env.local and add:
#    - POSTGRES_URL (from Vercel Postgres dashboard)
#    - JWT_SECRET (use generated secret above)
#    - NEXT_PUBLIC_GITHUB_TOKEN

# 3. Run migration
npm run db:migrate
```

You should see:
```
🚀 Starting database migration...
📄 Executing migration: 001_auth_system.sql
✅ Migration completed successfully!
```

---

## Step 3: Redeploy

After adding environment variables:

```bash
git push origin your-branch
```

Or in Vercel dashboard: **Deployments** → **Redeploy**

---

## Step 4: Test Registration

1. Go to your deployed site
2. Click **"Join Now"** or go to `/register`
3. Fill in the form:
   - Email: `test@example.com`
   - Username: `testuser`
   - Name: `Test User`
   - Password: `Test123!@#` (must meet requirements)
4. Click **"Create Account"**

You should see: **"Account Created! Check your email for verification"**

---

## Troubleshooting

### ❌ "Internal server error" on registration

**Cause:** Database tables don't exist or env vars missing

**Fix:**
1. Check Vercel env vars are set (especially `JWT_SECRET`)
2. Run the migration (Step 2)
3. Redeploy

### ❌ "uuid-ossp extension not found"

**Fix:** Run this in your Postgres database first:
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### ❌ "Email already exists"

**Cause:** You tried registering twice with same email

**Fix:** Use a different email or delete the test user from database

### ❌ Build errors after migration

**Fix:** Make sure you have the latest code:
```bash
git pull origin your-branch
npm install
```

---

## What Was Created

After successful migration, your database has:

✅ **users_table** - Enhanced with UUID, email, password, GitHub OAuth
✅ **sessions_table** - Secure session management with refresh tokens
✅ **oauth_accounts_table** - GitHub OAuth integration (ready)
✅ **password_reset_tokens_table** - Password reset workflow
✅ **email_verification_tokens_table** - Email verification
✅ **Indexes** - For fast queries on email, GitHub ID, tokens

---

## Next Steps

1. ✅ Complete Steps 1-3 above
2. Test registration and login
3. Add a GitHub OAuth app (optional, for GitHub login)
4. Set up email service (for password reset, optional)

---

## Need Help?

Check the logs in Vercel:
- Go to **Deployments** → Latest deployment → **Function Logs**
- Look for errors in `/api/auth/register`

The most common issue is missing `JWT_SECRET` or database tables not created.

---

## Quick Checklist

✅ Database tables created (run migration in Neon)
✅ Environment variables added to Vercel:
   - `JWT_SECRET`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `NEXT_PUBLIC_GITHUB_TOKEN`
   - All `POSTGRES_*` variables
✅ Redeployed after adding env vars
✅ Tested registration at `/register`
