#!/usr/bin/env node

/**
 * Database Migration Script
 * Run with: node scripts/migrate.js
 */

const { sql } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  try {
    console.log('🚀 Starting database migration...\n');

    // Read migration file
    const migrationPath = path.join(__dirname, '../migrations/001_auth_system.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    console.log('📄 Executing migration: 001_auth_system.sql');

    // Execute migration
    await sql.query(migrationSQL);

    console.log('\n✅ Migration completed successfully!');
    console.log('\nTables created:');
    console.log('  - users_table (with UUID, auth fields)');
    console.log('  - sessions_table');
    console.log('  - oauth_accounts_table');
    console.log('  - password_reset_tokens_table');
    console.log('  - email_verification_tokens_table');
    console.log('\nIndexes created for performance');
    console.log('\n✨ Your authentication system is ready!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.error('\nError details:', error.message);

    if (error.message.includes('uuid')) {
      console.error('\n⚠️  UUID Extension Error:');
      console.error('Your database may not have UUID support enabled.');
      console.error('Run this SQL manually in your database:');
      console.error('  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    }

    if (error.message.includes('user_id')) {
      console.error('\n⚠️  User ID Migration Error:');
      console.error('You may have existing data with text user_id.');
      console.error('Please backup and migrate your data manually.');
    }

    process.exit(1);
  }
}

// Load environment variables
require('dotenv').config({ path: '.env.local' });

if (!process.env.POSTGRES_URL) {
  console.error('❌ Error: POSTGRES_URL not found in environment variables');
  console.error('Please create .env.local with your database credentials');
  process.exit(1);
}

runMigration();
