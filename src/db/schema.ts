import { boolean, integer, pgTable, serial, text, timestamp, uuid, index } from 'drizzle-orm/pg-core';

// Enhanced users table with authentication fields
export const usersTable = pgTable('users_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  passwordHash: text('password_hash'), // nullable for OAuth-only users
  name: text('name'),
  username: text('username').unique(),
  avatar: text('avatar'),
  bio: text('bio'),

  // GitHub integration
  githubId: text('github_id').unique(),
  githubUsername: text('github_username'),
  githubAccessToken: text('github_access_token'), // encrypted in production

  // Metadata
  age: integer('age'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  lastLoginAt: timestamp('last_login_at'),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
  githubIdIdx: index('users_github_id_idx').on(table.githubId),
}));

// Sessions table for JWT refresh tokens
export const sessionsTable = pgTable('sessions_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  refreshToken: text('refresh_token').notNull().unique(),
  userAgent: text('user_agent'),
  ipAddress: text('ip_address'),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('sessions_user_id_idx').on(table.userId),
  refreshTokenIdx: index('sessions_refresh_token_idx').on(table.refreshToken),
}));

// OAuth accounts (GitHub, etc.)
export const oauthAccountsTable = pgTable('oauth_accounts_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  provider: text('provider').notNull(), // 'github', 'google', etc.
  providerAccountId: text('provider_account_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  expiresAt: timestamp('expires_at'),
  tokenType: text('token_type'),
  scope: text('scope'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => ({
  userIdIdx: index('oauth_user_id_idx').on(table.userId),
  providerIdx: index('oauth_provider_idx').on(table.provider, table.providerAccountId),
}));

// Password reset tokens
export const passwordResetTokensTable = pgTable('password_reset_tokens_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  used: boolean('used').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  tokenIdx: index('password_reset_token_idx').on(table.token),
}));

// Email verification tokens
export const emailVerificationTokensTable = pgTable('email_verification_tokens_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  tokenIdx: index('email_verification_token_idx').on(table.token),
}));

// Organizations table
export const orgsTable = pgTable('posts_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  link: text('link').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
}, (table) => ({
  userIdIdx: index('orgs_user_id_idx').on(table.userId),
}));

// Issues table
export const issuesTable = pgTable('issues', {
  id: text('id').primaryKey(),
  number: text('number'),
  title: text('title'),
  state: text('state'), // 'open', 'closed', 'in_progress'
  issueLink: text('issue_link'),
  userId: uuid('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('issues_user_id_idx').on(table.userId),
  stateIdx: index('issues_state_idx').on(table.state),
}));

// Type exports
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertSession = typeof sessionsTable.$inferInsert;
export type SelectSession = typeof sessionsTable.$inferSelect;

export type InsertOAuthAccount = typeof oauthAccountsTable.$inferInsert;
export type SelectOAuthAccount = typeof oauthAccountsTable.$inferSelect;

export type InsertPasswordResetToken = typeof passwordResetTokensTable.$inferInsert;
export type SelectPasswordResetToken = typeof passwordResetTokensTable.$inferSelect;

export type InsertEmailVerificationToken = typeof emailVerificationTokensTable.$inferInsert;
export type SelectEmailVerificationToken = typeof emailVerificationTokensTable.$inferSelect;

export type InsertOrg = typeof orgsTable.$inferInsert;
export type SelectOrg = typeof orgsTable.$inferSelect;

export type InsertIssue = typeof issuesTable.$inferInsert;
export type SelectIssue = typeof issuesTable.$inferSelect;