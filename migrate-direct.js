#!/usr/bin/env node

/**
 * Quick Database Migration via Vercel Postgres Client
 * Usage: node migrate-direct.js
 */

const { sql } = require('@vercel/postgres');
const fs = require('fs');

async function runMigration() {
  console.log('🚀 Running migration via @vercel/postgres...\n');

  try {
    // Read migration file
    const migrationSQL = fs.readFileSync('./migrations/001_auth_system.sql', 'utf8');

    // Split by semicolon and filter out comments/empty lines
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📝 Found ${statements.length} SQL statements\n`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.length < 10) continue; // Skip tiny fragments

      console.log(`Executing statement ${i + 1}/${statements.length}...`);
      await sql.query(statement + ';');
    }

    console.log('\n✅ Migration completed successfully!');
    console.log('\nTables created:');
    console.log('  ✓ users_table');
    console.log('  ✓ sessions_table');
    console.log('  ✓ oauth_accounts_table');
    console.log('  ✓ password_reset_tokens_table');
    console.log('  ✓ email_verification_tokens_table');
    console.log('  ✓ posts_table (orgs)');
    console.log('  ✓ issues');
    console.log('\n🎉 Your database is ready!');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);

    if (error.message.includes('uuid')) {
      console.error('\n💡 Try running this manually in Neon first:');
      console.error('   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    }

    process.exit(1);
  }
}

// Load env from Vercel (they should be set in deployment)
require('dotenv').config({ path: '.env.local' });

if (!process.env.POSTGRES_URL) {
  console.error('❌ POSTGRES_URL not found!');
  console.error('\nGet it from Vercel → Settings → Environment Variables');
  console.error('Then create .env.local and add:');
  console.error('  POSTGRES_URL=your-neon-connection-string');
  process.exit(1);
}

runMigration();
