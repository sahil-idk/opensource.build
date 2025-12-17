-- Migration: Add authentication tables
-- Created: 2025-01-24

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop old users table if exists (backup data first if needed!)
-- DROP TABLE IF EXISTS users_table CASCADE;

-- Create enhanced users table
CREATE TABLE IF NOT EXISTS users_table (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  email_verified BOOLEAN NOT NULL DEFAULT false,
  password_hash TEXT,
  name TEXT,
  username TEXT UNIQUE,
  avatar TEXT,
  bio TEXT,
  github_id TEXT UNIQUE,
  github_username TEXT,
  github_access_token TEXT,
  age INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMP
);

-- Create indexes for users table
CREATE INDEX IF NOT EXISTS users_email_idx ON users_table(email);
CREATE INDEX IF NOT EXISTS users_github_id_idx ON users_table(github_id);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions_table (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users_table(id) ON DELETE CASCADE,
  refresh_token TEXT NOT NULL UNIQUE,
  user_agent TEXT,
  ip_address TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for sessions table
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions_table(user_id);
CREATE INDEX IF NOT EXISTS sessions_refresh_token_idx ON sessions_table(refresh_token);

-- Create OAuth accounts table
CREATE TABLE IF NOT EXISTS oauth_accounts_table (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users_table(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP,
  token_type TEXT,
  scope TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for OAuth accounts
CREATE INDEX IF NOT EXISTS oauth_user_id_idx ON oauth_accounts_table(user_id);
CREATE INDEX IF NOT EXISTS oauth_provider_idx ON oauth_accounts_table(provider, provider_account_id);

-- Create password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens_table (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users_table(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index for password reset tokens
CREATE INDEX IF NOT EXISTS password_reset_token_idx ON password_reset_tokens_table(token);

-- Create email verification tokens table
CREATE TABLE IF NOT EXISTS email_verification_tokens_table (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users_table(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index for email verification tokens
CREATE INDEX IF NOT EXISTS email_verification_token_idx ON email_verification_tokens_table(token);

-- Update existing posts_table (orgs) to use UUID foreign key
-- Note: This will fail if posts_table has existing data with text user_id
-- You may need to migrate data manually if you have existing orgs
ALTER TABLE posts_table
  ALTER COLUMN user_id TYPE UUID USING user_id::uuid;

-- Update issues table to use UUID foreign key
ALTER TABLE issues
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT NOW();

ALTER TABLE issues
  ALTER COLUMN user_id TYPE UUID USING user_id::uuid;

-- Create indexes for existing tables
CREATE INDEX IF NOT EXISTS orgs_user_id_idx ON posts_table(user_id);
CREATE INDEX IF NOT EXISTS issues_user_id_idx ON issues(user_id);
CREATE INDEX IF NOT EXISTS issues_state_idx ON issues(state);
